import React from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
export default function ForgotPassword() {
  return (
    <div>
         <div className='bg-shoesbg bg-cover' >
                <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                    <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                        <h1 className="text-3xl font-semibold text-center text-yellow-700 underline">
                            Khôi phục mật khẩu
                        </h1>
                        <form className="mt-6" >
                            <div className="mb-2">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Nhập email của bạn:
                                </label>
                                <input
                                    tabIndex={1}
                                    type="email"
                                    id='email'
                                    autoComplete='false'
                                    className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    required
                                />
                            </div>
                            
                            <div className="mt-6">
                                <button type='button'  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-yellow-700 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600">
                                    Đăng nhập
                                </button>
                            </div>
                        </form>
 
                    </div>
                </div>
            </div>
            <ToastContainer/>
    </div>
  )
}
