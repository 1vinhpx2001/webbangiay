import { useEffect, useState } from 'react'
import { addProductToCart, getProductByCategory, getProductByID } from '../../api/ProductApi'
import { getUserFromLocalStorage } from '../../utils/userHandle'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdateSuccessReload } from '../../components/alert/UpdateSuccessReload';
import { UpdateError } from '../../components/alert/UpdateError';
import { getReviewsByProduct } from '../../api/ReviewProductApi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Spinner, Tooltip } from '@nextui-org/react';
import { RadioGroup } from '@headlessui/react';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Badge,
} from "@material-tailwind/react";
import { Rating } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

    return (
        <div>

            <div className='w-10/12 mx-auto my-10'>
                <div>
                    {loading ? (
                        <Spinner color='warning' label='Đang tải...'></Spinner>)
                        : (
                            <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center '>
                                <div className='flex flex-col gap-6 lg:w-2/4'>
                                    {product?.images?.slice(0, 1).map((image) => (
                                        <div key={`${image.imageId}`}>
                                            <img src={`${image.url}`} id='firstImage' alt="...loading" className='w-full h-full aspect-square object-cover rounded-xl' />
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
                                <div className='flex flex-col gap-4 lg:w-2/4'>
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
                                                <Rating readOnly precision={0.1} size="small" value={product.rate}></Rating>
                                                <p>{product.rateCount} đánh giá</p>
                                            </div>

                                        </div>
                                    </div>
                                    <div>
                                    <ReactQuill className='text-xl' theme={'bubble'} readOnly value={product.description} />
                                    </div>
                                    <h6 className='text-2xl font-semibold text-red-600'>Giá bán :&nbsp;{formatPrice(product.discountPrice + extraFee)}</h6>
                                    <h6 className='text-lg font-semibold'>
                                        Giá gốc: <del>&nbsp;{formatPrice(product.price + extraFee)}</del>
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
                                    <RadioGroup className="mt-2" value={color} onChange={setColor}>
                                    <div>Chọn màu:</div>
                                    <div className="flex items-center space-x-3">
                                        {colorList.map((variant) => (
                                            <RadioGroup.Option
                                                key={variant.id}
                                                value={variant.color}
                                                className={({ active, checked }) =>
                                                    classNames( active && checked ? 'ring ring-offset-1' : '', !active && checked ? 'ring-2' : '','-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none',)
                                                }
                                                disabled={variant.stock <= 0}
                                                style={{ marginTop: 10 }}
                                            >
                                                <RadioGroup.Label as="p" className="sr-only">
                                                    {variant.color}
                                                </RadioGroup.Label>
                                                <span
                                                    style={{ backgroundColor: variant.color }}
                                                    className={classNames(
                                                        'z-10 h-8 w-8 border border-black border-opacity-10 rounded-full',
                                                    )}
                                                ></span>
                                            </RadioGroup.Option>
                                        ))}
                                    </div>
                                </RadioGroup>
                                    <div className="mt-6 grid grid-cols-2 gap-10">
                                        <button type='button' onClick={handleAddToCart} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-yellow-700 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600">
                                            Thêm vào giỏ hàng
                                        </button>
                                        <Link to='/cart'>
                                            <button type='button' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-yellow-700 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600">
                                                Đi đến giỏ hàng
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                </div>

                {/* Sản phẩm liên quan */}
                <div>
                    <p className='text-xl text-yellow-700 font-semibold mt-16'>Sản phẩm liên quan</p>
                    {loading ?
                        (
                            <Spinner color='warning' label='Đang tải...'></Spinner>
                        )
                        : newProduct?.length === 0 ? (
                            <div>Không tìm thấy sản phẩm nào</div>
                        ) : (
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                                {newProduct?.slice(0, 4).map((product) => (
                                        <Card key={product.id} className="w-full max-w-[280px] max-h-[430px] shadow-lg">
                                          <CardHeader floated={false} color="blue-gray"  >
                                            <Badge color='green' content={'- ' + product.discount + '%'} className='mr-4 mt-2'>
                                              <Link to={`/product-detail/${product.id}`}>
                                                <img className='h-[300px] transition duration-300 ease-in-out hover:scale-110  '
                                                  src={product.images[0]?.url}
                                                  alt={product.name}
                                                />
                                              </Link>
                                            </Badge>
                                          </CardHeader>

                                        <CardBody>
                                          <div className="mb-3 flex items-center justify-between">
                                            <Typography variant="h5" color="blue-gray" className="font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                                              {product.name}
                                            </Typography>
                                          </div>
                                          <div className='flex justify-between'>
                                            <Typography color="gray">
                                              <del>{product.discount > 0 ? formatPrice(product.price) : ''}</del>
                                            </Typography>
                                            <Typography color="gray">
                                              {formatPrice(product.discountPrice)}
                                            </Typography>
                                          </div>
                                          <div >
                                            <Rating readOnly precision={0.1} size="small" value={product.rate} ></Rating>
                                          </div>
                                        </CardBody>
                                      </Card>
                                ))}
                            </div>)}
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
