import React from 'react'
import Head from 'next/head'
import { useMe } from '@hooks/useMe'
import { Button } from '@components/Button'
import { useForm } from 'react-hook-form'
import { gql, useMutation } from '@apollo/client'
import { editProfile, editProfileVariables } from '../__generated__/editProfile'

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`

interface IFormProps {
  email?: string
  password?: string
}

const EditUser = () => {
  const { data: userData, refetch: refreshUser } = useMe()
  // const client = useApolloClient()
  const onCompleted = async (data: editProfile) => {
    const {
      editProfile: { ok },
    } = data
    if (ok && userData) {
      await refreshUser()
      // const { me: { email: prevEmail, id} } = userData
      // const { email: newEmail } = getValues()
      // if(prevEmail !== newEmail){
      //   client.writeFragment({
      //     id: `User:${id}`,
      //     fragment: gql`
      //       fragment EditedUser on User{
      //         verified
      //         email
      //       }
      //     `,
      //     data:{
      //       email: newEmail,
      //       verified: true
      //     }
      //   })
      // }
    }
  }
  const [editProfile, { loading }] = useMutation<editProfile, editProfileVariables>(
    EDIT_PROFILE_MUTATION,
    {
      onCompleted,
    },
  )
  const { register, handleSubmit, getValues, formState } = useForm<IFormProps>({
    mode: 'onChange',
    defaultValues: {
      email: userData?.me.email,
    },
  })
  const onSubmit = () => {
    const { email, password } = getValues()
    editProfile({
      variables: {
        input: {
          email,
          ...(password !== '' && { password }),
        },
      },
    })
  }
  return (
    <div className='mt-52 flex flex-col justify-center items-center'>
      <Head>
        <title>Edit Profile | Nuber East</title>
      </Head>
      <h4 className='font-semibold text-2xl mb-3'>Edit Profile</h4>
      <form
        className='grid max-w-screen-sm gap-3 mt-5 w-full mb-5'
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className='input'
          name='email'
          placeholder='Email'
          ref={register({
            pattern:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          type='email'
        />
        <input
          className='input'
          name='password'
          placeholder='Password'
          ref={register}
          type='password'
        />
        <Button actionText='Save Profile' canClick={formState.isValid} loading={loading}></Button>
      </form>
    </div>
  )
}

export default EditUser
