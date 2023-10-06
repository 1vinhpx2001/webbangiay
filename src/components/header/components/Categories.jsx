import React from 'react'
import { Link } from 'react-router-dom'

export default function Categories({ categories}) {
  return (
    <div className='w-full flex flex-row gap-28 p-4'>
        
        {categories.map((category) =>(
            <div className='flex flex-col gap-2 text-base'>
            <Link to={`/product-list/${category.id}`}className='font-semibold uppercase'>
                {category.name}
            </Link>
           {category.subCategories.map((sub)=>(
            <Link to={`/product-list/${sub.id}`} className='hover:text-yellow-700'>
                    {sub.name}
            </Link>
           ))}
            </div>
        ))}

       
    </div>
  )
}
