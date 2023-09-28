import React from 'react'

export default function Order() {
  return (
    <div>
      <div className=' bg-white w-10/12 rounded-lg mx-auto my-10 h-16 drop-shadow-lg flex justify-center items-center'>
        <p className='text-yellow-600 text-xl font-semibold'>ĐƠN HÀNG CỦA BẠN</p>
      </div>

      <div className=' bg-white w-10/12 rounded-lg mx-auto my-10 h-16 drop-shadow-lg grid grid-cols-6 pl-16 items-center'>

        <div>
          <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
            <input
              type="radio"
              name="flexRadioDefault"
              id="radioDefault01"
              defaultChecked />
            <label
              className='text-base font-semibold text-blue-gray-900 mx-3'
              htmlFor="radioDefault01">
              TẤT CẢ
            </label>
          </div>
        </div>

        <div>
          <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
            <input
              type="radio"
              name="flexRadioDefault"
              id="radioDefault02"
            />
            <label
              className='text-base font-semibold text-blue-gray-900 mx-3'
              htmlFor="radioDefault02">
              CHỜ XÁC NHẬN
            </label>
          </div>
        </div>

        <div>
          <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
            <input
              type="radio"
              name="flexRadioDefault"
              id="radioDefault03"
              defaultChecked />
            <label
              className='text-base font-semibold text-blue-gray-900 mx-3'
              htmlFor="radioDefault03">
              ĐANG XỬ LÝ
            </label>
          </div>
        </div>

        <div>
          <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
            <input
              type="radio"
              name="flexRadioDefault"
              id="radioDefault04"
              defaultChecked />
            <label
              className='text-base font-semibold text-blue-gray-900 mx-3'
              htmlFor="radioDefault04">
              ĐANG VẬN CHUYỂN
            </label>
          </div>
        </div>

        <div>
          <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
            <input
              type="radio"
              name="flexRadioDefault"
              id="radioDefault05"
              defaultChecked />
            <label
              className='text-base font-semibold text-blue-gray-900 mx-3'
              htmlFor="radioDefault05">
              ĐÃ GIAO
            </label>
          </div>
        </div>

        <div>
          <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
            <input
              type="radio"
              name="flexRadioDefault"
              id="radioDefault06"
              defaultChecked />
            <label
              className='text-base font-semibold text-blue-gray-900 mx-3'
              htmlFor="radioDefault06">
              ĐÃ HỦY
            </label>
          </div>
        </div>

      </div>


      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-10/12 mx-auto my-10 h-[400px]">
        <table className="w-full text-lg text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3">
                Đơn Hàng
              </th>
              <th scope="col" className="px-6 py-3">
                Ngày Tạo
              </th>
              <th scope="col" className="px-6 py-3">
                Tình Trạng Thanh Toán
              </th>
              <th scope="col" className="px-6 py-3">
                Tình Trạng Vận Chuyển
              </th>
              <th scope="col" className="px-6 py-3">
                Tổng Tiền
              </th>
              <th scope="col" className="px-6 py-3">
                Hủy
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4 ">
                Silver
              </td>
              <td className="px-6 py-4">
                Laptop
              </td>
              <td className="px-6 py-4">
                $2999
              </td>
              <td className="px-6 py-4">
                Laptop
              </td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
              </td>
            </tr>
            
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4 ">
                Silver
              </td>
              <td className="px-6 py-4">
                Laptop
              </td>
              <td className="px-6 py-4">
                $2999
              </td>
              <td className="px-6 py-4">
                Laptop
              </td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>



    </div>
  )
}
