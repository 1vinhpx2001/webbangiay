import React from 'react'
import { Carousel } from "@material-tailwind/react";
export default function CarouselHome() {
  return (
    <Carousel autoplayDelay={5000} autoplay loop className='h-[200px] md:h-[300px] lg:h-[500px] w-10/12 mx-auto my-0'>
      <img
        src={require('../../assets/Carousel01.jpg')}
        alt="image 1"
        className="h-full w-full object-fill"
      />
      <img
        src={require('../../assets/Carousel02.jpg')}
        alt="image 2"
        className="h-full w-full object-fill"
      />
      <img
        src={require('../../assets/Carousel03.jpg')}
        alt="image 3"
        className="h-full w-full object-fill"
      />
    </Carousel>
  )
}
