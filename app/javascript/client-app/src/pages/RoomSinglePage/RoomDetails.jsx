import React from 'react'
import { Link } from 'react-router-dom'
import simg1 from '../../images/room/img-7.jpg'
import simg2 from '../../images/room/img-8.jpg'
import rv1 from '../../images/room/r1.jpg'
import rv2 from '../../images/room/r2.jpg'


const RoomDetails = ({ room, room_type, image_rooms, amenities, services })  => {
    console.log("amenities", amenities)
    console.log("services", services)

    const SubmitHandler = (e) => {
        e.preventDefault()
    }

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <div className="Room-details-area pb-120">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-12">
                        <div className="room-description">
                            <div className="room-title">
                                <h2>Description</h2>
                            </div>
                            <p className="p-wrap">{room_type.description}</p>
                        </div>
                        <div className="room-details-service">
                            <div className="row">
                                <div className="room-details-item">
                                    <div className="row">
                                        <div className="col-md-5 col-sm-5">
                                            <div className="room-d-text">
                                                <div className="room-title">
                                                    <h2>Amenities</h2>
                                                </div>
                                                <ul>
                                                    {amenities.map((amenity, index) => (
                                                      <li key={index}>
                                                          <Link onClick={ClickHandler} to="#">
                                                              {amenity.name}
                                                          </Link>
                                                      </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-7 col-sm-7">
                                            <div className="room-d-img">
                                                <img src={image_rooms[0].image} alt=""/>
                                            </div>
                                        </div>
                                        <div className="col-md-7 col-sm-7">
                                            <div className="room-d-img">
                                                <img src={image_rooms[0].image} alt=""/>
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-sm-5">
                                            <div className="room-d-text2">
                                                <div className="room-title">
                                                    <h2>Room Services</h2>
                                                </div>
                                                <ul>
                                                    {services.map((service, index) => (
                                                      <li key={index}>
                                                          <Link onClick={ClickHandler} to="#">
                                                              {service.name}
                                                          </Link>
                                                      </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pricing-area">


                        </div>
                        <div className="room-review">
                            <div className="room-title">
                                <h2>Room Reviews</h2>
                            </div>
                            <div className="review-item">
                                <div className="review-img">
                                    <img src={rv1} alt=""/>
                                </div>
                                <div className="review-text">
                                    <div className="r-title">
                                        <h2>Marry Watson</h2>
                                        <ul>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                        </ul>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices
                                        gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. </p>
                                </div>
                            </div>
                            <div className="review-item">
                                <div className="review-img">
                                    <img src={rv2} alt=""/>
                                </div>
                                <div className="review-text">
                                    <div className="r-title">
                                        <h2>Lily Havenly</h2>
                                        <ul>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                        </ul>
                                    </div>
                                    <p> Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
                                        lacus vel facilisis. </p>
                                </div>
                            </div>
                        </div>
                        <div className="add-review">
                            <div className="room-title">
                                <h2>Add Review</h2>
                            </div>
                            <div className="wpo-blog-single-section review-form ">
                                <div className="give-rat-sec">
                                    <p>Your rating *</p>
                                    <div className="give-rating">
                                        <label>
                                            <input type="radio" name="stars" value="1" />
                                            <span className="icon">★</span>
                                        </label>
                                        <label>
                                            <input type="radio" name="stars" value="2" />
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                        </label>
                                        <label>
                                            <input type="radio" name="stars" value="3" />
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                        </label>
                                        <label>
                                            <input type="radio" name="stars" value="4" />
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                        </label>
                                        <label>
                                            <input type="radio" name="stars" value="5" />
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="review-add">
                                    <div className="comment-respond">
                                        <form id="commentform" className="comment-form" onSubmit={SubmitHandler}>
                                            <div className="form-inputs">
                                                <input placeholder="Your Name*" type="text" />
                                                <input placeholder="Your Email*" type="email" />
                                            </div>
                                            <div className="form-textarea">
                                                <textarea id="comment" placeholder="Your Review"></textarea>
                                            </div>
                                            <div className="form-check">

                                            </div>
                                            <div className="form-submit">
                                                <input id="submit" value="Submit Now" type="submit" />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomDetails;