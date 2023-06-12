import React, { FC } from 'react'
import { gql, useQuery } from '@apollo/client'
import Head from 'next/head'
import Link from 'next/link'
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from './fragments'
import { myRestaurant, myRestaurantVariables } from '__generated__/myRestaurant'
import Dish from './Dish'

export const MY_RESTAURANT_QUERY = gql`
  query myRestaurant($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
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

const MyRestaurant: FC<IProps> = ({ id }) => {
  const { data } = useQuery<myRestaurant, myRestaurantVariables>(MY_RESTAURANT_QUERY, {
    variables: {
      input: {
        id: +id,
      },
    },
  })
  return (
    <div>
      <Head>{data?.myRestaurant.restaurant?.name || 'Loading...'} | Nuber Eats</Head>
      <div
        className='bg-gray-700 py-28 bg-center bg-cover'
        style={{
          backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImage})`,
        }}
      ></div>
      <div className='container mt-10'>
        <h2 className='text-4xl font-medium mb-10'>
          {data?.myRestaurant.restaurant?.name || 'Loading...'}
        </h2>
      </div>
      <div className='container mt-10'>
        <Link href={`/admin/restaurant/${id}/createdish`}>
          <a className='mr-8 text-white bg-gray-800 py-3  px-10'>Add Dish &rarr;</a>
        </Link>
      </div>
      <div className='mt-10'>
        {data?.myRestaurant.restaurant?.menu?.length === 0 ? (
          <h4 className='text-xl mb-5'>Plase upload a dish</h4>
        ) : (
          <div className='grid mt-6 md:grid-cols-3 gap-x-5 gap-y-10'>
            {data?.myRestaurant.restaurant?.menu?.map((dish) => (
              <Dish
                key={dish.id}
                description={dish.description}
                name={dish.name}
                price={dish.price}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyRestaurant
