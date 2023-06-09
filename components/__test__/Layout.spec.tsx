import React from 'react'
// import { render, screen, waitFor } from '@testing-library/react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
// import Router from 'next/router' // We will MOCK THIS
import Layout from '../Layout'
// import { isLoggedInVar } from '../../lib/withData'

// jest.mock('@apollo/client', () => ({
//   makeVar: () => {
//     // return { isLoggedInVar: { name: 'Test' } };
//     return null;
//   },
//   useReactiveVar: () => {
//     // return { isLoggedInVar: { name: 'Test' } };
//     return null;
//   },
// }));
jest.mock('next/router', () => ({
  push: jest.fn(),
}))

// jest.mock('next/router', () => ({
//   push: jest.fn(),
//   useRouter() {
//     return ({
//       route: '/',
//       pathname: '',
//       query: '',
//       asPath: '',
//       push: jest.fn(),
//       events: {
//         on: jest.fn(),
//         off: jest.fn()
//       },
//       beforePopState: jest.fn(() => null),
//       prefetch: jest.fn(() => null)
//     });
//   },
// }));

describe('<Layout>', () => {
  it('renders OK', async () => {
    render(<Layout>test</Layout>)
    // const { container } = render(<Layout>test</Layout>)
    // debug();
    // await waitFor(() => {
    //   isLoggedInVar(true)
    // })
    // const success = await screen.findByText(/test/i)
    // expect(success).toBeInTheDocument()
    // const text = screen.getByText('test')
    // expect(text).toHaveTextContent('test')
    // expect(container).toHaveTextContent('test')
  })

  it('renders no OK', async () => {
    render(<Layout>test</Layout>)
    // await waitFor(() => {
    //   isLoggedInVar(true)
    // })
    // debug();
    // expect(Router.push).toHaveBeenCalled()
    // expect(Router.push).toHaveBeenCalledWith({ pathname: '/' })
  })
})
