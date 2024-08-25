import React from 'react'
import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import hero1 from '../../images/slider/slide-1.jpg'
import hero2 from '../../images/slider/slide-2.jpg'
import hero3 from '../../images/slider/slide-3.jpg'


const sliderItems = [
    {
        sImg: hero1
    },
    {
        sImg: hero2
    },
    {
        sImg: hero3
    },
]

const Hero = (props) => {
    return (
        <section className="wpo-hero-slider">
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    <Swiper

                        modules={[Navigation, Pagination, A11y]}
                        spaceBetween={0}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        loop={true}
                        speed={1800}
                        parallax={true}
                        navigation
                    >
                        {sliderItems.map((item, slr) => (
                            <SwiperSlide key={slr}>
                                <div className="swiper-slide" style={{ backgroundImage: `url(${item.sImg})` }}>
                                    <div className="slide-inner slide-bg-image">
                                        <div className="container-fluid">
                                            <div className="slide-content">
                                                <div data-swiper-parallax="300" className="slide-title">
                                                    <h2>In harmony with nature</h2>
                                                </div>
                                                <div className="clearfix"></div>
                                                {/*<div data-swiper-parallax="500" className="slide-btns">*/}
                                                {/*    <Link to="/room" className="theme-btn">Book Now</Link>*/}
                                                {/*</div>*/}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                        ...
                    </Swiper>
                </div>
            </div>
        </section>
    )
}

export default Hero;