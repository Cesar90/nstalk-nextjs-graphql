import React from 'react'
import Router from 'next/router'
import { useReactiveVar } from '@apollo/client'
import { isLoggedInVar } from '@lib/withData'
import { isBrowser } from '@lib/helpers'
import { Header } from './Header'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  if (!isLoggedIn && isBrowser()) {
    Router.push({
      pathname: '/',
    })
  }
  return (
    <React.Fragment>
      <Header />
      {children}
    </React.Fragment>
  )
}

export default Layout
