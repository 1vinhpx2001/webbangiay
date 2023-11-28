import React from 'react'
import { CheckOutlined, CloseOutlined } from "@mui/icons-material";
import { Link, useLocation } from 'react-router-dom';
export default function OrderNotification() {
    let locate = useLocation()
    let params = new URLSearchParams(locate.search);
    let cancel = params.get('cancel') === 'true';
    let success = params.get('success') === 'true';
    
    return (
        <div class="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
            <div class="rounded-lg bg-white p-8 text-center shadow-xl">
                {success === true ?
                    cancel === true ?
                        <>
                            <h1 class="mb-4 text-4xl font-bold">HỦY ĐƠN HÀNG THÀNH CÔNG</h1>
                            <CheckOutlined fontSize="large" color="success" />
                        </>

                        :
                        <>
                            <h1 class="mb-4 text-4xl font-bold">ĐẶT HÀNG THÀNH CÔNG</h1>
                            <CheckOutlined fontSize="large" color="success" />

                        </>

                    :
                    cancel === true ?
                        <>
                            <h1 class="mb-4 text-4xl font-bold"> HUỶ ĐƠN HÀNG THẤT BẠI</h1>
                            <CloseOutlined fontSize="large" color="error" />
                        </>
                        :
                        <>
                            <h1 class="mb-4 text-4xl font-bold">ĐẶT HÀNG THẤT BẠI</h1>
                            <CloseOutlined fontSize="large" color="error" />
                        </>
                }
                <p class="text-gray-600">Oops! Trang bạn tìm kiếm hiện không tồn tại.</p>
                <Link to="/" class="mt-4 inline-block rounded bg-yellow-700 px-4 py-2 font-semibold text-white hover:bg-yellow-600"> Về Trang chủ </Link>
            </div>
        </div>
    )
}
