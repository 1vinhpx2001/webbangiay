import React from 'react'

export default function CheckOut() {
    return (
        <div>
            <div className='text-yellow-600 font-semibold text-xl text-center my-10'>Thông tin mua hàng</div>
            <div className='w-10/12 mx-auto my-10 flex'>
                <div className='w-4/6'>
                    <div className='text-xl font-semibold mt-4'>Địa chỉ nhận hàng</div>
                    <form className='m-4'>
                        <div className='grid grid-cols-2 gap-5'>
                            <div>
                                <label htmlFor="province" className="block text-sm font-semibold text-gray-800 my-4">TỈNH THÀNH</label>
                                <select defaultValue="0" id="province" className=" mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500">
                                    <option value="0">Choose a country</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="district" className="mt-4 block text-sm font-semibold text-gray-800">QUẬN HUYỆN</label>
                                <select defaultValue="0" id="district" className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500">
                                    <option value="0">Choose a country</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="wards" className="mt-4 block text-sm font-semibold text-gray-800">PHƯỜNG XÃ</label>
                            <select defaultValue="0" id="wards" className="mt-4 w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500">
                                <option value="0">Choose a country</option>
                            </select>
                        </div>
                        <div>
                            <label
                                className="mt-4 block text-sm font-semibold text-gray-800"
                                htmlFor='address'
                            >
                                ĐỊA CHỈ
                            </label>
                            <textarea
                                className='mt-4 block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border border-gray-300 rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40'
                                name="address"
                                id="address"
                                cols="50"
                                rows="3"
                                autoComplete='false'
                            ></textarea>
                        </div>
                        <div className=" mt-4 mb-2 grid grid-cols-2 gap-4 ">
                            <div>
                                <label
                                    htmlFor="fullname"
                                    className="mt-4 block text-sm font-semibold text-gray-800"
                                >
                                    HỌ TÊN
                                </label>
                                <input
                                    type="fullname"
                                    id='fullname'
                                    className="mt-4 block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border border-gray-300 rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="phoneNumber"
                                    className="mt-4 block text-sm font-semibold text-gray-800"
                                >
                                    SỐ ĐIỆN THOẠI
                                </label>
                                <input
                                    type="tel"
                                    id='phoneNumber'
                                    className="mt-4 block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border border-gray-300 rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="mt-4 block text-sm font-semibold text-gray-800"
                            >
                                EMAIL
                            </label>
                            <input
                                type="email"
                                id='email'
                                autoComplete='false'
                                className="mt-4 w-1/2 block w-1/2 px-4 py-2 mt-2 text-yellow-700 bg-white border border-gray-300 rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor='note'
                                className="mt-4 block text-sm font-semibold text-gray-800"
                            >
                                GHI CHÚ
                            </label>
                            <textarea
                                className='mt-4 block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border border-gray-300 rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40'
                                name="note"
                                id="note"
                                cols="50"
                                rows="3"
                                autoComplete='false'
                            ></textarea>
                        </div>
                        <div className="mt-4 block text-sm font-semibold text-gray-800">PHƯƠNG THỨC THANH TOÁN</div>
                        <div className='my-4'>
                            <input
                                type="radio"
                                name="inlineRadioOptions"
                                id='radio01'
                                defaultValue="Thanh toán khi giao hàng(COD)"
                                defaultChecked
                            />
                            <label
                                className='ml-3'
                                htmlFor='radio01'
                            >
                                Thanh toán khi giao hàng(COD) - Bạn được KIỂM TRA hàng và thanh toán khi nhận được hàng
                            </label>
                        </div>
                        <div className='my-4'>
                            <input
                                type="radio"
                                name="inlineRadioOptions"
                                defaultValue="Thanh toán khi giao hàng(COD)"
                                id='radio02'
                            />
                            <label
                                className='ml-3'
                                htmlFor='radio02'
                            >
                                Chuyển khoản qua ngân hàng
                            </label>
                        </div>
                        <button className="w-[200px] px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-yellow-700 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600">
                            Đặt hàng
                        </button>
                    </form>
                </div>
                <div className='w-2/6 '>
                    <div className='flex justify-between my-4'>
                        <div className='text-xl font-semibold mt-2'>Giỏ hàng của bạn</div>
                        <span className="mt-2 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">Số loại:1</span>
                    </div>
                    <div className='border border-collapse border-gray-300'>
                        <ul>
                            {/* Số sản phẩm được đặt */}
                            <li className='flex justify-between p-4 border border-t border-gray-200'>
                                <div className='mr-2'>
                                    <p className='font-semibold text-base'>Giày Sneaker Nam Adidas Alphaboost_v1 Hp6613</p>
                                    <p className='text-gray-600'>840.000 x 2</p>
                                </div>
                                <div className='font-bold text-lg'>1.680.0000</div>
                            </li>
                            <li className='flex justify-between p-4 border border-t border-gray-200'>
                                <div>
                                    <p className='font-semibold text-base'>Nikes 500</p>
                                    <p className='text-gray-600'>840.000 x 2</p>
                                </div>
                                <div className='font-bold text-lg'>1.680.000</div>
                            </li>

                            {/* Mã giảm giá */}
                            <li className='flex justify-between p-4 border border-t border-gray-200 bg-gray-200'>
                                <div>
                                    <div>
                                        <label
                                            htmlFor="discount"
                                            className="font-semibold text-base"
                                        >
                                            Mã giảm giá
                                        </label>
                                        <input
                                            type="text"
                                            id='discount'
                                            autoComplete='false'
                                            className="mt-4 block w-4/5 px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                            required
                                        />
                                    </div>
                                    <div className='flex my-4'>
                                        <button className="mr-4 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-yellow-700 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600">
                                            Nhập mã
                                        </button>
                                        <button className=" px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-yellow-700 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600">
                                            Làm mới
                                        </button>
                                    </div>
                                </div>
                            </li>

                            {/* Tổng tiền */}
                            <li className='flex justify-between p-4 border border-t-gray-300'>
                                <div>
                                    <p className='text-base'>Tổng tiền:</p>
                                </div>
                                <div className='font-bold text-lg'>1.680.000</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
