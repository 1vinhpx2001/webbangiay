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
function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}
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
                    height: 10 * cart.totalProduct < 150 ? 10 * cart.totalProduct : 150,
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
            <div className='w-10/12 mx-auto my-10 md:flex'>
                <div className='md:w-3/5'>
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
                            <div className='flex'>
                                <input
                                    type="radio"
                                    name="inlineRadioOptions"
                                    id='radio01'
                                    value='cod'
                                    defaultChecked
                                    onChange={handleChangePayment}
                                />
                                <img src="data:image/png;base64,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" alt="vnpay" className='ml-4 mt-2 h-[30px] w-[40px]' />
                                <label
                                    className='ml-3'
                                    htmlFor='radio01'
                                >
                                    Thanh toán khi giao hàng(COD) - Bạn được KIỂM TRA hàng và thanh toán khi nhận được hàng
                                </label>
                            </div>
                        </div>
                        <div className='my-4'>
                            <div className='flex'>
                                <input
                                    type="radio"
                                    name="inlineRadioOptions"
                                    id='radio02'
                                    value='paypal'
                                    onChange={handleChangePayment}
                                />
                                <img src="data:image/png;base64,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" alt="vnpay" className='ml-4 h-[40px] w-[40px]' />
                                <label
                                    className='ml-3 mt-2'
                                    htmlFor='radio02'
                                >
                                    VNPAY
                                </label>
                            </div>
                        </div>
                        <div className='my-4'>
                            <div className='flex'>
                                <input
                                    type="radio"
                                    name="inlineRadioOptions"
                                    id='radio03'
                                    value='vnpay'
                                    onChange={handleChangePayment}
                                />
                                <img src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png" alt="vnpay" className='ml-4 h-[30px] w-[40px]' />
                                <label
                                    className='ml-3 mt-1'
                                    htmlFor='radio03'
                                >
                                    PAYPAL
                                </label>
                            </div>
                        </div>


                    </form>
                </div>
                <div className='md:w-2/5 '>
                    <div className='flex justify-between my-4'>
                        <div className='text-xl font-semibold mt-2'>Giỏ hàng của bạn</div>
                        <span className="mt-2 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-sm font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">Số loại:&nbsp;{cart?.totalProduct || 0}</span>
                    </div>
                    <div className='border border-collapse border-gray-300'>
                        <ul>
                            {/* Số sản phẩm được đặt */}
                            {cart.items?.map((cartItem) => (
                                <li className='flex justify-between p-4 border border-t border-gray-200'>
                                    <div className='xl:flex xl:gap-2'>
                                        <img src={cartItem.image} alt="Ảnh sản phẩm" className='object-cover w-[100px] h-[100px]' />
                                        <div className='mr-4'>
                                            <p className='font-semibold text-base'>{cartItem.name}</p>
                                            <p className="text-gray-700">Số lượng:&nbsp;{cartItem.quantity}</p>
                                            <div className='flex'>
                                                <p className="text-gray-700">Size:&nbsp;{cartItem.size}&nbsp;/&nbsp;</p>
                                                <p className="text-gray-700">Màu:</p>
                                                <span
                                                    className='z-10 mt-[2px] ml-1 h-5 w-5 border border-black border-opacity-20 rounded-full'
                                                    style={{ backgroundColor: cartItem.color }}
                                                ></span>
                                            </div>
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
