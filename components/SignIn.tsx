import React from 'react'
import { gql, useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import Head from 'next/head'
import { loginMutation, loginMutationVariables } from '../__generated__/loginMutation'
import NuberLogo from '../images/logo.svg'
import { LOCALSTORAGE_TOKEN } from '@lib/constants'
import { FormError } from './form-error'
import { Button } from './Button'
import { authTokenVar, isLoggedInVar } from '@lib/withData'
import { useRouter } from 'next/router'

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`

interface ILoginForm {
  email: string
  password: string
}

const SignIn = () => {
  const { register, getValues, handleSubmit, errors, formState } = useForm<ILoginForm>({
    mode: 'onChange',
  })
  const router = useRouter()
  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token },
    } = data
    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token)
      authTokenVar(token)
      isLoggedInVar(true)
      router.push('/')
    }
  }

  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  })

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues()
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      })
    }
  }

  const onInvalid = () => {
    console.log('cant create account')
  }

  return (
    <div className='h-screen  flex items-center flex-col mt-10 lg:mt-28'>
      <Head>
        <title>Login | Nuber Eats</title>
      </Head>
      <div className='w-full max-w-screen-sm flex flex-col items-center px-5'>
        <NuberLogo className='w-52 mb-5' />
        <h4 className='w-full font-medium text-left text-3xl'>Welcome back</h4>
        <form className='grid gap-1 mt-5 w-full' onSubmit={handleSubmit(onSubmit, onInvalid)}>
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
          <input
            className='input'
            name='password'
            placeholder='Password'
            ref={register({ required: 'Password is required' })}
            type='password'
          />
          {errors.password?.message && <FormError errorMessage={errors.password?.message} />}
          {errors.password?.type === 'minLength' && (
            <FormError errorMessage={'Password must be more than 10 chars'} />
          )}
          {/* <button className={`btn ${!formState.isValid ? " bg-gray-300 " : ""}`}>
            {loading ? "Loading" : "Log In"}
          </button> */}
          <Button actionText={'Log In'} canClick={formState.isValid} loading={loading} />
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        <div>
          New to Nuber?{' '}
          <Link href='/createaccount'>
            <a className='text-lime-600 hover:underline mb-3'>Create An Account</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignIn
