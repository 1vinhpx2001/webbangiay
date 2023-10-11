import React, { useEffect, useState } from 'react'
import { getUserByID, updateUserByID } from '../../api/UserApi'
import { useLocation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator';
import { getDistrict, getProvince, getWard } from '../../api/AuthApi';
import { UpdateError, UpdateSuccessReload } from '../../components/alert';
import ChangePasswordModal from '../../components/modals/ChangePasswordModal';

export default function Profile() {
   
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [user, setUser] = useState({});
    // const [loading, setLoad] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [isOpen, isOpenModal] = useState(false);
    
    useEffect(() => {
        async function getData() {
            // setLoad(true);
            let res = await getUserByID(id);
            if (res.success) {
                res.data.gender = res.data.gender.toLowerCase();
                setUser(res.data);
                // setLoad(false);
            }
        }
        getData();
    }, [id]);
    useEffect(() => {
        async function getProvinceAPI(data) {
            let provinces = await getProvince({ data });
            if (provinces.message === 'Success') {
                setProvinces(provinces.data);
            }
        }
        getProvinceAPI({});
    }, []);
    useEffect(() => {
        async function getDistrictAPI(province_id) {
            let districts = await getDistrict({ province_id });
            if (districts.message === 'Success') {
                setDistricts(districts.data);
            }
        }
        if (user.province !== undefined) {
            getDistrictAPI(user.province);
        }
    }, [user.province]);
    useEffect(() => {
        async function getWardAPI(district_id) {
            let wards = await getWard({ district_id });
            if (wards.message === 'Success') {
                setWards(wards.data);
            }
        }
        if (user.district !== undefined) {
            getWardAPI(user.district);
        }
    }, [user.district, user.province]);
    const handleChangeWard = (e) => {
        setUser({ ...user, ward: e.target.value });
    };
    const handleChangeDistrict = (e) => {
        setUser({ ...user, district: e.target.value, ward: undefined });
    };
    const handleChangeProvince = (e) => {
        setUser({ ...user, province: e.target.value, district: undefined, ward: undefined });
    };
    const handleChangeName = (e) => {
        setUser({ ...user, name: e.target.value });
    };
    const handleChangePhone = (e) => {
        setUser({ ...user, phone: e.target.value });
    };
    const handleChangeAddress = (e) => {
        setUser({ ...user, address: e.target.value });
    };
    const handleChangeGender = (e) => {
        setUser({ ...user, gender: e.target.value.toLowerCase() });
    };
    const updateInfo = async (data, id) => {

        let checkName = validator.isEmpty(user.name);
        let checkPhone = validator.isMobilePhone(user.phone, 'vi-VN');
        let checkProvince = user.province;
        let checkDistrict = user.district;
        let checkWard = user.ward;
        let checkAddress = validator.isEmpty(user.address)
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
        else if (checkProvince === undefined) {
            toast.error('Vui lòng chọn tỉnh thành', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        else if (checkDistrict === undefined) {
            toast.error('Vui lòng chọn quận huyện', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        else if (checkWard === undefined) {
            toast.error('Vui lòng chọn xã phường', {
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
        else {
            const wait = toast.loading('Vui lòng chờ ...');
            let res = await updateUserByID(data, id);
            if (res.success) {
                UpdateSuccessReload(wait, 'Cập nhật thông tin thành công', false);
                setUser({ ...res.data, gender: res.data.gender.toLowerCase() });
            } else {
                UpdateError(wait, 'Cập nhật không thành công');
            }
        }
    };
    const handleSaveInfo = () => {
        updateInfo(user, id);
    };
    return (
        <div>
            <div className='bg-shoesbg bg-cover h-[800px] flex justify-center' >
                <div className="relative flex flex-col justify-center overflow-hidden">
                    <div className="w-[530px] p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                        <h1 className="text-3xl font-semibold text-center text-yellow-700 underline">
                            Thông tin cá nhân
                        </h1>
                        <form className="mt-6">

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
                                    value={user.name}
                                    onChange={handleChangeName}
                                    className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    required
                                />
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
                                    value={user.phone}
                                    onChange={handleChangePhone}
                                    className="remove-arrow block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    required
                                />
                            </div>

                            <div className='grid grid-cols-2 gap-5 my-4'>
                                <div>
                                    <label htmlFor="province" className="block text-sm font-semibold text-gray-800 ">Tỉnh/Thành phố</label>
                                    <select value={user.province} onChange={handleChangeProvince} id="province" placeholder="Tỉnh/Thành phố" className=" block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40">
                                    
                                        {provinces.map((provinceItem) => (
                                            <option key={provinceItem.ProvinceID} value={provinceItem.ProvinceID}>
                                                {provinceItem.ProvinceName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="district" className=" block text-sm font-semibold text-gray-800">Quận/Huyện</label>
                                    <select value={user.district} onChange={handleChangeDistrict} id="district" placeholder="Quận/Huyện" className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40">
                                    
                                        {districts.slice(1).map((districtItem) => (
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
                                    <select value={user.ward} onChange={handleChangeWard} id="ward" placeholder="Phường/Xã" className=" block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40">
                                   
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
                                        value={user.address}
                                        onChange={handleChangeAddress}
                                        className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        required
                                    />
                                </div>
                            </div>

                            <div className='my-2'>
                                <label htmlFor="gender" className="block text-sm font-semibold text-gray-800">Giới tính</label>
                                <select value={user.gender} id="gender" onChange={handleChangeGender} className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40">
                                    <option value="male">Nam</option>
                                    <option value="female">Nữ</option>
                                </select>
                            </div>


                            <div className="mt-6 grid grid-cols-2 gap-16">
                                <button type='button' 
                                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-yellow-700 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
                                onClick={() => {
                                    isOpenModal(true);
                                  }}
                                >
                                  Đổi mật khẩu
                                </button>
                                {isOpen && (
                                  <ChangePasswordModal
                                    isOpen={isOpenModal}
                                  />
                                )}
                                   
                                <button type='button' onClick={handleSaveInfo} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-yellow-700 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600">
                                    Lưu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    )
}
