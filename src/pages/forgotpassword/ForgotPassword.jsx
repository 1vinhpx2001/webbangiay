import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { resetPassword, verifyUser } from '../../api/AuthApi';
import validator from 'validator';
import { addToLocalStorage } from '../../utils/tokenHandle';
import { UpdateError, UpdateSuccessNavigate, UpdateSuccessReload } from '../../components/alert';
import { forgotPassword } from '../../api/UserApi';

export default function ForgotPassword() {
    
    const [activeStep, setActiveStep] = useState(0);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfrimPassword] = useState('');
    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleChangeOtp = (e) => {
        setOtp(e.target.value)
    }
    const handleChangeNewPassword = (e) => {
        setNewPassword(e.target.value)
    }
    const handleChangeConfirmPass = (e) => {
        setConfrimPassword(e.target.value)
    }
    const type = 'reset'

    const [id, setId] = useState('')
    const handleNext = async (e) => {
        const wait = toast.loading("Vui lòng chờ ...")
        let checkEmail = validator.isEmail(email)
        let checkOtp = !validator.isEmpty(otp)
        if (activeStep === 0) {
            if (checkEmail) {
                let check = await resetPassword({ email })
                UpdateSuccessReload(wait,'Mã xác thực đã được gửi đến email',false)
                if (check.data.success) {
                    setActiveStep(activeStep + 1);
                }
            } else {
                UpdateError(wait,'Vui lòng nhập chính xác email')
            }
        }
        else if (activeStep === 1) {
            if (checkOtp) {
                let checkOtp = await verifyUser({ otp, email, type })
                if (checkOtp.data.success) {
                    UpdateSuccessReload(wait,'Xác thực OTP thành công',false)
                    setId(checkOtp.data.data.id);
                    addToLocalStorage(checkOtp.data.data.token)
                    setActiveStep(activeStep + 1);
                } else {
                    UpdateError(wait,'OTP không đúng')
                }
            }
            else {
                UpdateError(wait,'Vui lòng nhập OTP')
            }
        }
    };
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    let oldPassword = otp
    const updatePass = async () => {
        const w = toast.loading("Vui lòng chờ ...")
        let checkPassword = !validator.isEmpty(newPassword) && newPassword.length >= 6
        let checkConfirmPass = !validator.isEmpty(confirmPassword) && (newPassword === confirmPassword)
        if (checkPassword && checkConfirmPass) {
            let res = await forgotPassword({ oldPassword, newPassword }, id)
            if (res.success) {
                let url = '/'
                UpdateSuccessNavigate(w,'Đổi mật khẩu thành công',url)
            } else {
                UpdateError(w,'Đổi mật khẩu thất bại')
            }
        } else {
            UpdateError(w,'Vui lòng nhập lại mật khẩu')
        }
    }
    const handleOnClick = () => {
        updatePass();
    }
    const sendOTPagain = async () => {
        const Wait = toast.loading("Vui lòng chờ ...")
        let res = await resetPassword({ email })
        if (res.data.success) {
            UpdateSuccessReload(Wait,'Gửi OTP thành công',false)
        } else {
            UpdateError(Wait,'Gửi OTP thất bại')
        }
    }
    const sendOTP = () => {
        sendOTPagain()
    }

  return (
    <div>
         <div className='bg-shoesbg bg-cover' >
                <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                    <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                        <h1 className="text-3xl font-semibold text-center text-yellow-700 underline">
                            Khôi phục mật khẩu
                        </h1>
                        <form className="mt-6" >
                        {activeStep === 0 ? <>
                            <div className="mb-2">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Nhập email của bạn:
                                </label>
                                <input
                                    
                                    type="email"
                                    id='email'
                                    value={email}
                                    onChange={handleChangeEmail}
                                    autoComplete='false'
                                    className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    required
                                />
                            </div>
                            
                            <div className="mt-6">
                                <button type='button' onClick={handleNext}className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-yellow-700 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600">
                                    Gửi mã xác thực
                                </button>
                            </div>
                        </> : <></>}
                        {activeStep === 1 ? <>
                            <div className="mb-2">
                                <label
                                    htmlFor="OTP"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Nhập mã otp:
                                </label>
                                <input
                                    type="OTP"
                                    id='OTP'
                                    value={otp}
                                    onChange={handleChangeOtp}
                                    autoComplete='false'
                                    className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    required
                                />
                            </div>
                            <div className='mt-2 flex justify-between'>
                                <button type='button' onClick={sendOTP} className='text-sm text-yellow-700 underline'>Gửi lại mã</button>
                                <button type='button' onClick={handleBack} className='text-sm text-yellow-700 underline'>Quay lại</button>
                            </div>
                            <div className="mt-6">
                                <button type='button' onClick={handleNext} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-yellow-700 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600">
                                    Nhập mã xác thực
                                </button>
                            </div>
                        </> : <></>}
                        {activeStep === 2 ? <>
                            <div className="mb-2">
                                <label
                                    htmlFor="newPassword"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Nhập mật khẩu mới:
                                </label>
                                <input
                                    type="password"
                                    id='newPassword'
                                    value={newPassword}
                                    onChange={handleChangeNewPassword}
                                    autoComplete='false'
                                    className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="confirmPass"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Xác nhận lại mật khẩu mới:
                                </label>
                                <input
                                    tabIndex={1}
                                    type="password"
                                    id='confirmPass'
                                    autoComplete='false'
                                    value={confirmPassword}
                                    onChange={handleChangeConfirmPass}
                                    className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    required
                                />
                            </div>
                            <div className='mt-6 flex justify-end'>
                                <button type='button' onClick={handleBack} className='text-sm text-yellow-700 underline'>Quay lại</button>
                            </div>
                            <div className="mt-6">
                                <button type='button' onClick={handleOnClick} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-yellow-700 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600">
                                    Đổi mật khẩu
                                </button>
                            </div>
                        </> : <></>}
                        </form>
 
                    </div>
                </div>
            </div>
            <ToastContainer/>
    </div>
  )
}
