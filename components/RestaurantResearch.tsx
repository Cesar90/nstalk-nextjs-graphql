import React, { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { gql, useLazyQuery } from '@apollo/client'
import { RESTAURANT_FRAGMENT } from './fragments'
import { searchRestaurant, searchRestaurantVariables } from '../__generated__/searchRestaurant'

const SEARCH_RESTAURANT = gql`
  query searchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`

const RestaurantResearch = () => {
  const router = useRouter()
  const [queryReadyToStart] = useLazyQuery<
    searchRestaurant,
    searchRestaurantVariables
  >(SEARCH_RESTAURANT)
  useEffect(() => {
    const [_, query] = location.search.split('?term=')
    if (!query) {
      console.log(_);
      router.replace('/')
    }
    queryReadyToStart({
      variables: {
        input: {
          page: 1,
          query,
        },
      },
    })
  }, [router, queryReadyToStart])
  return (
    <h1>
      <Head>
        <title>Sarch | Nuber Eats</title>
      </Head>
      Search Page
    </h1>
  )
}

export default RestaurantResearch
