import React from 'react'
import IconLocation from '../icons/IconLocation'
import IconPhone from '../icons/IconPhone'

export default function Footer() {
  return (
      <div className="flex flex-col items-center bg-gray-200 text-center  lg:text-left">
        <div className="container p-6">
          <div className="grid place-items-center md:grid-cols-2 lg:grid-cols-3">

            <div className="mb-6">
              <h5
                className="mb-2.5 font-bold uppercase text-neutral-800 ">
                ĐỊA CHỈ
              </h5>
              <ul className="mb-0 list-none">
                <li className='flex gap-2'>
                  <IconLocation></IconLocation>
                  <a href="#!" className="text-neutral-800 ">73 Lý Tự Trọng, Quận 1, Tp. HCM</a>
                </li>
                <li className='flex gap-2'>
                  <IconLocation></IconLocation>
                  <a href="#!" className="text-neutral-800 ">13 Nguyễn Thiện Thuật, Quận 3, TP. HCM</a>
                </li>
                <li className='flex gap-2'>
                  <IconLocation></IconLocation>
                  <a href="#!" className="text-neutral-800 ">210B Hồ Văn Huê, Quận Phú Nhuận, TP. HCM</a>
                </li>
                <li className='flex gap-2'>
                  <IconLocation></IconLocation>
                  <a href="#!" className="text-neutral-800 ">261 Phố Huế, Quận Hai Bà Trưng, Hà Nội</a>
                </li>
                <li className='flex gap-2'>
                  <IconPhone></IconPhone>
                  <a href="#!" className="text-neutral-800 ">0898 515 689</a>
                </li>
                <li className='flex gap-2'>
                  <a href="#!" className="text-neutral-800 ">Thời gian làm việc: Thứ Hai - Thứ Bảy 8h-17h</a>
                </li>
              </ul>
            </div>


            <div className="mb-6">
              <h5
                className="mb-2.5 font-bold uppercase text-neutral-800 ">
                HƯỚNG DẪN
              </h5>

              <ul className="mb-0 list-none">
                <li>
                  <a href="#!" className="text-neutral-800 ">HƯỚNG DẪN MUA HÀNG</a>
                </li>
                <li>
                  <a href="#!" className="text-neutral-800 ">GIAO NHẬN VÀ THANH TOÁN</a>
                </li>
                <li>
                  <a href="#!" className="text-neutral-800 ">ĐỔI TRẢ VÀ BẢO HÀNH</a>
                </li>
                <li>
                  <a href="#!" className="text-neutral-800 ">TRA CỨU ĐƠN HÀNG</a>
                </li>
                <li>
                  <a href="#!" className="text-neutral-800 ">ĐĂNG KÍ THÀNH VIÊN</a>
                </li>
              </ul>
            </div>


            <div className="mb-6">
              <h5
                className="mb-2.5 font-bold uppercase text-neutral-800 ">
                CHÍNH SÁCH
              </h5>

              <ul className="mb-0 list-none">
                <li>
                  <a href="#!" className="text-neutral-800 ">CHĂM SÓC KHÁCH HÀNG</a>
                </li>
                <li>
                  <a href="#!" className="text-neutral-800 ">CHÍNH SÁCH ĐỔI HÀNG</a>
                </li>
                <li>
                  <a href="#!" className="text-neutral-800">CHÍNH SÁCH BẢO HÀNH</a>
                </li>
                <li>
                  <a href="#!" className="text-neutral-800 ">CHÍNH SÁCH THANH TOÁN</a>
                </li>
                <li>
                  <a href="#!" className="text-neutral-800 ">CHÍNH SÁCH VẬN CHUYỂN</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-400 p-4 text-center text-neutral-700 ">
          © 2010 - 2023 Fashion Shoes
        </div>
      </div>
  )
}
