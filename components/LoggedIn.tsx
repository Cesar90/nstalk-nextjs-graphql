import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { meQuery } from '../__generated__/meQuery'

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`

const LoggedIn = () => {
  const { data, loading, error } = useQuery<meQuery>(ME_QUERY)
  if (!data || loading || error) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <span className='font-medium text-xl tracking-wide'>Loading....</span>
      </div>
    )
  }
  return <div>{data?.me.role}</div>
}

export default LoggedIn
