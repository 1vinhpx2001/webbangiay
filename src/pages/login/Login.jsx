import React, { useState } from 'react'
import { userLogin } from "../../api/AuthApi";
import * as authAction from '../../redux/auth/authSlice';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Divider, Spinner } from '@nextui-org/react';

export default function Login() {
    
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoad] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const login = async ({ username, password }) => {

        const res = await userLogin({ username, password })

        if (res.data.success) {
            await dispatch(authAction.login(res.data));
            navigate('/')
            window.location.reload();
        }
        else {
            let message = "Sai tài khoản hoặc mật khẩu";
            toast.error(message, {
                position: toast.POSITION.TOP_RIGHT
            });
            ;
        }
        setLoad(false)
    }
    const onChangeUsernameHanle = (e) => {
        setUsername(e.target.value)
    }
    const onChangePasswordHanle = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = () => {
        setLoad(true)
        login({ username, password })
    }
    return (
        <div>
            <div className='bg-shoesbg bg-cover' >
                <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                    <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                        <h1 className="text-3xl font-semibold text-center text-yellow-700 underline">
                            Đăng nhập
                        </h1>
                        <form className="mt-6" >
                            <div className="mb-2">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Tài khoản
                                </label>
                                <input
                                    tabIndex={1}
                                    type="email"
                                    id='email'
                                    value={username}
                                    onChange={onChangeUsernameHanle}
                                    autoComplete='false'
                                    className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Mật khẩu
                                </label>
                                <input
                                    tabIndex={2}
                                    type={showPassword ? 'text' : 'password'}
                                    id='password'
                                    value={password}
                                    onChange={onChangePasswordHanle}
                                    className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    required
                                />
                            </div>

                            <div className='flex justify-between mt-4'>
                                <div className='flex gap-2'>
                                    <input type="checkbox" className='accent-yellow-700' checked={showPassword} onChange={handleTogglePassword} />
                                    <label className='text-sm'>Hiện mật khẩu</label>
                                </div>

                                <Link to='/forgot-password' className="text-sm text-yellow-700 hover:underline">
                                    Quên mật khẩu?
                                </Link>
                            </div>

                            <div className="mt-6">
                                <button type='button' disabled={loading  ? true : false} onClick={handleLogin} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-yellow-700 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600">
                                {loading ?<Spinner size='sm' color="default" /> : "Đăng nhập"}
                                </button>
                            </div>
                            <div className="mt-6">
                            <Divider/>
                            </div>
                            <div className="mt-6">
                                <Link to='https://sneakerheadstore-5968ae1f44cc.herokuapp.com/oauth2/authorization/google' className="w-full px-4 py-2 flex justify-center tracking-wide text-white transition-colors duration-200 transform bg-red-700 hover:bg-red-600 focus:outline-none focus:bg-red-600">
                                Sign in with Google
                                </Link>
                            </div>
                        </form>
                        <p className="mt-8 text-xs font-light text-center text-gray-700">
                            {" "}
                            Chưa có tài khoản?{" "}
                            <Link to='/register'
                                className="font-medium text-yellow-700 hover:underline"
                            >
                                Đăng ký
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
