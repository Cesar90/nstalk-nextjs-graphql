import React from 'react'
import { Header } from './Header'

interface LayoutProps {
  children: React.ReactNode
}

const PublicLayout = ({ children }: LayoutProps) => {
  return (
    <React.Fragment>
      <Header />
      {children}
    </React.Fragment>
  )
}

export default PublicLayout
