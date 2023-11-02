import React, { useState } from 'react'
import IconQuitCross from '../icons/IconQuitCross'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearUserFromLocalStorage } from '../../utils/userHandle';
import { clearFromLocalStorage } from '../../utils/tokenHandle';
import { UpdateError, UpdateSuccessNavigate } from '../alert';
import validator from 'validator';
import { useLocation } from 'react-router-dom';
import { changePassword } from '../../api/UserApi';

export default function ChangePasswordModal({ isOpen }) {

    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [oldPassword, setoldPassword] = useState('')
    const [newPassword, setnewPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    const handleChangeoldPassword = (e) => {
        setoldPassword(e.target.value)
    }
    const handleChangenewPassword = (e) => {
        setnewPassword(e.target.value)
    }
    const handleChangeConfirmPass = (e) => {
        setConfirmPass(e.target.value)
    }
    const changePass = async () => {
        let oldPass = validator.isEmpty(oldPassword)
        let newPass = validator.isEmpty(newPassword)
        let confirm = validator.isEmpty(confirmPass)
        if (!oldPass && !newPass && !confirm) {
            if (newPassword !== oldPassword) {
                if (newPassword === confirmPass) {
                    const wait = toast.loading("Vui lòng chờ ...")
                    let res = await changePassword({ oldPassword, newPassword }, id)
                    if (res.success) {
                        clearUserFromLocalStorage()
                        clearFromLocalStorage()
                        let url = '/'
                        UpdateSuccessNavigate(wait, 'Đổi mật khẩu thành công', url)
                        isOpen(false)
                    } else {
                        UpdateError(wait, 'Đổi mật khẩu không thành công')
                    }
                } else {
                    toast.error('Mật khẩu nhập lại không chính xác', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                }

            } else {
                toast.error('Vui lòng nhập mật khẩu mới khác mật khẩu cũ', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }
        } else {
            toast.error('Vui lòng nhập đủ thông tin', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }

    }
    const handleClickChange = () => {
        changePass()

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
                        <h1 className='text-3xl font-semibold text-center text-yellow-700 underline'>ĐỔI MẬT KHẨU</h1>
                        <div className='my-4'>
                            <label
                                htmlFor="oldPassword"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Nhập mật khẩu cũ
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id='oldPassword'
                                value={oldPassword}
                                onChange={handleChangeoldPassword}
                                className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                required
                            />
                        </div>
                        <div className='my-4'>
                            <label
                                htmlFor="newPassword"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Nhập mật khẩu mới
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id='newPassword'
                                value={newPassword}
                                onChange={handleChangenewPassword}
                                className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                required
                            />
                        </div>
                        <div className='my-4'>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Nhập lại mật khẩu mới
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id='confirmPassword'
                                value={confirmPass}
                                onChange={handleChangeConfirmPass}
                                className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                required
                            />
                        </div>

                        <div className='flex gap-2 mt-4'>
                            <input type="checkbox" className='accent-yellow-700' checked={showPassword} onChange={handleTogglePassword} />
                            <label className='text-sm'>Hiện mật khẩu</label>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-16">
                            <button type='button' onClick={() => isOpen(false)} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">
                                Hủy bỏ
                            </button>
                            <button type='button' onClick={handleClickChange} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                Thay đổi
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
