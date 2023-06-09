import React, { FC } from 'react'
import { gql, useQuery } from '@apollo/client'
import { CATEGORY_FRAGMENTS, RESTAURANT_FRAGMENT } from './fragments'
import { category, categoryVariables } from '../__generated__/category'

const CATEGORY_QUERY = gql`
  query category($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
      category {
        ...CategoryParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENTS}
`

interface IProps {
  slug: string
}

export const Category: FC<IProps> = ({ slug }) => {
  useQuery<category, categoryVariables>(CATEGORY_QUERY, {
    variables: {
      input: {
        page: 1,
        slug,
      },
    },
  })
  return <h1>Category</h1>
}
