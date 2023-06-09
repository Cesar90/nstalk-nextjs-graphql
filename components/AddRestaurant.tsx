import React, { useState } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { gql, useApolloClient, useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { createRestaurant, createRestaurantVariables } from '__generated__/createRestaurant'
import { Button } from './Button'
import { FormError } from './form-error'
import { MY_RESTAURANTS_QUERY } from './MyRestaurants'

export const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      error
      ok
      restaurantId
    }
  }
`

interface IFormProps {
  name: string
  address: string
  categoryName: string
  file: FileList
}

interface IRequestImg {
  url: string
}

const AddRestaurant = () => {
  const client = useApolloClient()
  const [imageUrl, setImageUrl] = useState<string>('')
  const [uploading, setUploading] = useState<boolean>(false)
  const { register, getValues, formState, handleSubmit } = useForm<IFormProps>({
    mode: 'onChange',
  })

  const onCompleted = (data: createRestaurant) => {
    const {
      createRestaurant: { ok, restaurantId },
    } = data
    if (ok) {
      setUploading(false)
      const { name, categoryName, address } = getValues()
      const queryResult = client.readQuery({ query: MY_RESTAURANTS_QUERY })
      if (!queryResult) {
        Router.push({
          pathname: '/admin/restaurants',
        })
      }
      client.writeQuery({
        query: MY_RESTAURANTS_QUERY,
        data: {
          myRestaurants: {
            ...queryResult.myRestaurants,
            restaurants: [
              {
                address,
                category: {
                  name: categoryName,
                  __typename: 'Category',
                },
                coverImage: imageUrl,
                id: restaurantId,
                isPromoted: false,
                name,
                __typename: 'Restaurant',
              },
              ...queryResult.myRestaurants.restaurants,
            ],
          },
        },
      })
      Router.push({
        pathname: '/admin/restaurants',
      })
    }
  }

  const [createRestaurantMutation, { data }] = useMutation<
    createRestaurant,
    createRestaurantVariables
  >(CREATE_RESTAURANT_MUTATION, {
    onCompleted,
    // refetchQueries: [{query: MY_RESTAURANTS_QUERY}]
  })

  const onSubmit = async () => {
    try {
      setUploading(true)
      const { file, name, address, categoryName } = getValues()
      const actualFile = file[0]
      const formBody = new FormData()
      formBody.append('file', actualFile)
      const { url: coverImg } = (await (
        await fetch('http://localhost:4000/uploads/', {
          method: 'POST',
          body: formBody,
        })
      ).json()) as IRequestImg
      setImageUrl(coverImg)
      createRestaurantMutation({
        variables: {
          input: {
            name,
            categoryName,
            address,
            coverImage: coverImg,
          },
        },
      })
      setUploading(false)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='container flex flex-col items-center mt-52'>
      <Head>
        <title>Add Restaurant | Nuber Eats</title>
      </Head>
      <form
        className='grid max-w-screen-sm gap-3 mt-5 w-full mb-5'
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className='input'
          name='name'
          placeholder='Name'
          ref={register({ required: 'Name is required.' })}
          type='text'
        />
        <input
          className='input'
          name='address'
          placeholder='Address'
          ref={register({ required: 'Address is required.' })}
          type='text'
        />
        <input
          className='input'
          name='categoryName'
          placeholder='Category Name'
          ref={register({ required: 'Category Name is required.' })}
          type='text'
        />
        <div>
          <input accept='image/*' name='file' ref={register({ required: true })} type='file' />
        </div>
        <Button actionText={'Create Restaurant'} canClick={formState.isValid} loading={uploading} />
        {data?.createRestaurant.error && <FormError errorMessage={data.createRestaurant.error} />}
      </form>
    </div>
  )
}

export default AddRestaurant
