import React, { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { useForm } from 'react-hook-form'
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from '../__generated__/restaurantsPageQuery'
import { Restaurant } from './Restaurant'

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImage
        slug
        restaurantCount
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImage
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`

interface IFormProps {
  searchTerm: string
}

const Restaurants = () => {
  const { register, handleSubmit, getValues } = useForm<IFormProps>()
  const [page, setPage] = useState<number>(1)
  const { data, loading } = useQuery<restaurantsPageQuery, restaurantsPageQueryVariables>(
    RESTAURANTS_QUERY,
    {
      variables: {
        input: {
          page,
        },
      },
    },
  )

  const router = useRouter()
  const onSearchSubmit = () => {
    const { searchTerm } = getValues()
    router.push({
      pathname: '/search',
      search: `?term=${searchTerm}`,
    })
  }

  const onNextPageClick = () => setPage((current) => current + 1)
  const onPrevPageClick = () => setPage((current) => current - 1)

  return (
    <div>
      <Head>
        <title>Home | Nuber Eats</title>
      </Head>
      <div
        className='bg-gray-700 py-28 bg-center bg-cover'
        style={{
          backgroundImage:
            'url(https://thumbs.dreamstime.com/b/wooden-table-food-top-view-cafe-102532611.jpg)',
        }}
      >
        <form
          className=' w-full py-10 flex items-center justify-center'
          onSubmit={handleSubmit(onSearchSubmit)}
        >
          <input
            className='input rounded-md border-0 w-3/4 md:w-3/12'
            name='searchTerm'
            placeholder='Search Restaurants...'
            ref={register({ required: true, min: 3 })}
            type='Search'
          />
        </form>
      </div>
      {!loading && (
        <div className='max-w-screen-2xl pb-20 mx-auto mt-8'>
          <div className='flex justify-around max-w-screen-sm mx-auto'>
            {data?.allCategories.categories?.map((category) => (
              <Link href={`/category/${category.slug}`} key={category.id}>
                <div className='flex flex-col group items-center cursor-pointer'>
                  <div
                    className='w-14 h-14 bg-cover rounded-full group-hover:bg-gray-200'
                    key={category.id}
                    style={{ backgroundImage: `url(${category.coverImage})` }}
                  ></div>
                  <span className='mt-1 text-sm text-center font-medium'>{category.name}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className='grid mt-16 lg:grid-cols-3 gap-x-5 gap-y-10'>
            {data?.restaurants.results?.map((restaurant) => (
              <Restaurant
                categoryName={restaurant.category?.name}
                coverImg={restaurant.coverImage}
                href={`/restaurant/${restaurant.id}`}
                key={restaurant.id}
                name={restaurant.name}
              />
            ))}
          </div>
          <div className='grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10'>
            {page > 1 ? (
              <button className='focus:outline-none font-medium text-2xl' onClick={onPrevPageClick}>
                &larr;
              </button>
            ) : (
              <div></div>
            )}
            <span>
              Page {page} of {data?.restaurants.totalPages}
            </span>
            {page !== data?.restaurants.totalPages ? (
              <button className='focus:outline-none font-medium text-2xl' onClick={onNextPageClick}>
                &rarr;
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Restaurants
