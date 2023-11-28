import React, { useEffect, useState } from 'react'
import CarouselHome from '../../components/carousel/CarouselHome'
import { getSortProducts } from '../../api/ProductApi'
import { getFromLocalStorage } from '../../utils/tokenHandle'
import { getUserFromLocalStorage } from '../../utils/userHandle'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Badge,
} from "@material-tailwind/react";
import { Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import LoadingCard from '../../components/loadingcard/LoadingCard'
import IconHome01 from '../../components/icons/IconHome01'
import IconHome02 from '../../components/icons/IconHome02'
import IconHome03 from '../../components/icons/IconHome03'


export default function Homepage() {
  const formatPrice = (value) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  let curUser = getUserFromLocalStorage();
  let curToken = getFromLocalStorage();

  const [hotProduct, setHotProduct] = useState([]);
  
  const [newProduct, setNewProduct] = useState([]);
  useEffect(() => {
    async function getHotProduct() {

      let [resHot, resNew] = await Promise.all([
        getSortProducts('discount,desc'),
        getSortProducts('createdDate,desc'),

      ]);
      if (resHot.success && resNew.success) {
        setHotProduct(resHot.data.list);
        setNewProduct(resNew.data.list);
      }
    }
    getHotProduct();
   
  }, []);
  return (
    <div className='mt-5'>
      <CarouselHome />
      <div className='w-10/12 mx-auto bg-blue-gray-50 md:flex p-10'>
        <div className='flex flex-col items-center md:w-1/3'>
          <IconHome01></IconHome01>
          <p className='text-yellow-700 text-2xl font-bold mt-2 text-center'>CAM KẾT CHÍNH HÃNG</p>
          <p className='text-xs font-semibold text-center'>100% Authentic</p>
          <p className='text-xs text-center'>Cam kết sản phẩm chính hãng từ Châu Âu, Châu Mỹ...</p>
        </div>
        <div className='flex flex-col items-center md:w-1/3 my-4 md:my-0'>
          <IconHome02></IconHome02>
          <p className='text-yellow-700 text-2xl font-bold mt-2 text-center'>GIAO HÀNG HỎA TỐC</p>
          <p className='text-xs font-semibold text-center'>Express Delivery</p>
          <p className='text-xs text-center'>SHIP hỏa tốc 1h nhận hàng trong thành phố HCM</p>
        </div>
        <div className='flex flex-col items-center md:w-1/3'>
          <IconHome03></IconHome03>
          <p className='text-yellow-700 text-2xl font-bold mt-2 text-center'>HỖ TRỢ 24/24</p>
          <p className='text-xs font-semibold text-center'>Supporting 24/24</p>
          <p className='text-xs text-center'>Gọi ngay 0898515689</p>
        </div>
      </div>
      <div className='w-10/12 mx-auto my-5 '>
        {/* Sản phẩm mới section */}
        <p className='text-xl text-yellow-700 font-semibold mt-16'>SẢN PHẨM MỚI</p>
        <div className='my-2'>
          <Swiper
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            spaceBetween={0}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            style={{
              '--swiper-navigation-color': '#f5bd24',
            }}
            modules={[Autoplay, Navigation]}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 0,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 0,
              },
            }}
            className="mySwiper"
          >
            {newProduct.length === 0 ? Array.from(new Array(6)).map((index) => (
              <SwiperSlide key={index} className='p-4'>
                <LoadingCard></LoadingCard>
              </SwiperSlide>
            )) :
              newProduct.map((product) =>
              (
                <SwiperSlide key={product.id} className='p-4'>

                  <Card className="w-full max-w-[280px] max-h-[430] shadow-lg">
                    <Badge color='amber' size="square" content="New">
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
                    </Badge>
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
                        <Rating readOnly precision={0.1} size="small" value={product.rate}></Rating>
                      </div>
                    </CardBody>
                  </Card>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>


        {/* Sản phẩm hot section */}
        <p className='text-xl text-yellow-700 font-semibold mt-16'>SẢN PHẨM HOT</p>
        <div className='my-2'>
          <Swiper
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            spaceBetween={0}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            style={{
              '--swiper-navigation-color': '#f5bd24',
            }}
            modules={[Autoplay, Navigation]}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 0,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 0,
              },
            }}
            className="mySwiper"
          >

            {hotProduct.length === 0 ? Array.from(new Array(6)).map((index) => (
              <SwiperSlide key={index}>
                <LoadingCard></LoadingCard>
              </SwiperSlide>
            )) :
              hotProduct.map((product) =>
              (
                <SwiperSlide key={product.id} className='p-4'>
                  <Card className="w-full max-w-[280px] max-h-[430] shadow-lg">
                    <Badge size="square" content="Hot">
                      <CardHeader floated={false} color="blue-gray" className='w-[240px] h-[240px]'>
                        <Badge color='green' content={'- ' + product.discount + '%'} className='mr-4 mt-2'>
                          <Link to={`/product-detail/${product.id}`}>
                            <img className=' w-[240px] h-[240px] transition duration-300 ease-in-out hover:scale-110 '
                              src={product.images[0]?.url}
                              alt={product.name}
                            />
                          </Link>
                        </Badge>
                      </CardHeader>
                    </Badge>
                    <CardBody>
                      <div className="mb-3 flex items-center justify-between">
                        <Typography variant="h5" color="blue-gray" className="font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                          {product.name}
                        </Typography>
                      </div>
                      <div id='temp' className='flex justify-between'>
                        <Typography color="gray">
                          <del>{product.discount > 0 ? formatPrice(product.price) : ''}</del>
                        </Typography>
                        <Typography color="gray">
                          {formatPrice(product.discountPrice)}
                        </Typography>
                      </div>
                      <div >
                        <Rating readOnly precision={0.1} size="small" value={product.rate}></Rating>
                      </div>
                    </CardBody>
                  </Card>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
      <div className='h-[100px]'></div>
    </div>
  )
}
