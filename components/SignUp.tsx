import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Router from 'next/router'
import { gql, useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { FormError } from '../components/form-error'
import {
  createAccountMutation,
  createAccountMutationVariables,
} from '../__generated__/createAccountMutation'
import { UserRole } from '../__generated__/globalTypes'
import NuberLogo from '../images/logo.svg'
import { Button } from './Button'

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`

interface ICreateAccountForm {
  email: string
  password: string
  role: UserRole
}

const SignUp = () => {
  const { register, getValues, errors, handleSubmit, formState } = useForm<ICreateAccountForm>({
    mode: 'onChange',
    defaultValues: {
      role: UserRole.Client,
    },
  })

  const onCompleted = (data: createAccountMutation) => {
    const {
      createAccount: { ok },
    } = data
    if (ok) {
      Router.push({
        pathname: '/login',
      })
    }
  }
  const [createAccountMutation, { loading, data: createAccountMutationResult }] = useMutation<
    createAccountMutation,
    createAccountMutationVariables
  >(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  })
  const onSubmit = () => {
    if (!loading) {
      const { email, password, role } = getValues()
      createAccountMutation({
        variables: {
          createAccountInput: { email, password, role },
        },
      })
    }
  }
  return (
    <div className='h-screen  flex items-center flex-col mt-10 lg:mt-28'>
      <Head>
        <title>Create Account | Nuber Eats</title>
      </Head>
      <div className='w-full max-w-screen-sm flex flex-col items-center px-5'>
        <NuberLogo className='w-52 mb-5' />
        <h4 className='w-full font-medium text-left text-3xl'>Lets get started</h4>
        <form className='grid gap-1 mt-5 w-full' onSubmit={handleSubmit(onSubmit)}>
          <input
            className='input transition-colors'
            name='email'
            placeholder='Email'
            ref={register({
              required: 'Email is required',
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            type='email'
          />
          {errors.email?.message && <FormError errorMessage={errors.email?.message} />}
          {errors.email?.type === 'pattern' && (
            <FormError errorMessage={'Please enter a valid email'} />
          )}
          <input
            className='input'
            name='password'
            placeholder='Password'
            ref={register({ required: 'Password is required' })}
            type='password'
          />
          {errors.password?.message && <FormError errorMessage={errors.password?.message} />}
          <select className='input' name='role' ref={register({ required: true })}>
            {Object.keys(UserRole).map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>
          {/* {errors.password?.type === "minLength" && (
            <FormError errorMessage={"Password must be more than 10 chars"} />
          )} */}
          {/* <button className={`btn ${!formState.isValid ? " bg-gray-300 " : ""}`}>
              {loading ? "Loading" : "Log In"}
            </button> */}
          <Button actionText={'Create Account'} canClick={formState.isValid} loading={loading} />
          {createAccountMutationResult?.createAccount.error && (
            <FormError errorMessage={createAccountMutationResult.createAccount.error} />
          )}
        </form>
        <div>
          Already have an account?{' '}
          <Link href='/login'>
            <a className='text-lime-600 hover:underline mb-5'>Log in now</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp
