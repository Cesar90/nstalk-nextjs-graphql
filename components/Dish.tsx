import React from 'react'
import { restaurant_restaurant_restaurant_menu_options } from '__generated__/restaurant'

interface IDishProps {
  id?: number
  description: string
  name: string
  price: number
  isCustomer?: boolean
  orderStarted?: boolean
  isSelected?: boolean
  options?: restaurant_restaurant_restaurant_menu_options[] | null
}

const Dish: React.FC<IDishProps> = ({
  description,
  name,
  price,
  isCustomer = false,
  orderStarted = false,
  options,
  isSelected,
  children: dishOptions,
}) => {
  return (
    <div
      className={` px-8 py-4 border cursor-pointer  transition-all ${
        isSelected ? 'border-gray-800' : ' hover:border-gray-800'
      }`}
    >
      <div className='mb-5'>
        <h3 className='text-lg font-medium flex items-center '>
          {name}{' '}
          {orderStarted && (
            <button
              className={`ml-3 py-1 px-3 focus:outline-none text-sm  text-white ${
                isSelected ? 'bg-red-500' : ' bg-lime-600'
              }`}
            >
              {isSelected ? 'Remove' : 'Add'}
            </button>
          )}
        </h3>
        <h4 className='font-medium'>{description}</h4>
      </div>
      <span>${price}</span>
      {isCustomer && options && options?.length !== 0 && (
        <div>
          <h5 className='mt-8 mb-3 font-medium'>Dish Options:</h5>
          <div className='grid gap-2  justify-start'>{dishOptions}</div>
        </div>
      )}
    </div>
  )
}

export default Dish
