import React, { useEffect, useState } from 'react'
import { getCart, removeItemFromCart } from '../../api/CartApi'
import { addProductToCart } from '../../api/ProductApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdateError, UpdateSuccessNavigate, UpdateSuccessReload } from '../../components/alert';
import { useNavigate } from 'react-router-dom';
import { getUserFromLocalStorage } from '../../utils/userHandle';
import { Image,ButtonGroup, Button, Input } from "@nextui-org/react";
import IconDeleteItem from '../../components/icons/IconDeleteItem';


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
        navigate('/order');
    };
    return (
        <div>
            <div className=' bg-white w-10/12 rounded-lg mx-auto my-10 h-16 drop-shadow-lg flex justify-center items-center'>
                <p className='text-yellow-600 text-xl font-semibold'>GIỎ HÀNG CỦA BẠN</p>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-10/12 mx-auto my-4 h-[400px]">
                        <table className="table-auto w-full text-base text-left text-gray-500 border-collapse border border-gray-500">
                            <thead className=" text-xs text-gray-700 uppercase bg-gray-50 ">
                                <tr>
                                    <th scope="col" className="px-6 py-3 border border-gray-500">
                                        Sản phẩm
                                    </th>
                                    <th scope="col" className="px-6 py-3 border border-gray-500">
                                        Hình ảnh
                                    </th>
                                    <th scope="col" className="px-6 py-3 border border-gray-500">
                                        Giá tiền
                                    </th>
                                    <th scope="col" className="px-6 py-3 border border-gray-500">
                                        Size
                                    </th>
                                    <th scope="col" className="px-6 py-3 border border-gray-500">
                                        Số lượng
                                    </th>
                                    <th scope="col" className="px-6 py-3 border border-gray-500">
                                        Hủy
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {cart?.items?.map((cartItem) => (
                                <tr className="bg-white border-b ">
                                    <td scope="row" className=" px-6 py-4 font-medium  text-gray-900  dark:text-white border border-gray-500">
                                       <div className='w-64'>{cartItem.name}</div>
                                    </td>
                                    <td scope="row" className="px-6 py-4 border border-gray-500">
                                       <img src={cartItem.image} alt="product-image" className='w-[100px] h-[100px]' />
                                    </td>
                                    <td scope="row" className="px-6 py-4 border border-gray-500">
                                        {formatPrice(cartItem.price * cartItem.quantity)}
                                    </td>
                                    <td scope="row" className="px-6 py-4 border border-gray-500">
                                        {cartItem.size}
                                    </td>
                                    <td scope="row" className="px-6 py-4 border border-gray-500">
                                      
                                        <ButtonGroup>
                                            <Button
                                                clickable
                                                className='bg-yellow-600'
                                                size='sm'
                                                onPress={() => updateChangeCart(cartItem.productOptionId, cartItem.color, -1)}
                                            >
                                                -
                                            </Button>
                                            <Input
                                                isReadOnly
                                                size='sm'
                                                type={'number'}
                                                shadow={false}
                                                underlined
                                                radius='none'
                                                className='w-14'
                                                value={cartItem.quantity}
                                                defaultValue={cartItem.quantity}
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
                                            <Button
                                                clickable
                                                size='sm'
                                                className='bg-yellow-600'
                                                onPress={() => updateChangeCart(cartItem.productOptionId, cartItem.color, 1)}
                                            >
                                                +
                                            </Button>
                                            </ButtonGroup>
                                        
                                    </td>
                                    <td className="px-6 py-4 border border-gray-500">
                                        <button type='button' onClick={() => handleRemoveCartItem(cartItem.itemId)} className="font-medium text-red-600 hover:underline"><IconDeleteItem></IconDeleteItem></button>
                                    </td>
                                    
                                </tr>
                            ))}

                            </tbody>
                        </table>
                   

            </div>
            <div className='flex justify-center mb-10'>
                <button type='button' disabled={cart === '404'} onClick={handleClickOrder} className="w-30 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-yellow-700 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600">
                    Đặt hàng
                </button>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    )
}
