import { AppProps } from 'next/app';
import { Provider as NextAuthProvider } from 'next-auth/client';

import { Header } from 'components/Header';

import GlobalStyle from 'styles/globals';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextAuthProvider
        options={{
          clientMaxAge: 0, // Disabled (always use cache value)
          keepAlive: 0, // Disabled
        }}
        session={pageProps.session}
      >
        <Header />
        <Component {...pageProps} />
      </NextAuthProvider>
      <GlobalStyle />
    </>
  );
}

export default MyApp;
