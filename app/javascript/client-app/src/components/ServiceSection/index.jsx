import React from 'react'
import Services from '../../api/service'
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const ServiceSection = (props) => {
    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    var settings = {
        dots: false,
        arrows: true,
        speed: 1200,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
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

        <div className={`wpo-service-area-s2 ${props.svClass}`}>
            <div className="wpo-service-wrap">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-xl-12 col-12">
                            <div className="wpo-service-items wpo-service-active">
                                <Slider {...settings}>
                                    {Services.slice(0,7).map((service, sitem) => (
                                        <div className="wpo-service-item" key={sitem}>
                                            <div className="wpo-service-img">
                                                <img src={service.img} alt="" />
                                            </div>
                                            <div className="wpo-service-text">
                                                <i className={`fi ${service.fIcon}`}></i>
                                                <h2>{service.title}</h2>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceSection;