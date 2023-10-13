import React, { useEffect, useState } from 'react'
import { getCart, removeItemFromCart } from '../../api/CartApi'
import { addProductToCart } from '../../api/ProductApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdateError, UpdateSuccessNavigate, UpdateSuccessReload } from '../../components/alert';
import { useNavigate } from 'react-router-dom';
import { getUserFromLocalStorage } from '../../utils/userHandle';
import IconDeleteItem from '../../components/icons/IconDeleteItem';
import { Skeleton } from '@mui/material';


export default function Cart() {

    let navigate = useNavigate();
    const formatPrice = (value) =>
        new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    const [cart, setCart] = useState({});
    const [cartLoad, setCartLoad] = useState(false);
    useEffect(() => {
        async function getData() {
            let res = await getCart();
            if (res.success) {
                if (res.data.totalProduct === 0) {
                    setCart('404')
                } else {
                    setCart(res.data);
                }
            }
            else {
                setCart('404')
            }
        }
        getData();
    }, [cartLoad]);
    let curUser = getUserFromLocalStorage();
    const updateChangeCart = (productOptionId, color, quantity) => {
        if (quantity !== 0 && typeof quantity === 'number') {
            updateCart({ productOptionId, color, quantity });
        }
    };

    const updateCart = async ({ productOptionId, color, quantity }) => {
        const wait = toast.loading('Vui lòng chờ ...');
        if (curUser?.id !== undefined) {
            let res = await addProductToCart({ productOptionId, color, quantity });
            if (res.data.success) {
                setCartLoad(!cartLoad);
                UpdateSuccessReload(wait, 'Cập nhật giỏ hàng thành công', false);
            } else {
                if (res.data.status === 409) {
                    UpdateError(wait, 'Quá số lượng sản phẩm hiện có. Vui lòng chọn số lượng khác');
                } else {
                    UpdateError(wait, 'Cập nhật giỏ hàng không thành công');
                }
            }
        }
        else {
            let url = '/';
            UpdateSuccessNavigate(wait, 'Vui lòng Đăng nhập', url);
        }
    };
    const handleRemoveCartItem = async (id) => {
        const w = toast.loading('Vui lòng chờ ...');
        let res = await removeItemFromCart(id);
        if (res.success) {
            setCartLoad(!cartLoad);
            UpdateSuccessReload(w, 'Xoá sản phẩm khỏi giỏ hàng thành công', false);
        } else {
            UpdateError(w, 'Xoá sản phẩm khỏi giỏ hàng thất bại');
        }
    };
    const handleClickOrder = () => {
        navigate('/check-out');
    };
    return (
        <div>
            <div>
                <div className=' bg-white w-10/12 rounded-lg mx-auto my-10 h-16 drop-shadow-lg flex justify-center items-center'>
                    <p className='text-yellow-600 text-xl font-semibold'>GIỎ HÀNG CỦA BẠN</p>
                </div>

                <div className='w-10/12 mx-auto text-lg font-semibold'>{cart?.totalProduct || 0}&nbsp;Sản phẩm</div>

                <div className="w-10/12 mx-auto flex gap-10">
                    <div className="rounded-lg w-2/3">

                        {cart?.items?.map((cartItem) => (
                            <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                                <img src={cartItem.image} alt="product-image" className="w-full rounded-lg sm:w-40" />
                                <div className="sm:ml-4 flex sm:w-full sm:justify-between">
                                    <div className="mt-5 sm:mt-0">
                                        <h2 className="text-lg font-bold text-gray-900">{cartItem.name}</h2>
                                        <p className="mt-1 text-sm text-gray-700">Size:&nbsp;{cartItem.size}</p>
                                        <div className='flex gap-4'>
                                            <p className='mt-1 text-lg text-red-700 font-bold'>{formatPrice(cartItem.subPrice)}</p>
                                            <del className='mt-1 text-lg text-gray-500 font-bold'> {formatPrice(cartItem.price * cartItem.quantity)}</del>
                                        </div>
                                        <button onClick={() => handleRemoveCartItem(cartItem.itemId)} className="mt-14 space-x-4 text-red-600">       
                                            <IconDeleteItem></IconDeleteItem>
                                        </button>       
                                    </div>
                                    <div className="mt-4 sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                        <div className="flex items-center border-gray-100">
                                            <button onClick={() => updateChangeCart(cartItem.productOptionId, cartItem.color, -1)} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </button>
                                            <input readOnly
                                                className="h-8 w-8 border bg-white text-center text-xs outline-none"
                                                type="number"
                                                value={cartItem.quantity}
                                                defaultValue={cartItem.quantity}
                                                min="1"
                                                onBlur={(e) => {
                                                    if (e.target.value <= 0) {
                                                        toast.error('Số lượng không hợp lệ. Vui lòng nhập lại', {
                                                            position: "top-right",
                                                            autoClose: 3000,
                                                            hideProgressBar: false,
                                                            closeOnClick: true,
                                                            pauseOnHover: false,
                                                            draggable: true,
                                                            progress: undefined,
                                                        });
                                                    } else {
                                                        updateChangeCart(
                                                            cartItem.productOptionId,
                                                            cartItem.color,
                                                            e.target.value - cartItem.quantity,
                                                        )
                                                    }
                                                }
                                                }
                                            />
                                            <button onClick={() => updateChangeCart(cartItem.productOptionId, cartItem.color, 1)} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </button>
                                        </div>
                                         
                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>
                    {/* <!-- Sub total --> */}
                    {cart === '404' ? <></> :
                    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 w-1/3">
                        {cart?.totalPrice !== undefined ? ( <>
                        <div className="mb-2 flex justify-between">
                            <p className="text-gray-700">Tổng số tiền</p>
                            <p className="text-gray-700">{formatPrice(cart?.items.reduce((total, cur) => total + (cur.price * cur.quantity), 0)) || 0}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-700">Giảm giá</p>
                            <p className="text-gray-700">{formatPrice(cart?.items.reduce((total, cur) => total + (cur.price * cur.quantity), 0) - cart?.totalPrice) || 0}</p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between">
                            <p className="text-lg font-bold">Thanh toán</p>
                            <div className="">
                                <p className="mb-1 text-lg font-bold"> {formatPrice(cart?.totalPrice || 0)}</p>
                            </div>
                        </div>
                        <button disabled={cart === '404'} onClick={handleClickOrder} className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Đặt hàng</button>
                        </>
                        ) : (
                            Array.from(new Array(5)).map((index) => (
                                <div key={index} css={{ marginTop: '$10' }}>
                                    <Skeleton width={'100%'} /> 
                                </div>
                            ))
                        )}
                    </div>
                    }
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    )
}
