import React from 'react'
import CarouselHome from '../../components/carousel/CarouselHome'
import CardProduct from '../../components/cardproduct/CardProduct'
import IconSeeMore from '../../components/icons/IconSeeMore'


export default function Homepage() {
  return (
    <div>
      <CarouselHome />
      <div className='w-[1200px] mx-auto my-5 '>

        {/* Sản phẩm mới section */}
        <p className='text-xl text-yellow-700 font-semibold mt-16'>SẢN PHẨM MỚI</p>
        <div className='flex justify-end'>
          <p className='text-blue-500  '>Xem thêm </p>
          <IconSeeMore />
        </div>
        <div className='my-2 grid grid-cols-5 gap-3 '>
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
        </div>

        {/* Addidas */}
        <p className='text-xl text-yellow-700 font-semibold mt-16'>ADDIDAS</p>
        <div className='flex justify-end'>
          <p className='text-blue-500  '>Xem thêm </p>
          <IconSeeMore />
        </div>
        <div className='my-2 grid grid-cols-5 gap-3 '>
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
        </div>

        {/* Nikes */}
        <p className='text-xl text-yellow-700 font-semibold mt-16'>NIKE</p>
        <div className='flex justify-end'>
          <p className='text-blue-500  '>Xem thêm </p>
          <IconSeeMore />
        </div>
        <div className='my-2 grid grid-cols-5 gap-3 '>
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
        </div>
      </div>
      <div className='h-[100px]'></div>
    </div>
  )
}
