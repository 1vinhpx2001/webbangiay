import React from 'react'

export default function Register() {
    return (
        <div>
            <div className='bg-shoesbg bg-cover' >
                <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                    <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                        <h1 className="text-3xl font-semibold text-center text-yellow-700 underline">
                            Đăng ký
                        </h1>
                        <form className="mt-6">
                            <div className=" mb-2 grid grid-cols-2 gap-4 ">
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block text-sm font-semibold text-gray-800"
                                    >
                                        Tên tài khoản
                                    </label>
                                    <input
                                        type="text"
                                        id='username'
                                        className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        required
                                    />
                                </div>
                                <div>
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
                            </div>

                            <div className=" mb-2 grid grid-cols-2 gap-4 ">
                                <div>
                                    <label
                                        htmlFor="fullName"
                                        className="block text-sm font-semibold text-gray-800"
                                    >
                                        Họ tên
                                    </label>
                                    <input
                                        type="text"
                                        id='fullName'
                                        className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        required
                                    />
                                </div>

                                <div >
                                    <div className="block text-sm font-semibold text-gray-800">Giới tính:</div>
                                    <div className='mt-3 grid grid-cols-3 gap-1'>
                                        <div>
                                            <input
                                                type="radio"
                                                name="inlineRadioOptions"
                                                id="femaleGender"
                                                defaultValue="Nữ"
                                                defaultChecked
                                            />
                                            <label
                                                htmlFor="femaleGender"
                                                className='ml-3'
                                            >
                                                Nữ
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                type="radio"
                                                name="inlineRadioOptions"
                                                id="maleGender"
                                                defaultValue="Nam"
                                                defaultChecked
                                            />
                                            <label
                                                htmlFor="maleGender"
                                                className='ml-3'
                                            >
                                                Nam
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" mb-2 grid grid-cols-2 gap-4 ">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-semibold text-gray-800"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id='email'
                                        className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="phoneNumber"
                                        className="block text-sm font-semibold text-gray-800"
                                    >
                                        Số điện thoại
                                    </label>
                                    <input
                                        type="tel"
                                        id='phoneNumber'
                                        className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label 
                                className="block text-sm font-semibold text-gray-800"
                                >
                                    Địa chỉ
                                </label>
                                <textarea
                                    className='block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40'
                                    name=""
                                    id=""
                                    cols="50"
                                    rows="5"
                                ></textarea>
                            </div>

                            <div className="mt-6">
                                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-yellow-700 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600">
                                    Đăng ký
                                </button>
                            </div>
                        </form>
                        <p className="mt-8 text-xs font-light text-center text-gray-700">
                            {" "}
                            Đã có tài khoản?{" "}
                            <a
                                href="#"
                                className="font-medium text-yellow-600 hover:underline"
                            >
                                Đăng nhập ngay
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
