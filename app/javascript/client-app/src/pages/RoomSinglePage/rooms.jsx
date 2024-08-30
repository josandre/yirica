import React from "react";
import { connect } from "react-redux";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'


const Rooms = (room) => {

    var settings = {
        dots: false,
        arrows: true,
        speed: 1200,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        centerMode:true,
        autoplaySpeed: 3500,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="wpo-room-area-s3 section-padding pt-0">
            <div className="container-fluid">
                <div className="room-wrap room-active">
                    <Slider {...settings}>
                        {products.length > 0 &&
                            products.slice(0, 6).map((product, pitem) => (
                                <div className="room-item" key={pitem}>
                                    <div className="room-img">
                                        <Zoom>
                                            <img src={product.proImg} alt="products" />
                                        </Zoom>
                                    </div>
                                </div>
                            ))}
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default connect(null)(Rooms);
