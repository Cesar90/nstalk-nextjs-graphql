import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { gql, useQuery } from '@apollo/client'
import { RESTAURANT_FRAGMENT } from './fragments'
import { myRestaurants } from '__generated__/myRestaurants'
import { Restaurant } from './Restaurant'

export const MY_RESTAURANTS_QUERY = gql`
  query myRestaurants {
    myRestaurants {
      ok
      error
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`

const MyRestaurants = () => {
  const { data } = useQuery<myRestaurants>(MY_RESTAURANTS_QUERY)
  return (
    <div>
      <Head>
        <title>My Restaurants | Nuber Eats</title>
      </Head>
      <div className='max-w-screen-2xl mx-auto mt-32'>
        <h2 className='text-4xl font-medium mb-10'>My Restaurants</h2>
        {data?.myRestaurants.ok && data.myRestaurants.restaurants.length === 0 ? (
          <>
            <h4 className='text-xl mb-5'>You have no restaurants.</h4>
            <Link href='/admin/createrestaurant'>
              <a className='text-lime-600 hover:underline'>Create one &rarr;</a>
            </Link>
          </>
        ) : (
          <div className='grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10'>
            {data?.myRestaurants.restaurants.map((restaurant) => (
              <Restaurant
                categoryName={restaurant.category?.name}
                coverImg={restaurant.coverImage}
                href={`/admin/restaurant/${restaurant.id}/detail`}
                key={restaurant.id}
                name={restaurant.name}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyRestaurants
