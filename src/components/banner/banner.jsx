"use client"

import React, { useEffect } from 'react'
import Image from "next/image";
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Scrollbar, Autoplay } from 'swiper/modules';

function Banner() {

    const [bannerDatas, setBannerData] = React.useState([]);
    const [showMessage, setShowMessage] = React.useState(false);

    useEffect(() => {
        const messageTimer = setTimeout(() => setShowMessage(true), 3000);
        return () => clearTimeout(messageTimer);
    })

    useEffect(() => {
        fetch('/api/dataroute')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(data => setBannerData(data.bannerData || []))
        .catch(error => console.error(error))
    }, []);

  return (
    <>
        <section className="main_banner_container">
            <div className="main_banner_row w-full">
                {bannerDatas.length > 0 ? (
                    <Swiper
                        spaceBetween={0}
                        slidesPerView={1}
                        loop={true}
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                        autoplay={{
                            delay:3500,
                            disableOnInteraction: false,
                        }}
                        modules={[Pagination, Scrollbar, Autoplay]}
                    >
                        {bannerDatas.map((itemData, index) => (
                            <SwiperSlide key={index}>
                                <div className="main_banner_col relative flex">
                                    <div className="main_banner_img">
                                        <Image src={itemData.image} width={1350} height={300} alt='Banner Images' {...(index == 0 ? {priority: true} : {loading: 'lazy'})} />
                                    </div>
                                    <div className="main_banner_text absolute text-white top-[20%] md:top-[28%] lg:top-[30%] left-[20px] md:left-[60px] lg:left-[80px] w-[80%] md:w-[50%] lg:w-[40%]">
                                        <h1 className='text-4xl font-bold mb-3'>{itemData.heading}</h1>
                                        <p className='text-lg mb-5'>{itemData.para}</p>
                                        <div className="duration-150 hover:scale-[1.05] inline-block">
                                            <Link className='px-3 py-2 shadow text-sm bg-white text-black rounded-sm' href={itemData.link}>{itemData.button}</Link>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ):(
                    showMessage && (<p className='h-[300px] w-full flex items-center justify-center text-center mt-5'>No banner available</p>)
                )}
            </div>
        </section>
    </>
  )
}

export default Banner