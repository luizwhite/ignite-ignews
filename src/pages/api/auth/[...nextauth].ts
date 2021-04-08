import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { query as q } from 'faunadb';

import { fauna } from '../../../services/fauna';

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      scope: 'read:user user:email',
    }),
  ],
  // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
  // https://next-auth.js.org/configuration/databases
  //
  // Notes:
  // * You must to install an appropriate node_module for your database
  // * The Email provider requires a database (OAuth providers do not)
  // database: process.env.DATABASE_URL,

  secret: process.env.SECRET!,

  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },

  // JSON Web tokens are only used for sessions if the `jwt: true` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    signingKey: JSON.stringify({
      kty: 'oct',
      use: 'sig',
      kid: 'vYficu7Hdl6NXqEuMCPeOtv4onCfi5W1RepsdSdHatA',
      k:
        '8vTnyTnsGpdjPDQtpdPsoxSSmLwiELwpk1S80kltt7Xj_hktnReEQl_83xvFbNJtOjgTcmFfnWDLWfnlTxrN5UjY-d6lLVLY6VYjwjdmvSBkFCH3YeFPkMfDaFqGAVJ_8dIYYsRoWi2fwwN6LwD1WAmCA4S1bFTISDMt7g02h3iifH490cnqjG76y9LsnErjS342PseTdZSRq09t3o61l5ZKFNzGXSEAjZ4i9uByAd1JwEoVX5pOWnWrdxrX4y2PoRZfsKY1tSfU46HjG1iy_mfI7UdfBBE26VjQ1liorSIAQk-fuxJ3PzXsG_w_dOzX5LngT6KXF1aqRdFWnTWFEA',
      alg: 'HS512',
    }),
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    async jwt(token, user, account, _profile, _isNewUser) {
      if (account?.accessToken) token.accessToken = account.accessToken;

      if (user) {
        await fetch('https://api.github.com/user/emails', {
          method: 'GET',
          headers: {
            Authorization: `token ${token.accessToken}`,
          },
        })
          .then<{ primary: boolean; email: string }[]>((res) => res.json())
          .then((data) => {
            const { email } = data.find(({ primary }) => primary === true)!;
            user.email = email;
          })
          .catch((err) => {
            console.error(err);
          });

        token.email = user.email;
      }

      // console.log(token, '\njwt cb - END\n');
      return Promise.resolve(token);
    },
    async session(session, token) {
      try {
        if (token.email) {
          // prettier-ignore
          await fauna.query(
            q.If(
              q.Not(
                q.Exists(
                  q.Match(
                    q.Index('user_by_email'),
                    q.Casefold(token.email)
                  )
                )
              ),
              q.Create(
                q.Collection('users'),
                { data: { email: token.email } },
              ),
              q.Get(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(token.email)
                )
              )
            )
          );

          const userActiveSubscription = await new Promise((resolve) => {
            fauna
              .query(
                q.If(
                  q.Exists(
                    q.Intersection([
                      q.Match(
                        q.Index('subscription_by_user_ref'),
                        q.Select(
                          'ref',
                          q.Get(
                            q.Match(
                              q.Index('user_by_email'),
                              q.Casefold(token.email!),
                            ),
                          ),
                        ),
                      ),
                      q.Match(q.Index('subscription_by_status'), 'active'),
                    ]),
                  ),
                  q.Get(
                    q.Intersection([
                      q.Match(
                        q.Index('subscription_by_user_ref'),
                        q.Select(
                          'ref',
                          q.Get(
                            q.Match(
                              q.Index('user_by_email'),
                              q.Casefold(token.email!),
                            ),
                          ),
                        ),
                      ),
                      q.Match(q.Index('subscription_by_status'), 'active'),
                    ]),
                  ),
                  q.Abort('User not subscribed'),
                ),
              )
              .then((res) => resolve(res))
              .catch((err) => {
                console.error('\nError: %s\n', err.errors()[0].description);
                resolve(null);
              });
          });

          // console.log(userActiveSubscription);

          session = {
            ...session,
            user: {
              ...session.user,
              email: token.email,
              activeSubscription: userActiveSubscription,
            },
          };
        }

        // console.log(session, '\nsession cb - END\n');
        return Promise.resolve(session);
      } catch (err) {
        // console.log(session, '\nsession cb - END\n');
        throw new Error(err);
      }
    },
    // async signIn(user, account, profile) { return true },
    // async redirect(url, baseUrl) { return baseUrl },
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {
    createUser: async () => {
      console.log('event - user created');
    },
  },

  // Enable debug messages in the console if you are having problems
  debug: false,
});
