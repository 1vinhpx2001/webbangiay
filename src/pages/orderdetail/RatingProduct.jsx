import React, { useState } from 'react'
import { review } from '../../api/ReviewProductApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdateError, UpdateSuccessReload } from '../../components/alert';
import { Rating } from '@mui/material';
import { Spinner } from '@nextui-org/react';
import { getUserFromLocalStorage } from '../../utils/userHandle';
import IconQuitCross from '../../components/icons/IconQuitCross';

export default function RatingProduct({ productId, productName, isOpen, productImg }) {

    let userCurrent = getUserFromLocalStorage()

    const [load, setLoad] = useState(false)
    const [content, setContent] = useState('')
    const [rate, setRate] = useState(5.0)
    
    
    const closeHandler = () => {
        setContent('')
        setRate(5.0)
        isOpen(false)
    };
    const handleChangeContent = (e) => {
        setContent(e.target.value)
    }
    const handleChangeRate = (e) => {
        setRate(e.target.value)
    }
    const sendReview = async ({ content, productId, rate }) => {
        setLoad(true)
        if (userCurrent?.id === undefined) {
            toast.error('Vui lòng đăng nhập', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        } else {
            if (content === '') {
                toast.error('Vui lòng nhập nhận xét', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                const wait = toast.loading("Vui lòng chờ ...")
                let res = await review({ content, productId, rate })
                if (res.data.success) {
                    setLoad(false)
                    UpdateSuccessReload(wait, 'Gửi nhận xét đánh giá thành công', true);
                } else {
                    setLoad(false)
                    UpdateError(wait, 'Bạn đã đánh giá sản phẩm này')
                }
            }
        }
    }
    const handleClickSend = () => {
        sendReview({ content, productId, rate })
    }
    return (
        <div
            className=" z-[1000] bg-black bg-opacity-40 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 w-full md:inset-0 h-modal h-full justify-center items-center flex "
            aria-modal="true"
            role="dialog"
        >
            <div className="relative w-full h-full max-w-2xl p-4 md:h-auto">
                {/* <!-- Modal content --> */}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-start justify-between p-4 mx-4 border-b rounded-t border-slate-300 dark:border-gray-600">

                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm  ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => isOpen(false)}
                        >
                            <IconQuitCross></IconQuitCross>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <div className="p-6 ">
                        <img className='object-cover w-[150px] h-[150px] rounded-lg mx-auto mb-2' src={productImg} alt="...loading" />
                        <h1 className='text-base font-semibold text-center text-yellow-700 underline'>{productName}</h1>
                        <div className='my-4'>
                            <label
                                htmlFor='rating'
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Nhận xét:
                            </label>
                            <Rating onChange={handleChangeRate} value={rate} precision={0.5} max={5}></Rating>
                            <textarea
                                id='rating'
                                name='rating'
                                value={content}
                                cols="50"
                                rows="3"
                                onChange={handleChangeContent}
                                placeholder='Nhận xét...'
                                className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                required
                            />
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-16">
                            <button type='button' onClick={closeHandler} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">
                                Hủy bỏ
                            </button>
                            <button auto type='submit' disabled={content === '' || load ? true : false} onClick={handleClickSend} 
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform  rounded-md focus:outline-none bg-green-700 focus:bg-green-600 hover:bg-green-600"
                            >
                                {load ?
                                    <Spinner color='default' type='points-opacity' />
                                    : "Nhận xét"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
