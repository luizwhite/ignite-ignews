declare module 'next-auth' {
  export interface Session extends Record<string, unknown> {
    user: WithAdditionalParams<User>;
    accessToken?: string;
    expires: string;
  }
}

export {};
