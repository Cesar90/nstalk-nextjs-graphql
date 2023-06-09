import React from 'react'
import Link from 'next/link'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMe } from '@hooks/useMe'
import NuberLogo from '../images/logo.svg'
import { isBrowser } from '@lib/helpers'
import { LOCALSTORAGE_TOKEN } from '@lib/constants'
import { UserRole } from '__generated__/globalTypes'

export const Header: React.FC = () => {
  const { data } = useMe()

  const logout = () => {
    if (isBrowser()) {
      localStorage.removeItem(LOCALSTORAGE_TOKEN)
      location.reload()
    }
  }

  return (
    <>
      <nav className='bg-white py-2 md:py-4'>
        <div className='container px-4 mx-auto md:flex md:items-center'>
          <div className='flex justify-between items-center'>
            <Link href='/'>
              <a className='font-bold text-xl text-indigo-600'>
                <NuberLogo className='w-36' />
              </a>
            </Link>
            <button
              className='border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden'
              id='navbar-toggle'
            >
              <FontAwesomeIcon className='text-3xl' icon={faBars} />
            </button>
          </div>
          <div
            className='hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0'
            id='navbar-collapse'
          >
            {data?.me && (
              <React.Fragment>
                {data?.me.role == UserRole.Owner && (
                  <React.Fragment>
                    <Link href='/admin/restaurants'>
                      <a className='p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300'>
                        My Restaurants
                      </a>
                    </Link>
                    <Link href='/admin/createrestaurant'>
                      <a className='p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300'>
                        Create Restaurant
                      </a>
                    </Link>
                    <Link href='/user/editprofile'>
                      <a className='p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300'>
                        My Profile
                      </a>
                    </Link>
                  </React.Fragment>
                )}
                <button
                  className='p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-solid border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1'
                  onClick={logout}
                  type='button'
                >
                  Logout
                </button>
              </React.Fragment>
            )}
            {!data?.me && (
              <React.Fragment>
                <Link href='/login'>
                  <a className='p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-transparent rounded hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-300'>
                    Login
                  </a>
                </Link>
                <Link href='/createaccount'>
                  <a
                    className='p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-solid border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1'
                    href='#'
                  >
                    Signup
                  </a>
                </Link>
              </React.Fragment>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}
