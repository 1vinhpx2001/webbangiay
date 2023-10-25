import React, { useEffect, useState } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Rating,
    Badge,
} from "@material-tailwind/react";
import {
    Pagination,
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button,
    Popover, PopoverTrigger, PopoverContent,
    CheckboxGroup, Checkbox
} from "@nextui-org/react";
import { Link, useLocation, useParams } from 'react-router-dom';
import { getProductByCategory, searchProduct } from '../../api/ProductApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { filter } from 'smart-array-filter';
import { Slider } from '@mui/material';
import { FilterAlt } from '@mui/icons-material';
import LoadingCard from '../../components/loadingcard/LoadingCard';




export default function ProductList() {

    const formatPrice = (value) =>
        new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(value);
    function valuetext(value) {
        return `${formatPrice(value)}`;
    }
    const [value, setValue] = useState([100000, 10000000]);

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };
    const [gender, setGender] = useState([])
    const [col, setCol] = useState([])
    const [loading, setLoad] = useState(false)
    const [filterProduct, setFilter] = useState([])
    const [products, setProducts] = useState([])
    let [page, setPage] = useState(0)
    let { id } = useParams();
    const locate = useLocation()
    let keySearch = new URLSearchParams(locate.search).get('q')
    async function getData(sort = '') {
        setLoad(true)
        let res
        switch (locate.pathname) {
            case '/search':
                res = await searchProduct(keySearch, sort)
                break;
            default:
                res = await getProductByCategory(id, page, sort)
                break;
        }
        if (res.success) {
            setProducts(res.data)
            setFilter(res.data.list)
            setLoad(false)
            filterPrice(res.data.list)
        } else {
            toast.error('Không tìm thấy sản phẩm nào', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            setLoad(false);
        }
    }
    const [sortPro, setSortPro] = useState('')
    useEffect(() => {
        getData(sortPro)
    }, [keySearch, id, page, sortPro])
    const sortArr = [
        { name: '', val: 'Nổi bật' },
        { name: 'new', val: 'Mới nhất' },
        { name: 'discount', val: "% giảm giá" },
        { name: 'priceAsc', val: 'Giá thấp đến cao' },
        { name: 'priceDesc', val: 'Giá cao đến thấp' }
    ]

    const [sort, setSort] = useState('')
    const sortProduct = (key) => {
        switch (key) {
            case 'discount':
                setSortPro('discount,desc')
                break;
            case 'priceAsc':
                setSortPro('price,asc')
                break;
            case 'priceDesc':
                setSortPro('price,desc')
                break;
            case 'new':
                setSortPro('createdDate,desc')
                break;
            default:
                setSortPro('')
                break;
        }
    }

    const filterPrice = (list = []) => {
        let arr = products.list
        if (list.length > 0) {
            arr = list
        }

        arr = filter(arr, {
            keywords: `discountPrice:${value[0]}..${value[1]}`
        });
        if (gender.length > 0) {
            arr = filter(arr, {
                keywords: `attr.val:${gender}`
            })
        }
        if (col.length > 0) {
            arr = filter(arr, {
                keywords: `images.color:${col}`
            })
        }

        if (arr.length > 0) {
            setFilter(arr)
        }
    }
    const resetFilter = () => {
        setCol([])
        setValue([100000, 10000000])
        setGender([])
        setFilter(products.list)
    }
    return (
        <div className='flex mx-auto w-10/12'>

            <div className='ml-6 flex flex-col justify-between'>
                <div>
                    <div className='flex justify-between'>
                        <p className='text-xl text-yellow-700 font-semibold mt-10 ml-5'>SẢN PHẨM NỔI BẬT</p>
                        <div className='mt-10 flex gap-2'>
                            <div>
                                <Popover placement="bottom">
                                    <PopoverTrigger>
                                        <Button>Lọc <FilterAlt></FilterAlt></Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className="px-1 py-2 grid grid-rows-5 gap-2">
                                            <div className="text-small font-bold">Giá: {formatPrice(value[0])} - {formatPrice(value[1])}</div>
                                            <Slider
                                                getAriaLabel={() => 'Price range'}
                                                value={value}
                                                onChange={handleChange}
                                                valueLabelDisplay="auto"
                                                getAriaValueText={valuetext}
                                                step={50000}
                                                max={10000000}
                                                min={100000}
                                                disableSwap

                                                valueLabelFormat={value => formatPrice(value)}
                                            />
                                            <div className="text-small font-bold">Giới tính</div>
                                            <CheckboxGroup
                                                orientation="horizontal"
                                                value={gender}
                                                onChange={setGender}
                                            >
                                                <Checkbox value="nam">Nam</Checkbox>
                                                <Checkbox value="nữ">Nữ</Checkbox>
                                            </CheckboxGroup>
                                            <Button size="sm" color='success' variant='ghost' className='text-sm' onClick={filterPrice}>Lọc sản phẩm</Button>
                                            <Button size="sm" bordered variant='ghost' color='danger' className='text-sm' onClick={resetFilter}> Hủy lọc</Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div>
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button light color="default" css={{ tt: "capitalize" }}>
                                            Sắp xếp: {sortArr.filter((item) => {
                                                return item.name === sort
                                            })[0].val}
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        aria-label="Single selection actions"
                                        color="warning"
                                        disallowEmptySelection
                                        selectionMode="single"
                                        selectedKeys={sort}
                                        onAction={(key) => { setSort(key); sortProduct(key) }}

                                    >
                                        {sortArr.map((sort) => (
                                            <DropdownItem key={sort.name}>{sort.val}</DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 '>
                        {loading ?
                            Array.from(new Array(8)).map(() => (
                                <div>
                                    <LoadingCard/>
                                </div>
                            )) :
                            filterProduct?.map((product) => (
                                <div>
                                    <Card className="w-full max-w-[280px] max-h-[430] shadow-lg">
                                        <CardHeader floated={false} color="blue-gray" className=' z-9 w-[240px] h-[240px]'>
                                            <Badge color='green' content={'- ' + product.discount + '%'} className='mr-4 mt-2'>
                                                <Link to={`/product-detail/${product.id}`}>

                                                    <img className=' w-[240px] h-[240px] transition duration-300 ease-in-out hover:scale-110 '
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
                                            <div>
                                                <Rating unratedColor='amber' ratedColor='amber' readonly></Rating>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                            ))}
                    </div>
                </div>

                <div className='my-10 mx-auto'>
                    <Pagination color='warning' loop onChange={(page) => { setPage(page - 1) }} total={products.totalPage} />
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    )
}

