import React from 'react'

export default function Login() {
    return (
        <div>
            
            <div className='bg-shoesbg bg-cover' >
                <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                    <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                        <h1 className="text-3xl font-semibold text-center text-yellow-700 underline">
                            Đăng nhập
                        </h1>
                        <form className="mt-6">
                            <div className="mb-2">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Tài khoản
                                </label>
                                <input
                                    type="email"
                                    id='email'
                                    className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Mật khẩu
                                </label>
                                <input
                                    type="password"
                                    id='password'
                                    className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    required
                                />
                            </div>
                            <a
                                href="#"
                                className="text-xs text-yellow-600 hover:underline"
                            >
                                Quên mật khẩu?
                            </a>
                            <div className="mt-6">
                                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-yellow-700 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600">
                                    Đăng nhập
                                </button>
                            </div>
                        </form>
                        <p className="mt-8 text-xs font-light text-center text-gray-700">
                            {" "}
                            Chưa có tài khoản?{" "}
                            <a
                                href="#"
                                className="font-medium text-yellow-600 hover:underline"
                            >
                                Đăng ký
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
