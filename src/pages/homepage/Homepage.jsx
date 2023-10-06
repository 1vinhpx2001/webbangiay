import React, { useEffect, useState } from 'react'
import CarouselHome from '../../components/carousel/CarouselHome'
import { getSortProducts } from '../../api/ProductApi'
import { getRecommendProducts } from '../../api/UserApi'
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
  Rating,
  Badge,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
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
  const [recommends, setRecommends] = useState([]);
  useEffect(() => {
    async function getHotProduct() {
      let [resHot, resNew, recommends] = await Promise.all([
        getSortProducts('discount,desc'),
        getSortProducts('createdDate,desc'),

      ]);
      if (resHot.success && resNew.success) {
        setHotProduct(resHot.data.list);
        setNewProduct(resNew.data.list);
      }
    }
    // async function getRecommend() {
    //   if (curUser.id !== undefined && curToken !== undefined) {
    //     let res = await getRecommendProducts()
    //     if (res.success) {
    //       setRecommends(res.data)
    //     }
    //   }
    // }
    getHotProduct();
    // getRecommend()
  }, []);
  return (
    <div>
      <CarouselHome />
      <div className='w-[1200px] mx-auto my-5 '>
        {/* Sản phẩm mới section */}
        <p className='text-xl text-yellow-700 font-semibold mt-16'>SẢN PHẨM MỚI</p>
        <div className='my-2'>
          <Swiper
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}

            slidesPerView={4}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            style={{
              '--swiper-navigation-color': '#f5bd24',
            }}
            modules={[Autoplay, Navigation]}
            className="mySwiper"
          >

            {newProduct.map((product) =>
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
                      <Rating unratedColor='amber' ratedColor='amber' readonly></Rating>
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

            slidesPerView={4}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            style={{
              '--swiper-navigation-color': '#f5bd24',
            }}
            modules={[Autoplay, Navigation]}
            className="mySwiper"
          >

            {hotProduct.map((product) =>
            (
              <SwiperSlide key={product.id} className='p-4'>
                <Card className="w-full max-w-[280px] max-h-[430] shadow-lg">
                  <Badge size="square" content="Hot">
                    <CardHeader floated={false} color="blue-gray" className='w-[240px] h-[240px]'>
                      <Badge  color='green' content={'- ' + product.discount + '%'} className='mr-4 mt-2'>
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
                    <div >
                      <Rating unratedColor='amber' ratedColor='amber' readonly></Rating>
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
