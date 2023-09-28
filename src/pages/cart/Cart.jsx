import React from 'react'

export default function Cart() {
    return (
        <div>
            <div className=' bg-white w-10/12 rounded-lg mx-auto my-10 h-16 drop-shadow-lg flex justify-center items-center'>
                <p className='text-yellow-600 text-xl font-semibold'>GIỎ HÀNG CỦA BẠN</p>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-10/12 mx-auto my-10 h-[400px]">
                <table className="w-full text-lg text-left text-gray-500 dark:text-gray-400 border-collapse border border-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                        <tr>
                            <th scope="col" className="px-6 py-3 border border-gray-500">
                                Đơn Hàng
                            </th>
                            <th scope="col" className="px-6 py-3 border border-gray-500">
                                Ngày Tạo
                            </th>
                            <th scope="col" className="px-6 py-3 border border-gray-500">
                                Tình Trạng Thanh Toán
                            </th>
                            <th scope="col" className="px-6 py-3 border border-gray-500">
                                Tình Trạng Vận Chuyển
                            </th>
                            <th scope="col" className="px-6 py-3 border border-gray-500">
                                Tổng Tiền
                            </th>
                            <th scope="col" className="px-6 py-3 border border-gray-500">
                                Hủy
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border border-gray-500">
                                Apple MacBook Pro 17"
                            </th>
                            <td className="px-6 py-4 border border-gray-500">
                                Silver
                            </td>
                            <td className="px-6 py-4 border border-gray-500">
                                Laptop
                            </td>
                            <td className="px-6 py-4 border border-gray-500">
                                $2999
                            </td>
                            <td className="px-6 py-4 border border-gray-500">
                                Laptop
                            </td>
                            <td className="px-6 py-4 border border-gray-500">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                        </tr>

                       
                    </tbody>
                </table>
            </div>

        </div>
    )
}
