import { useEffect, useState } from 'react'
import CardProduct from '../../components/cardproduct/CardProduct'
import { addProductToCart, getProductByCategory, getProductByID } from '../../api/ProductApi'
import { getUserFromLocalStorage } from '../../utils/userHandle'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdateSuccessReload } from '../../components/alert/UpdateSuccessReload';
import { UpdateError } from '../../components/alert/UpdateError';
import { getReviewsByProduct } from '../../api/ReviewProductApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { Rating } from '@material-tailwind/react';
import ReactQuill from 'react-quill';
import { Tooltip } from '@nextui-org/react';
import { RadioGroup } from '@headlessui/react';
export default function ProductDetail() {

    const [loading, SetLoad] = useState(false);
    let navigate = useNavigate();
    // let userCur = getUserFromLocalStorage();
    const formatPrice = (value) =>
        new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    let [page, setPage] = useState(0);
    const [product, setProduct] = useState({});
    const [reviews, setReviews] = useState({});
    const [newProduct, setProducts] = useState([])
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    useEffect(() => {
        async function getData() {
            SetLoad(true);
            let res = await getProductByID(id);
            if (res.success) {
                setProduct(res.data);
                setProductOptionId(res.data.options[0].id);
                setColorList(res.data.options[0].variants);
                setColor(res.data.options[0].variants[0].color);
                setFee(res.data.options[0].extraFee);
                let result = await getProductByCategory(res.data.category, 0, '')
                if (result.success) {
                    setProducts(result.data.list)
                    SetLoad(false);
                } else {
                    toast.error('Không tìm thấy sản phẩm liên quan nào', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                    SetLoad(false);
                }
            }
        }
        getData();
    }, [id]);
    useEffect(() => {
        async function getReviews() {
            let reviews = await getReviewsByProduct(id, page);
            if (reviews.success) {
                setReviews(reviews.data);
            }
        }
        getReviews();
    }, [id, page]);
    let curUser = getUserFromLocalStorage();
    const [colorList, setColorList] = useState([]);
    const [color, setColor] = useState('');
    const [extraFee, setFee] = useState(0);
    const [productOptionId, setProductOptionId] = useState('');
    const [loadMore, setLoadMore] = useState(false);
    const handleChangeSize = (e) => {
        setProductOptionId(e);
        product.options.forEach((option) => {
            if (option.id === e) {
                setColorList(option.variants);
                setColor(option.variants[0].color);
                setFee(option.extraFee);
            }
        });
    };
    const quantity = 1;
    const addToCart = async ({ productOptionId, color, quantity }) => {
        if (curUser?.id !== undefined) {
            const wait = toast.loading('Vui lòng chờ ...');
            let res = await addProductToCart({ productOptionId, color, quantity });
            if (res.data.success) {
                UpdateSuccessReload(wait, 'Thêm sản phẩm vào giỏ hàng thành công', false);
            } else {
                UpdateError(wait, 'Thêm sản phẩm vào giỏ hàng thất bại');
            }
        } else {
            toast.error('Vui lòng đăng nhập', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'light',
                onClose: () => {
                    navigate('/');
                },
            });
        }
    };
    const handleAddToCart = () => {
        addToCart({ productOptionId, color, quantity });
    };
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const handleLoadMore = () => {
        setLoadMore(!loadMore);
    };
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    const swapImages = (src) => {
        const topImage = document.getElementById('firstImage');
        topImage.src = src;
    };

    const [amount, setAmount] = useState(1)
    return (
        <div>
            <div className='w-10/12 mx-auto my-10'>
                <div>
                    <div className='flex flex-row justify-between gap-10 '>
                        <div className='flex flex-col gap-6 w-2/4'>
                            {product?.images?.slice(0, 1).map((image) => (
                                <div key={`${image.imageId}`}>
                                    <img src={`${image.url}`} id='firstImage' alt="...loading" className='w-5/6 h-5/6 object-cover aspect-square rounded-xl mx-auto' />
                                </div>
                            ))}

                            <div className='flex flex-row justify-between h-24'>
                                {product?.images?.slice(0, 4).map((image) => (
                                    <div key={`${image.imageId}`}>
                                        <img src={`${image.url}`} alt="...loading" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => swapImages(image.url)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* ABOUT */}
                        <div className='flex flex-col gap-3 w-2/4'>
                            <div>
                                <h1 className='text-3xl font-bold'>{product.name}</h1>
                                <div className='flex flex-row justify-between'>
                                    {product.state === 'enable' ? (
                                        <p className='text-base text-green-500'>
                                            Còn hàng
                                        </p>
                                    ) : (
                                        <>
                                            <p className='text-base text-red-500'>
                                            Hết hàng
                                            </p>
                                        </>
                                    )}
                                    <div className='flex gap-2'>
                                        <Rating unratedColor="amber" ratedColor="amber" value={product.rate} readonly></Rating>
                                        <p>{product.rateCount} đánh giá</p>
                                    </div>
                                     
                                </div>
                            </div>
                            <div className='text-gray-700'>
                            {product.description}
                            </div>
                            <h6 className='text-2xl font-semibold text-red-600'>Giá bán :&nbsp;{formatPrice(product.discountPrice + extraFee)}</h6>
                            <h6 className='text-lg font-semibold'>
                                Giá gốc: <del>Giá gốc:&nbsp;{formatPrice(product.price + extraFee)}</del>
                            </h6>
                            <RadioGroup className="mt-2" value={productOptionId} onChange={handleChangeSize}>
                            <div>Chọn size:</div>
                                    <div className="grid grid-cols-1 mt-2 gap-3 sm:grid-cols-3">
                                        {product?.options?.map((option) => (
                                            <Tooltip content={`Phí cộng thêm: ${formatPrice(option.extraFee)}`}>
                                                <RadioGroup.Option
                                                    key={option.id}
                                                    value={option.id}
                                                    onClick={setProductOptionId}
                                                    className={({ active, checked }) =>
                                                        classNames(
                                                            option.inStock > 0
                                                                ? 'cursor-pointer focus:outline-none'
                                                                : 'opacity-25 cursor-not-allowed',
                                                            
                                                            checked
                                                                ? 'bg-black border-transparent text-white '
                                                                : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                                                            'border rounded-md py-3 px-5 flex items-center justify-center text-sm font-medium uppercase sm:flex-1',
                                                        )
                                                    }
                                                    disabled={option.inStock <= 0}
                                                >
                                                    <RadioGroup.Label as="p">{option.name}</RadioGroup.Label>
                                                </RadioGroup.Option>
                                            </Tooltip>
                                        ))}
                                    </div>
                                </RadioGroup>
                            <div className="mt-6 grid grid-cols-2 gap-10">
                                <button type='button' onClick={handleAddToCart} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-yellow-700 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600">
                                    Thêm vào giỏ hàng
                                </button>

                                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-yellow-700 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600">
                                    Đi đến giỏ hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Sản phẩm liên quan */}
                <div>
                    <p className='text-xl text-yellow-700 font-semibold mt-16'>Sản phẩm liên quan</p>
                    <div className='my-10 flex justify-between'>
                        <CardProduct></CardProduct>
                        <CardProduct></CardProduct>
                        <CardProduct></CardProduct>
                        <CardProduct></CardProduct>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
