import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink, makeVar } from '@apollo/client';
import { onError } from '@apollo/link-error';
import { getDataFromTree } from '@apollo/client/react/ssr';
// import { createUploadLink } from 'apollo-upload-client';
import withApollo from 'next-with-apollo';
import { setContext } from '@apollo/client/link/context';
/* eslint-disable */
import { endpoint, prodEndpoint } from '../config';
/* eslint-enable */
import { LOCALSTORAGE_TOKEN } from './constants';
import { isBrowser } from './helpers';
// import { PAGINATION_QUERY } from '@components/Pagination';

let token = null;
if(isBrowser()){
  token = localStorage.getItem(LOCALSTORAGE_TOKEN);
}
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);

// interface IProps{
//   // headers: Record<string, string> | undefined
//   headers: Record<string, string>
//   initialState: NormalizedCacheObject
// }

// interface IPoliceAllProducts{
//   args:{
//     skip: number
//     first: number
//   },
//   cache: InMemoryCache
// }
// type IHeader = Record<string, string>
/* eslint-disable */
export default withApollo(({ ctx, headers, initialState }) => {
/* eslint-enable */
  // this uses apollo-link-http under the hood, so all the options here come from that package
  // console.log(ctx);
  // console.log(headers);
  // const headers2 = { ...headers} as IHeader;

  const httpLink = createHttpLink({
    uri:
      process.env.NODE_ENV === 'production'
        ? `${process.env.NEXT_PUBLIC_DOMAIN}`
        : `${process.env.NEXT_PUBLIC_DOMAIN}`,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        'x-jwt': authTokenVar() || '',
      },
    };
  });

  // headers = headers as undefined
  // const uploadLink = (createUploadLink({
  //   uri: `${process.env.NODE_ENV}` === 'development' ? endpoint : prodEndpoint,
  //   // fetchOptions: {
  //   //   credentials: 'include',
  //   // },
  //   // pass the headers along from this request. This enables SSR with logged in state
  //   headers: headers2,
  // }) as unknown) as ApolloLink;

  return new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        if (networkError)
          console.log(
            `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
          );
      }),
      // this uses apollo-link-http under the hood, so all the options here come from that package
      // uploadLink
      authLink.concat(httpLink)
    ]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            isLoggedIn: {
              read() {
                return isLoggedInVar();
              },
            },
            token: {
              read() {
                return authTokenVar();
              },
            },
          },
        },
      },
    }).restore(initialState || {}),
  }) 
}
, { getDataFromTree });
