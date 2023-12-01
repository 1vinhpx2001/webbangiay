import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Divider, Button, Spinner, ButtonGroup } from "@nextui-org/react";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDistrict, getProvince, getWard } from '../../api/AuthApi';
import { UpdateError, UpdateSuccessNavigate } from '../../components/alert';
import { cancelOrder, finishOrder, getOrder } from '../../api/UserApi';
import RatingProduct from './RatingProduct';

const status = [
    { key: 0, step: 'enable', value: 'Bắt đầu' },
    { key: 1, step: 'process', value: 'Đang xử lý' },
    { key: 2, step: 'pending', value: 'Chờ xác nhận' },
    { key: 3, step: 'prepare', value: 'Đang chuẩn bị hàng' },
    { key: 4, step: 'delivery', value: 'Đang giao hàng' },
    { key: 5, step: 'delivered', value: 'Đã giao hàng' },
    { key: 6, step: 'done', value: 'Hoàn tất' },
]

export default function OrderDetail() {

    const formatPrice = (value) =>
        new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(value);

    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [order, setOrder] = useState({});
    const { id } = useParams();
    const [isOpen, isOpenModal] = useState(false);

    useEffect(() => {
        async function getOrderDetail() {
            let res = await getOrder(id)
            console.log(res)
            setOrder(res.data)
            console.log(res)
        }
        getOrderDetail()
    }, [id])
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
        getDistrictAPI(+order.deliveryDetail?.receiveProvince)
    }, [order])
    useEffect(() => {
        async function getWardAPI(district_id) {
            let wards = await getWard({ district_id })
            if (wards.message === 'Success') {
                setWards(wards.data)
            }
        }
        getWardAPI(+order.deliveryDetail?.receiveDistrict)
    }, [order])
    const cancel = async (id) => {
        const wait = toast.loading("Vui lòng chờ ...")
        let res = await cancelOrder(id)
        if (res.success) {
            UpdateSuccessNavigate(wait, 'Hủy đơn hàng thành công', '/order')
        } else {
            UpdateError(wait, 'Hủy đơn hàng thất bại')
        }

    }
    const handleCancel = () => {
        cancel(order.id)
    }

    const finish = async (id) => {
        const wait = toast.loading("Vui lòng chờ ...")
        let res = await finishOrder(id)
        console.log(res)
        if (res.success) {
            UpdateSuccessNavigate(wait, 'Xác nhận đã nhận hàng thành công', '/order')
        } else {
            UpdateError(wait, 'Xác nhận đã nhận hàng thất bại')
        }

    }
    const handleFinish = () => {
        finish(order.id)
    }

return (
        <div className='w-full sm:w-10/12 sm:mx-auto my-10'>
        {!order.id ?
        <div className='w-full flex justify-center items-center'>
        <Spinner size='lg' color='warning' label='Đang tải...'></Spinner> 
        </div>
        : 
        <>
            <div className='md:flex md:justify-between'>
                <div className='text-xl'>Mã đơn hàng: {order.id}</div>
                <Link to='/order' className='text-yellow-700 text-base my-4 md:my-0'>Đơn hàng của tôi</Link>
            </div>
            <div className=' mt-4 border border-gray-300 rounded-lg w-full  p-5 text-base'>
                <div className='lg:flex lg:gap-10'>
                    <div className='lg:w-3/5'>
                        {order.items?.map((item) => (
                            <div className='sm:flex gap-10 my-4'>
                                <img className='object-cover w-[150px] h-[150px] rounded-lg' src={item.image} alt="...loading" />
                                <div className='mt-4 sm:mt-0 flex flex-col justify-between'>
                                    <div>
                                    <p>{item.name}</p>
                                    {/* <p>Số lượng: {item.quantity} / Size: {item.size} / Màu: </p>
                                    <span className='z-10 mt-1 ml-1 h-5 w-5 border border-black border-opacity-20 rounded-full' style={{ backgroundColor: item.color }}></span> */}
                                    <div className='flex'>
                                    <p className="text-gray-700">Số lượng:&nbsp;{item.quantity}&nbsp;/&nbsp;Size:&nbsp;{item.size}&nbsp;/&nbsp;</p>
                                    <p className="text-gray-700">Màu:</p>
                                    <span
                                                className='z-10 mt-[2px] ml-1 h-5 w-5 border border-black border-opacity-20 rounded-full'
                                                style={{ backgroundColor: item.color }}
                                            ></span>
                                    </div>
                                    <p>{formatPrice(item.subPrice)}</p>
                                    </div>
                                    {order?.state === 'done'? 
                                    <>
                                    <Button color='secondary' variant='ghost' className='w-14 mt-2 sm:mt-0' productId={item.id} productName={item.name}
                                    onClick={() => {
                                        isOpenModal(true);
                                      }}
                                    >Phản hồi
                                    </Button>
                                    {isOpen && (
                                        <RatingProduct productId={item.id} productName={item.name} productImg={item.image}
                                          isOpen={isOpenModal}
                                        />
                                    )}
                                    </>
                                    : <></> }
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='lg:w-2/5'>
                        <p className='text-red-700'>Địa chỉ giao hàng</p>
                        <p className='text-gray-700'>
                            {order.deliveryDetail?.receiveAddress}/
                            {wards.map((ward) => (ward.WardCode === order.deliveryDetail?.receiveWard ? ward.WardName : ""))}/
                            {districts.map((district) => (district.DistrictID === +order.deliveryDetail?.receiveDistrict ? district.DistrictName : ""))}/
                            {provinces.map((province) => (province.ProvinceID === +order.deliveryDetail?.receiveProvince ? province.ProvinceName : ""))}
                        </p>
                        <p className='mt-4 text-red-700'>Thông tin mua hàng</p>
                        <p className='text-gray-700'>Người nhận: {order.deliveryDetail?.receiveName}</p>
                        <p className='text-gray-700'>Số điện thoại:  {order.deliveryDetail?.receivePhone}</p>
                    </div>

                </div>
                <Divider className='my-4'></Divider>
                <div>
                    <p className='text-xl'>Trạng thái đơn hàng:</p>
                    <Box sx={{ width: '100%', marginTop: 5 }}>
                        <Stepper activeStep={status.filter((state) =>
                            state.step === order.state
                        ).map((a) => a.key)} alternativeLabel>
                            {order.state === 'cancel' ?
                                <Step active >
                                    <StepLabel error>ĐÃ HUỶ</StepLabel>
                                </Step>
                                : status.map((state) => (
                                    state.step === order.state ?
                                        <Step active key={state.key}>
                                            <StepLabel>{state.value}</StepLabel>
                                        </Step> :
                                        <Step key={state.key}>
                                            <StepLabel>{state.value}</StepLabel>
                                        </Step>
                                ))
                            }
                        </Stepper>
                    </Box>
                </div>
            </div>
            <div className='bg-gray-300 p-5 text-base my-4 '>
                <p>Tạm tính: {formatPrice(order?.totalPrice)}</p>
                <p>Hình thức thanh toán: {order?.paymentType}</p>
                <p>Tình trạng thanh toán: {order?.paymentInfo.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
                <Divider className='my-4'></Divider>
                <p className='font-semibold'>Tổng cộng : {formatPrice(order.totalPrice + order.deliveryDetail.deliveryInfo?.fee || order.totalPrice)}</p>
                <div className='my-4'>
                    {order.state === 'pending' ?
                        <Button type='button' onClick={handleCancel} color='danger'>
                            Huỷ đơn hàng
                        </Button>
                        : order.state === 'delivered' ?
                            <Button type='button' onClick={handleFinish} color='success'>
                                Đã nhận hàng
                            </Button>
                            :
                            <></>
                    }
                </div>
            </div>
        </>
        }
            <ToastContainer></ToastContainer>
        </div>
    )
}
