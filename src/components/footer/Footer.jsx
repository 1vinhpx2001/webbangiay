import React from 'react'
import IconLocation from '../icons/IconLocation'
import IconPhone from '../icons/IconPhone'

export default function Footer() {
  return (
    <div>
      <div className='bottom-0 bg-slate-100 h-60 flex flex-row justify-around pt-4 '>

        <div>
          <div className='text-xs font-bold'>ĐỊA CHỈ</div>

          <div className='flex my-2'>
            <IconLocation></IconLocation>
            <div className='ml-2'> 73 Lý Tự Trọng, Quận 1, Tp. HCM</div>
          </div>
          <div className='flex my-2'>
            <IconLocation></IconLocation>
            <div className='ml-2'> 13 Nguyễn Thiện Thuật, Quận 3, TP. HCM</div>
          </div>
          <div className='flex my-2'>
            <IconLocation></IconLocation>
            <div className='ml-2 '> 210B Hồ Văn Huê, Quận Phú Nhuận, TP. HCM</div>
          </div>
          <div className='flex my-2'>
            <IconLocation></IconLocation>
            <div className='ml-2 '> 261 Phố Huế, Quận Hai Bà Trưng, Hà Nội</div>
          </div>
          <div className='flex my-2'>
            <IconPhone></IconPhone>
            <div className='ml-2'> 0898 515 689</div>
          </div>

          <div> Thời gian làm việc: Thứ Hai - Thứ Bảy 8h-17h</div>
        </div>

        <div>
          <div className='text-xs font-bold'>HƯỚNG DẪN</div>
          <div className='my-2'>HƯỚNG DẪN MUA HÀNG</div>
          <div className='my-2'>GIAO NHẬN VÀ THANH TOÁN</div>
          <div className='my-2'>ĐỔI TRẢ VÀ BẢO HÀNH</div>
          <div className='my-2'>TRA CỨU ĐƠN HÀNG</div>
          <div className='my-2'>ĐĂNG KÍ THÀNH VIÊN</div>
          <div></div>
        </div>

        <div>
          <div className='text-xs font-bold'>CHÍNH SÁCH</div>
          <div className='my-2'>CHĂM SÓC KHÁCH HÀNG</div>
          <div className='my-2'>HỆ THỐNG TÍCH ĐIỂM</div>
          <div className='my-2'>CHÍNH SÁCH ĐỔI HÀNG</div>
          <div className='my-2'>CHÍNH SÁCH BẢO HÀNH</div>
          <div className='my-2'>CHÍNH SÁCH THANH TOÁN</div>
          <div className='my-2'>CHÍNH SÁCH VẬN CHUYỂN</div>
        </div>


      </div>
      <div className="bg-slate-200 flex justify-center">
        <hr className="light-100" />
        <h5>© 2010 - 2023 Fashion Shoes </h5>
      </div>
    </div>
  )
}
