import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";



const RoomSidebar = (props) => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setendDate] = useState(new Date());


    const SubmitHandler = (e) => {
        e.preventDefault()
    }

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    const productsArray = api();

    const products = productsArray

    return (
        <div className="col-lg-4 col-12">
            <div className="blog-sidebar room-sidebar">
                <div className="widget check-widget">
                    <h3>Check Availability</h3>
                    <form onSubmit={SubmitHandler}>
                        <div className="input-group date">
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                            <i className="fi flaticon-calendar"></i>
                        </div>

                        <div className="input-group date">
                            <DatePicker selected={endDate} onChange={(date) => setendDate(date)} />
                            <i className="fi flaticon-calendar"></i>
                        </div>

                        <div className="input-group date">
                            <select name="Adults" id="Adults">
                                <option value="">Adults</option>
                                <option value="">2</option>
                                <option value="">5</option>
                                <option value="">1</option>
                            </select>
                        </div>
                        <div className="input-group date">
                            <select name="Children" id="Children">
                                <option value="">Children</option>
                                <option value="">2</option>
                                <option value="">5</option>
                                <option value="">1</option>
                            </select>
                        </div>
                        <div className="input-group date">
                            <Link to="/search-result" onClick={ClickHandler} className="theme-btn" type="submit">Check Availability</Link>
                        </div>
                    </form>
                </div>
                <div className="widget recent-post-widget">
                    <h3>Related Posts</h3>
                    <div className="posts">
                        {blogs.map((blog, Bitem) => (
                            <div className="post" key={Bitem}>
                                <div className="img-holder">
                                    <img src={blog.screens} alt="" />
                                </div>
                                <div className="details">
                                    <h4><Link onClick={ClickHandler} to={`/blog-single/${blog.id}`}>{blog.title}</Link></h4>
                                    <span className="date">{blog.create_at}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="widget wpo-instagram-widget">
                    <div className="widget-title">
                        <h3>Discover Our Rooms</h3>
                    </div>
                    <ul className="d-flex">
                        {products.length > 0 &&
                            products.slice(0, 6).map((product, pitem) => (
                                <li key={pitem}>
                                    <Link onClick={ClickHandler} to={`/room-single/${product.id}`}><img src={product.proImg}
                                    alt="" /></Link>
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="wpo-contact-widget widget">
                    <h2>How We Can <br /> Help You!</h2>
                    <p>labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo
                        viverra maecenas accumsan lacus vel facilisis. </p>
                    <a href="contact.html">Contact Us</a>
                </div>
            </div>
        </div>

    )
}

export default connect(null)(RoomSidebar);