'use client'
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import './Banner.css';

import Image from 'next/image'
import bannerone from '@/public/banner/1.jpg'
import bannertwo from '@/public/banner/2.jpg'
import bannerthree from '@/public/banner/3.jpg'


const Banner = () => {
  return (
    <div className='banner-slider'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><Image src={bannerone} width={100} alt='logo'/></SwiperSlide>
        <SwiperSlide><Image src={bannertwo} width={100} alt='logo'/></SwiperSlide>
        <SwiperSlide><Image src={bannerthree} width={100} alt='logo'/></SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Banner