import '@assets/main.css'
import type { AppProps } from 'next/app';
import App, { AppContext } from 'next/app';
import type { NextPageContext } from 'next'
import { ApolloProvider, ApolloClient } from '@apollo/client';
// import Router from 'next/router';
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
// import '@components/styles/nprogress.css';
// import Page from '@components/Page';
import withData from '@lib/withData';
// import { CartStateProvider } from '@lib/cartState'

// Router.events.on('routeChangeStart', () => NProgress.start())
// Router.events.on('routeChangeComplete', () => NProgress.done())
// Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps, apollo }: AppProps & { apollo: ApolloClient<{}> }) {
  return (
    <ApolloProvider client={apollo}>
      <Component {...pageProps}/> 
    </ApolloProvider>
  )
}

MyApp.getInitialProps = async (ctx: NextPageContext & AppContext) => {
  const appProps = await App.getInitialProps(ctx);
  return { ...appProps };
};

export default withData(MyApp)