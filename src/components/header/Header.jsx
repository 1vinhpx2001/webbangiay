import React from 'react'
import IconSearch from '../icons/IconSearch'
import { Link } from 'react-router-dom'


export default function Header() {
  return (
    <div>

      <div className='flex items-center justify-end pr-6 py-2'>
        <Link to='/'className='pr-2 hover:text-yellow-700'>👑 SneakerHead</Link>
        <Link to='/login' className='border-l-[1px] border-gray-300 px-2 hover:text-yellow-700'>Đăng nhập</Link>
        <Link to='/register' className='border-l-[1px] border-gray-300 px-2 hover:text-yellow-700'>Đăng ký</Link>
      </div>

      <div className='flex items-center px-7 h-24'>
        <img src={require('../../assets/ShoesLogo.png')} alt="ShoesLogo" style={{ width: '80px', height: '80px' }} />
        <div>
          <div className='ml-2 font-bold'>SNEAKERHEAD SHOP</div>
          <div className='ml-2 font-bold text-xs'>Walk in style with fashion shoes.</div>
        </div>
        <Link to='/' className='font-bold ml-14 hover:text-yellow-700'>TRANG CHỦ</Link>
        <Link to='/product-list' className='font-bold mx-4 hover:text-yellow-700'>SẢN PHẨM</Link>
        <Link to='/cart' className='font-bold mx-4 hover:text-yellow-700'>GIỎ HÀNG</Link>
        <Link to='/order' className='font-bold mx-4 hover:text-yellow-700'>ĐƠN HÀNG</Link>
        <Link to='/'className='font-bold mx-4 hover:text-yellow-700'>CHÍNH SÁCH</Link>
       
        <form className='ml-auto'>
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="default-search" className="focus:outline-none block w-[300px] p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500" placeholder="Tìm kiếm sản phẩm..." required />
            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">
              <IconSearch></IconSearch>
            </button>
          </div>
        </form>
        
    
      </div>
    </div>
  )
}
