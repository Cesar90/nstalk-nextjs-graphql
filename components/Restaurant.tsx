import React from 'react'
import Link from 'next/link'

interface IRestaurantProps {
  coverImg: string
  name: string
  categoryName?: string
  href: string
}

export const Restaurant: React.FC<IRestaurantProps> = ({ coverImg, name, categoryName, href }) => (
  <Link href={`${href}`}>
    <div className='flex flex-col'>
      <div
        className='bg-red-500 bg-center bg-cover mb-3 py-32'
        style={{ backgroundImage: `url(${coverImg})` }}
      ></div>
      <h3 className='text-lg font-medium'>{name}</h3>
      <span className='border-t mt-2 py-2 border-gray-400 text-xs opacity-50'>{categoryName}</span>
    </div>
  </Link>
)
