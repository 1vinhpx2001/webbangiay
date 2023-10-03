import React, { useEffect, useState } from 'react'
import { getDistrict, getProvince, getWard, userRegister, verifyUser } from '../../api/AuthApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator';
import { UpdateError, UpdateSuccessNavigate } from '../../components/alert';
import { Link, useNavigate } from 'react-router-dom';
import "./register.css";
export default function Register() {

    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [province, setProvince] = useState()
    const [district, setDistrict] = useState()
    const [ward, setWard] = useState()
    let navigate = useNavigate();
    useEffect(() => {
        async function getProvinceAPI(data) {
            let provinces = await getProvince({ data })
            if (provinces.message === 'Success') {
                setProvinces(provinces.data)
            }
        }
        getProvinceAPI({})
    }, [])
    useEffect(() => {
        async function getDistrictAPI(province_id) {
            let districts = await getDistrict({ province_id })
            if (districts.message === 'Success') {
                setDistricts(districts.data)
            }
        }
        if (province !== undefined) {
            setDistrict(undefined)
            setWard(undefined)
            setDistricts([])
            setWards([])
            getDistrictAPI(province)
        }
    }, [province])
    useEffect(() => {
        async function getWardAPI(district_id) {
            let wards = await getWard({ district_id })
            if (wards.message === 'Success') {
                setWards(wards.data)
            }
        }
        if (district !== undefined) {
            getWardAPI(district)
        }
    }, [district, province])
    const [activeStep, setActiveStep] = useState(0);
    const handleNext = async (e) => {
        let checkName = validator.isEmpty(name)
        let checkEmail = validator.isEmail(email)
        let checkAddress = validator.isEmpty(address)
        let checkPhone = validator.isMobilePhone(phone, 'vi-VN')
        let checkPassword = validator.isEmpty(password)
        let checkConfirmPass = validator.isEmpty(confirmPassword)
        if (checkName) {
            toast.error('Vui lòng nhập tên', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        else if (!checkEmail) {
            toast.error('Email không hợp lệ. Vui lòng nhập lại', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        else if (province === undefined) {
            toast.error('Vui lòng chọn tỉnh/thành phố', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        else if (district === undefined) {
            toast.error('Vui lòng chọn quận/huyện', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        else if (ward === undefined) {
            toast.error('Vui lòng chọn xã/phường', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        else if (checkAddress) {
            toast.error('Vui lòng nhập địa chỉ của bạn', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        else if (!checkPhone) {
            toast.error('Số điện thoại không hợp lệ. Vui lòng nhập lại', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        else if (checkPassword) {
            toast.error('Vui lòng nhập mật khẩu của bạn', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        else if (password.length < 6) {
            toast.error('Vui lòng nhập mật khẩu của bạn có độ dài hơn 6 kí tự', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        else if (checkConfirmPass) {
            toast.error('Mật khẩu nhập lại không đúng', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        else if (password !== confirmPassword) {
            toast.error('Vui lòng nhập lại mật khẩu chính xác', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            let check = await register({ name, email, password, phone, province, district, ward, address, gender })
            if (check.data.success) {
                setActiveStep(activeStep + 1);
            } else {
                if (check.data.status === 409) {
                    toast.warning('Email tồn tại. Vui lòng nhập email khác', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    toast.error('Đã xảy ra lỗi khi đăng ký', {
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
        }
    };
    const handleChangeWard = (e) => {
        setWard(e.target.value)
    }
    const handleChangeDistrict = (e) => {
        setDistrict(e.target.value)
        setWard(undefined)
        setWards([])
    }
    const handleChangeProvince = (e) => {
        setProvince(e.target.value)
        setDistrict(undefined)
        setWard(undefined)
    }
    const [name, setName] = useState('');
    const handleChangeName = (e) => {
        setName(e.target.value)
    }
    const [email, setEmail] = useState('');
    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const [password, setPassword] = useState('');
    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }
    const [phone, setPhone] = useState('');
    const handleChangePhone = (e) => {
        setPhone(e.target.value)
    }
    const [address, setAddress] = useState('');
    const handleChangeAddress = (e) => {
        setAddress(e.target.value)
    }
    const [gender, setGender] = useState('male');
    const handleChangeGender = (e) => {
        setGender(e.target.value)
    }
    const [otp, setOtp] = useState('');
    const handleChangeOtp = (e) => {
        setOtp(e.target.value)
    }
    const register = async ({ name, email, password, phone, province, district, ward, address, gender }) => {
        const res = await userRegister({ name, email, password, phone, province, district, ward, address, gender })
        return res
    }
    let type = 'register';
    const handleOnClick = async () => {
        if (validator.isEmpty(otp)) {
            toast.error('Vui lòng nhập OTP', {
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
            let check = await verifyUser({ otp, email, type });
            if (check.data.success) {
                UpdateSuccessNavigate(wait, 'Đăng ký thành công', '/')
                navigate('/login')

            } else {
                UpdateError(wait, 'Xác thực thất bại')
            }
        }
    }

    return (
        <div>
            <div className='bg-shoesbg bg-cover h-[1000px] flex justify-center' >
                <div className="relative flex flex-col justify-center  overflow-hidden">
                    <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                        <h1 className="text-3xl font-semibold text-center text-yellow-700 underline">
                            Đăng ký
                        </h1>
                        <form className="mt-6">
                            {activeStep === 0 ? <>
                                <div className='block text-lg font-semibold text-center text-gray-800 '>Thông tin cá nhân</div>
                                <div className='my-2'>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-semibold text-gray-800"
                                    >
                                        Tên
                                    </label>
                                    <input
                                        type="text"
                                        id='name'
                                        value={name}
                                        onChange={handleChangeName}
                                        className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        required
                                    />
                                </div>

                                <div className='my-2'>
                                    <label htmlFor="gender" className="block text-sm font-semibold text-gray-800">Giới tính</label>
                                    <select value={gender} id="gender" onChange={handleChangeGender} className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40">
                                        <option value="male">Nam</option>
                                        <option value="female">Nữ</option>
                                    </select>
                                </div>

                                <div className='my-4'>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-semibold text-gray-800"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id='email'
                                        value={email}
                                        onChange={handleChangeEmail}
                                        className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        required
                                    />
                                    <span id="errEmail"></span>
                                </div>

                                <div className='grid grid-cols-2 gap-5 my-4'>
                                    <div>
                                        <label htmlFor="province" className="block text-sm font-semibold text-gray-800 ">Tỉnh/Thành phố</label>
                                        <select value={province} onChange={handleChangeProvince} id="province" placeholder="Tỉnh/Thành phố" className=" block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40">
                                            <option value="" disabled selected>Tỉnh/Thành phố</option>
                                            {provinces.map((provinceItem) => (
                                                <option key={provinceItem.ProvinceID} value={provinceItem.ProvinceID}>
                                                    {provinceItem.ProvinceName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="district" className=" block text-sm font-semibold text-gray-800">Quận/Huyện</label>
                                        <select value={district} onChange={handleChangeDistrict} id="district" placeholder="Quận/Huyện" className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40">
                                            <option value="" disabled selected>Quận/Huyện</option>
                                            {districts.map((districtItem) => (
                                                <option key={districtItem.DistrictID} value={districtItem.DistrictID}>
                                                    {districtItem.DistrictName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-5'>
                                    <div>
                                        <label htmlFor="ward" className="block text-sm font-semibold text-gray-800 ">Phường/Xã</label>
                                        <select value={ward} onChange={handleChangeWard} id="ward" placeholder="Phường/Xã" className=" block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40">
                                            <option value="" disabled selected>Phường/Xã</option>
                                            {wards.map((wardItem) => (
                                                <option key={wardItem.WardCode} value={wardItem.WardCode}>
                                                    {wardItem.WardName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="address"
                                            className="block text-sm font-semibold text-gray-800"
                                        >
                                            Địa chỉ
                                        </label>
                                        <input
                                            type="text"
                                            id='address'
                                            value={address}
                                            onChange={handleChangeAddress}
                                            className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className='my-2'>
                                    <label
                                        htmlFor="phone"
                                        className="block text-sm font-semibold text-gray-800"
                                    >
                                        Số điện thoại
                                    </label>
                                    <input
                                        type="number"
                                        id='phone'
                                        value={phone}
                                        onChange={handleChangePhone}
                                        className="remove-arrow block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        required
                                    />
                                </div>
                                <div className='my-2'>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-semibold text-gray-800"
                                    >
                                        Mật khẩu
                                    </label>
                                    <input
                                        type="password"
                                        id='password'
                                        value={password}
                                        onChange={handleChangePassword}
                                        className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        required
                                    />
                                </div>
                                <div className='my-2'>
                                    <label
                                        htmlFor="confirm"
                                        className="block text-sm font-semibold text-gray-800"
                                    >
                                        Nhập lại mật khẩu
                                    </label>
                                    <input
                                        type="password"
                                        id='confirm'
                                        value={confirmPassword}
                                        onChange={handleChangeConfirmPassword}
                                        className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        required
                                    />
                                </div>
                                <div className="mt-6">
                                    <button type='button' onClick={handleNext} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-yellow-700 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600">
                                        Gửi mã xác nhận
                                    </button>
                                </div>
                            </> : <></>}
                            {activeStep === 1 ? <>
                                <div className='block text-lg font-semibold text-center text-gray-800 '>XÁC THỰC</div>
                                <div className='my-2'>
                                    <label
                                        htmlFor="OTP"
                                        className="block text-sm font-semibold text-gray-800"
                                    >
                                        Nhập mã xác thực
                                    </label>
                                    <input
                                        type="text"
                                        id='OTP'
                                        value={otp}
                                        onChange={handleChangeOtp}
                                        className="block w-full px-4 py-2 mt-2 text-yellow-700 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        required
                                    />
                                    <div className="mt-6">
                                        <button type='button' onClick={handleOnClick} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-yellow-700 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600">
                                            Đăng ký
                                        </button>
                                    </div>
                                </div>
                            </> : <></>}
                        </form>
                        <p className="mt-8 text-xs font-light text-center text-gray-700">
                            {" "}
                            Đã có tài khoản?{" "}
                            <Link to='/login' className="font-medium text-yellow-600 hover:underline">
                                Đăng nhập ngay
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    )
}
