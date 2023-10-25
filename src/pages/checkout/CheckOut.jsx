import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { calShipingFee, getDistrict, getProvince, getService, getWard } from '../../api/AuthApi'
import { getCart } from '../../api/CartApi'
import { getUserByID } from '../../api/UserApi'
import { getUserFromLocalStorage } from '../../utils/userHandle'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdateError, UpdateSuccessReload } from '../../components/alert'
import validator from 'validator';
import { makeAnOrder } from '../../api/PaymentApi'

export default function CheckOut() {

    let navigate = useNavigate();
    let curUser = getUserFromLocalStorage();
    const formatPrice = (value) =>
        new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);

    const [cart, setCart] = useState({});
    useEffect(() => {
        async function getData() {
            let res = await getCart();
            setCart(res.data);
        }
        getData();
    }, []);

    const [user, setUser] = useState({});
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [province, setProvince] = useState();
    const [district, setDistrict] = useState();
    const [ward, setWard] = useState();
    const [shippingFee, setShippingFee] = useState(0);
    const [serviceType, setServiceType] = useState({});

    useEffect(() => {
        async function getData() {
            let res = await getUserByID(curUser.id);
            if (res.success) {
                setUser(res.data);
            }
        }
        getData();
    }, [curUser.id]);
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
        if (province !== undefined) {
            getDistrictAPI(province);
        }
    }, [province]);

    useEffect(() => {
        async function getWardAPI(district_id) {
            let wards = await getWard({ district_id });
            if (wards.message === 'Success') {
                setWards(wards.data);
            }
        }
        if (district !== undefined) {
            getWardAPI(district);
        }
    }, [province, district]);

    useEffect(() => {
        async function getServiceTypeAPI() {
            if (district, ward) {
                let service = await getService({
                    to_district_id: district,
                });
                if (service.code === 200) {
                    setServiceType({ list: service.data, value: service.data[0]?.service_type_id });
                }
            } else setServiceType();
        }
        getServiceTypeAPI();
    }, [district, ward]);
    useEffect(() => {
        async function calShippingFeeAPI() {
            if (district && ward && cart.totalProduct && serviceType) {
                let fee = await calShipingFee({
                    service_type_id: serviceType.value,
                    to_district_id: district,
                    to_ward_code: ward,
                    weight: 30 * cart.totalProduct < 30000 ? 30 * cart.totalProduct : 30000,
                    height: 10 * cart.totalProduct < 150 ? 10* cart.totalProduct : 150,
                });
                if (fee.code === 200) {
                    setShippingFee(fee.data.total);
                }
            } else setShippingFee(0);
        }
        calShippingFeeAPI();
    }, [serviceType]);

    const handleChangeWard = (e) => {
        setUser({ ...user, ward: e.target.value });
        setWard(e.target.value);
    };
    const handleChangeService = (e) => {
        setServiceType({ ...serviceType, value: e.target.value });
    };
    const handleChangeDistrict = (e) => {
        setUser({ ...user, district: e.target.value });
        setDistrict(e.target.value);
        setWard(undefined);
        setWards([]);
    };
    const handleChangeProvince = (e) => {
        setUser({ ...user, province: e.target.value });
        setProvince(e.target.value);
        setDistrict(undefined);
        setWard(undefined);
        setDistricts([]);
        setWards([]);
    };
    const handleChangeName = (e) => {
        setUser({ ...user, name: e.target.value });
    };
    const handleChangePhone = (e) => {
        setUser({ ...user, phone: e.target.value });
    };
    const handleChangeEmail = (e) => {
        setUser({ ...user, email: e.target.value });
    };
    const handleChangeAddress = (e) => {
        setUser({ ...user, address: e.target.value });
    };

    if (curUser?.id === undefined) {
        navigate('/');
    }
    const backCart = () => {
        navigate('/cart');    
    };
    const [paymentType, setPaymentType] = useState('cod');

    const handleChangePayment = (event) => {
        const radioButton = event.target;
        const value = radioButton.value;
        
        
        setPaymentType(value);
        console.log(paymentType)
      };

    const makeOrder = async (paymentType, orderId, user) => {
        if (province === undefined) {
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
        else if (district === undefined) {
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
        else if (ward === undefined) {
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
        else if (validator.isEmpty(user.address)) {
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
        else if (validator.isEmpty(user.name)) {
            toast.error('Vui lòng nhập Họ tên', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        } else if (!validator.isMobilePhone(user.phone, 'vi-VN')) {
            toast.error('Số điện thoại không hợp lệ. Vui lòng nhập lại', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        } else if (!validator.isEmail(user.email)) {
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
        else if (serviceType === undefined) {
            toast.error('Vui lòng chọn phương thức vận chuyển', {
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
            let res = await makeAnOrder(paymentType, orderId, {
                ...user,
                shippingFee: shippingFee, serviceType: serviceType.value
            });
            console.log(res)
            if (res.data.success) {
                if (paymentType === 'cod') {
                    UpdateSuccessReload(wait, 'Đặt hàng thành công', false);
                    window.location.href = '/order'
                } else {
                    window.location.href = res.data.data;
                }
            } else {
                if (res.data.status === 409) {
                    const errMsg = res.data.message.split(':')[1]
                    UpdateError(wait, `Quá số lượng sản phẩm ${errMsg} hiện có. Vui lòng chọn số lượng khác`);
                } else {
                    UpdateError(wait, 'Đặt hàng không thành công');
                }

            }
        }
    };

    const handleClickOrder = () => {
        makeOrder(paymentType, cart.id, user);
    };

    return (
        <div>
            <div className='text-yellow-600 font-semibold text-xl text-center my-10'>Thông tin mua hàng</div>
            <div className='w-10/12 mx-auto my-10 flex'>
                <div className='w-3/5'>
                    <div className='text-xl font-semibold mt-4'>Địa chỉ nhận hàng</div>
                    <form className='m-4'>
                        <div className='grid grid-cols-2 gap-5'>
                            <div>
                                <label htmlFor="province" className="block text-sm font-semibold text-gray-800 my-4">TỈNH THÀNH</label>
                                <select defaultValue="0"
                                    id="province"
                                    value={province || ''}
                                    onChange={handleChangeProvince}
                                    className=" block w-full px-4 py-2 mt-4  bg-white border border-gray-300 rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40">
                                    <option value="" disabled selected>Tỉnh/Thành phố</option>
                                    {provinces.map((provinceItem) => (
                                        <option key={provinceItem.ProvinceID} value={provinceItem.ProvinceID}>
                                            {provinceItem.ProvinceName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="district" className="mt-4 block text-sm font-semibold text-gray-800">QUẬN HUYỆN</label>
                                <select defaultValue="0"
                                    id="district"
                                    disabled={province === undefined ? true : false}
                                    value={district || ''}
                                    onChange={handleChangeDistrict}
                                    className="block w-full px-4 py-2 mt-4  bg-white border border-gray-300 rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40">
                                    <option value="" disabled selected>Quận/Huyện</option>
                                    {districts.slice(1).map((districtItem) => (
                                        <option key={districtItem.DistrictID} value={districtItem.DistrictID}>
                                            {districtItem.DistrictName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="wards" className="mt-4 block text-sm font-semibold text-gray-800">PHƯỜNG XÃ</label>
                            <select defaultValue="0"
                                id="wards"
                                disabled={district === undefined ? true : false}
                                value={ward || ''}
                                onChange={handleChangeWard}
                                className="block w-full px-4 py-2 mt-4  bg-white border border-gray-300 rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40">
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
                                className="mt-4 block text-sm font-semibold text-gray-800"
                                htmlFor='address'
                            >
                                ĐỊA CHỈ
                            </label>
                            <textarea
                                className='mt-4 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40'
                                name="address"
                                id="address"
                                cols="50"
                                rows="3"
                                value={user.address}
                                onChange={handleChangeAddress}
                                autoComplete='false'
                            ></textarea>
                        </div>
                        <div className=" mt-4 mb-2 grid grid-cols-2 gap-4 ">
                            <div>
                                <label
                                    htmlFor="fullname"
                                    className="mt-4 block text-sm font-semibold text-gray-800"
                                >
                                    HỌ TÊN
                                </label>
                                <input
                                    type="fullname"
                                    id='fullname'
                                    className="mt-4 block w-full px-4 py-2  bg-white border border-gray-300 rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    value={user.name}
                                    onChange={handleChangeName}
                                    placeholder='Họ tên...'
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="phoneNumber"
                                    className="mt-4 block text-sm font-semibold text-gray-800"
                                >
                                    SỐ ĐIỆN THOẠI
                                </label>
                                <input
                                    type="tel"
                                    id='phoneNumber'
                                    className="mt-4 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    value={user.phone}
                                    onChange={handleChangePhone}
                                    placeholder='Số điện thoại...'
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="mt-4 block text-sm font-semibold text-gray-800"
                            >
                                EMAIL
                            </label>
                            <input
                                type="email"
                                id='email'
                                autoComplete='false'
                                className="mt-4 w-full block  px-4 py-2 bg-white border border-gray-300 rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                value={user.email}
                                onChange={handleChangeEmail}
                                placeholder='Email của bạn....'
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="service" className="block text-sm font-semibold text-gray-800 my-4">PHƯƠNG THỨC VẬN CHUYỂN</label>
                            <select defaultValue="0"
                                id="service"
                                value={serviceType?.value || ''}
                                onChange={handleChangeService}
                                className="block w-full px-4 py-2 mt-4  bg-white border border-gray-300 rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40">
                                <option value="" disabled selected>PHƯƠNG THỨC VẬN CHUYỂN</option>
                                {serviceType?.list?.map((s) => (
                                    <option key={s.service_type_id} value={s.service_type_id}>
                                        {s.short_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        {/* PHƯƠNG THỨC THANH TOÁN */}
                        <div className="mt-4 block text-sm font-semibold text-gray-800">PHƯƠNG THỨC THANH TOÁN</div>
                        <div className='my-4'>
                            <input
                                type="radio"
                                name="inlineRadioOptions"
                                id='radio01'
                                value='cod'
                                defaultChecked
                                onChange={handleChangePayment}
                            />
                            <label
                                className='ml-3'
                                htmlFor='radio01'
                            >
                                Thanh toán khi giao hàng(COD) - Bạn được KIỂM TRA hàng và thanh toán khi nhận được hàng
                            </label>
                        </div>
                        <div className='my-4'>
                            <input
                                type="radio"
                                name="inlineRadioOptions"
                                id='radio02'
                                value='paypal'
                                onChange={handleChangePayment}
                            />
                            <label
                                className='ml-3'
                                htmlFor='radio02'
                            >
                                VNPAY
                            </label>
                        </div>
                        <div className='my-4'>
                            <input
                                type="radio"
                                name="inlineRadioOptions"
                                id='radio03'
                                value='vnpay'
                                onChange={handleChangePayment}
                            />
                            <label
                                className='ml-3'
                                htmlFor='radio03'
                            >
                                PAYPAL
                            </label>
                        </div>


                    </form>
                </div>
                <div className='w-2/5 '>
                    <div className='flex justify-between my-4'>
                        <div className='text-xl font-semibold mt-2'>Giỏ hàng của bạn</div>
                        <span className="mt-2 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-sm font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">Số loại:&nbsp;{cart?.totalProduct || 0}</span>
                    </div>
                    <div className='border border-collapse border-gray-300'>
                        <ul>
                            {/* Số sản phẩm được đặt */}
                            {cart.items?.map((cartItem) => (
                                <li className='flex justify-between p-4 border border-t border-gray-200'>
                                    <div className='flex gap-2'>
                                        <img src={cartItem.image} alt="Ảnh sản phẩm" className='object-cover w-[100px] h-[100px]' />
                                        <div className='mr-4'>
                                            <p className='font-semibold text-base'>{cartItem.name}</p>
                                            <p className='text-gray-600'>Số lượng:&nbsp;{cartItem.quantity}&nbsp;/&nbsp;Size:&nbsp;{cartItem.size}</p>
                                        </div>
                                    </div>
                                    <div className='font-bold text-lg'> {formatPrice(cartItem.subPrice)}</div>
                                </li>
                            ))}
                            {/* Phí giao hàng */}
                            <li className='p-4 border border-t border-gray-200 bg-gray-200'>
                                <div className='flex justify-between text-base'>
                                    <p>Tạm tính:</p>
                                    <p>{formatPrice(cart.totalPrice)}</p>
                                </div>
                                <div className='flex justify-between text-base'>
                                    <p>Phí vận chuyển:</p>
                                    <p>{formatPrice(shippingFee)}</p>
                                </div>
                            </li>

                            {/* Tổng tiền */}
                            <li className='flex justify-between p-4 border border-t-gray-300'>
                                <div>
                                    <p className='text-base'>Tổng tiền:</p>
                                </div>
                                <div className='font-bold text-lg'>{formatPrice(cart.totalPrice + shippingFee)}</div>
                            </li>
                        </ul>
                    </div>
                    <div className='my-4 flex gap-4'>
                        <button type='button' onClick={handleClickOrder} className="w-[200px] px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                            Đặt hàng
                        </button>
                        <button type='button' onClick={backCart} className="w-[200px] px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">
                            Quay lại giỏ hàng
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    )
}
