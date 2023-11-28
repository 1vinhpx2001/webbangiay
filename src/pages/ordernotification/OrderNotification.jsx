import React from 'react'
import { Link, useLocation } from 'react-router-dom';
export default function OrderNotification() {
    let locate = useLocation()
    let params = new URLSearchParams(locate.search);
    let cancel = params.get('cancel') === 'true';
    let success = params.get('success') === 'true';
    
    return (
        <div className="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
            <div className="rounded-lg bg-white p-8 text-center shadow-xl">
                {success === true ?
                    cancel === true ?
                        <>
                            <h1 className="mb-4 text-4xl font-bold">HỦY ĐƠN HÀNG THÀNH CÔNG!</h1>
                            <img
                                src={require('../../assets/Success.png')}
                                alt="image 1"
                                className="h-[100px] w-[100px] object-fill mx-auto"
                            />
                        </>
                        :
                        <>
                            <h1 className="mb-4 text-4xl font-bold">ĐẶT HÀNG THÀNH CÔNG!</h1>
                            <img
                                src={require('../../assets/Success.png')}
                                alt="image 2"
                                className="h-[100px] w-[100px] object-fill mx-auto"
                            />
                        </>

                    :
                    cancel === true ?
                        <>
                            <h1 className="mb-4 text-4xl font-bold"> HUỶ ĐƠN HÀNG THẤT BẠI!</h1>
                            <img
                                src={require('../../assets/Fail.png')}
                                alt="image 3"
                                className="h-[100px] w-[100px] object-fill mx-auto"
                            />
                        </>
                        :
                        <>
                            <h1 className="mb-4 text-4xl font-bold">ĐẶT HÀNG THẤT BẠI!</h1>
                            <img
                                src={require('../../assets/Fail.png')}
                                alt="image 4"
                                className="h-[100px] w-[100px] object-fill mx-auto"
                            />
                        </>
                }
                <p className="text-gray-600"></p>
                <Link to="/" className="mt-4 inline-block rounded bg-yellow-700 px-4 py-2 font-semibold text-white hover:bg-yellow-600"> Về Trang chủ </Link>
            </div>
        </div>
    )
}
