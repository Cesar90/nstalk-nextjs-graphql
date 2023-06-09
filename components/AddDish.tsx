import React, { FC, useState } from 'react'
import Head from 'next/head'
import { gql, useMutation } from '@apollo/client'
import Router from 'next/router'
import { useForm } from 'react-hook-form'
import { createDish, createDishVariables } from '__generated__/createDish'
import { MY_RESTAURANT_QUERY } from './MyRestaurant'
import { Button } from './Button'

const CREATE_DISH_MUTATION = gql`
  mutation createDish($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`

interface IForm {
  name: string
  price: string
  description: string
  [key: string]: string
}

interface IProps {
  id: number
}

const AddDish: FC<IProps> = ({ id }) => {
  const [optionsNumber, setOptionsNumber] = useState<number[]>([])
  const { register, handleSubmit, formState, getValues, setValue } = useForm<IForm>({
    mode: 'onChange',
  })

  const [createDishMutation, { loading }] = useMutation<createDish, createDishVariables>(
    CREATE_DISH_MUTATION,
    {
      refetchQueries: [
        {
          query: MY_RESTAURANT_QUERY,
          variables: {
            input: {
              id,
            },
          },
        },
      ],
    },
  )

  const onAddOptionClick = () => {
    setOptionsNumber((current) => [Date.now(), ...current])
  }

  const onSubmit = () => {
    const { name, price, description, ...rest } = getValues()
    const optionObjects = optionsNumber.map((theId) => ({
      name: rest[`${theId}-optionName`],
      extra: +rest[`${theId}-optionExtra`],
    }))
    createDishMutation({
      variables: {
        input: {
          name,
          price: +price,
          description,
          restaurantId: id,
          options: optionObjects,
        },
      },
    })
    Router.push({
      pathname: `/admin/restaurant/${id}/detail`,
    })
  }

  const onDeleteClick = (idToDelete: number) => {
    setOptionsNumber((current) => current.filter((id) => id !== idToDelete))
    setValue(`${idToDelete}-optionName`, '')
    setValue(`${idToDelete}-optionExtra`, '')
  }

  return (
    <div className='container flex flex-col items-center mt-20'>
      <Head>
        <title>Login | Nuber Eats</title>
      </Head>
      <h4 className='font-semibold text-2xl mb-3'>Add Dish</h4>
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
          min={0}
          name='price'
          placeholder='Price'
          ref={register({ required: 'Price is required.' })}
          type='number'
        />
        <input
          className='input'
          name='description'
          placeholder='Description'
          ref={register({ required: 'Description is required.' })}
          type='text'
        />
        <div className='my-10'>
          <h4 className='font-medium  mb-3 text-lg'>Dish Options</h4>
          <span
            className='cursor-pointer text-white bg-gray-900 py-1 px-2 mt-5 bg-'
            onClick={onAddOptionClick}
          >
            Add Dish Option
          </span>
          {optionsNumber.length !== 0 &&
            optionsNumber.map((id) => (
              <div className='mt-5' key={id}>
                <input
                  className='py-2 px-4 focus:outline-none mr-3 focus:border-gray-600 border-2'
                  name={`${id}-optionName`}
                  placeholder='Option Name'
                  ref={register}
                  type='text'
                />
                <input
                  className='py-2 px-4 focus:outline-none focus:border-gray-600 border-2'
                  min={0}
                  name={`${id}-optionExtra`}
                  placeholder='Option Extra'
                  ref={register}
                  type='number'
                />
                <span
                  className='cursor-pointer text-white bg-red-500 ml-3 py-3 px-4 mt-5 bg-'
                  onClick={() => onDeleteClick(id)}
                >
                  Delete Option
                </span>
              </div>
            ))}
        </div>
        <Button actionText='Create Dish' canClick={formState.isValid} loading={loading} />
      </form>
    </div>
  )
}

export default AddDish
