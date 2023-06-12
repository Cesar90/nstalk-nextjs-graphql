import React, { FC } from 'react'
import { gql, useQuery } from '@apollo/client'
import Head from 'next/head'
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from './fragments'
import { restaurant, restaurantVariables } from './../__generated__/restaurant'

const RESTAURANT_QUERY = gql`
  query restaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`

interface IProps {
  id: number
}

const SingleRestaurant: FC<IProps> = ({ id }) => {
  const { data } = useQuery<restaurant, restaurantVariables>(RESTAURANT_QUERY, {
    variables: {
      input: {
        restaurantId: id,
      },
    },
  })
  return (
    <div>
      <Head>
        <title>{data?.restaurant.restaurant?.name || ''} | Nuber Eats</title>
      </Head>
      <div
        className=' bg-gray-800 bg-center bg-cover py-48'
        style={{
          backgroundImage: `url(${data?.restaurant.restaurant?.coverImage})`,
        }}
      >
        <div className='bg-white xl:w-3/12 py-8 pl-48'>
          <h4 className='text-4xl mb-3'>{data?.restaurant.restaurant?.name}</h4>
          <h5 className='text-sm font-light mb-2'>{data?.restaurant.restaurant?.category?.name}</h5>
          <h6 className='text-sm font-light'>{data?.restaurant.restaurant?.address}</h6>
        </div>
      </div>
    </div>
  )
}

export default SingleRestaurant
