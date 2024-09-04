import React, {useEffect, useState} from 'react'
import { connect } from "react-redux";
import MobileMenu from "../MobileMenu";
import { removeFromCart } from "../../store/actions/action";
import {Link} from 'react-router-dom'
import { totalPrice, totalAdults, totalKids, totalByRoom } from "../../utils";
import shape from "../../images/hotel.png"

const Header = (props) => {
  const [menuActive, setMenuState] = useState(false);
  const [cartActive, setcartState] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  const SubmitHandler = (e) => {
      e.preventDefault()
  }

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  }

  const ClickHandler = () => {
      window.scrollTo(10, 0);
  }

  const { carts } = props;

  console.log("carts", carts)
    return (
      <header id="header" className={props.topbarBlock}>
        <div className={`wpo-site-header ${props.hclass}`}>
          <nav className="navigation navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-lg-3 col-md-3 col-3 d-lg-none dl-block">
                  <div className="mobail-menu">
                    <MobileMenu />
                  </div>
                </div>
                <div className="col-lg-2 col-md-6 col-6">
                  <div className="navbar-header">
                    <Link onClick={ClickHandler} className="navbar-brand logo" to="/home">
                      <img src={props.Logo} alt="" />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-9 col-md-1 col-1">
                  <div id="navbar" className="collapse navbar-collapse navigation-holder">
                    <button className="menu-close"><i className="ti-close"></i></button>
                    <ul className="nav navbar-nav mb-2 mb-lg-0">
                      <li><Link onClick={ClickHandler} to="/app">Home</Link></li>
                      <li><Link onClick={ClickHandler} to="/about">About</Link></li>
                      <li>
                        {isLoggedIn ? (
                          <Link onClick={handleSignOut} to="/app">Sign out</Link>
                        ): (
                          <Link onClick={ClickHandler} to="/app/sign-in">Sign in</Link>
                        )}
                      </li>
                      {!isLoggedIn && (
                        <li className="menu-item-has-children">
                          <Link onClick={ClickHandler} to="/app/sign-up">Sign up</Link>
                        </li>
                      )}

                      <li><Link onClick={ClickHandler} to="/app/reservations">Reservations</Link></li>

                      <li className="menu-item-has-children">
                        <Link onClick={ClickHandler} to="/">Pages</Link>
                        <ul className="sub-menu">
                          <li><Link onClick={ClickHandler} to="/service">Service</Link></li>
                          <li><Link onClick={ClickHandler} to="/service-s2">Service Style2</Link></li>
                          <li><Link onClick={ClickHandler} to="/service-single/1">Service Single</Link></li>
                          <li><Link onClick={ClickHandler} to="/cart">Cart</Link></li>
                          <li><Link onClick={ClickHandler} to="/checkout">Checkout</Link></li>
                          <li><Link onClick={ClickHandler} to="/pricing">Pricing</Link></li>
                          <li><Link onClick={ClickHandler} to="/search-result">Search Result</Link></li>
                          <li><Link onClick={ClickHandler} to="/404">404</Link></li>
                          <li><Link onClick={ClickHandler} to="/login">Login</Link></li>
                          <li><Link onClick={ClickHandler} to="/register">Register</Link></li>
                        </ul>
                      </li>
                      <li><Link onClick={ClickHandler} to="/contact">Contact</Link></li>
                    </ul>

                  </div>
                </div>
                <div className="col-lg-1 col-md-2 col-2">
                  <div className="header-right">

                    <div className="mini-cart">
                      <button className="cart-toggle-btn" onClick={() => setcartState(!cartActive)}>
                        {" "}
                        <i className="fi flaticon-shopping-cart"></i>{" "}
                        <span className="cart-count">{carts.length}</span>
                      </button>
                      <div className={`mini-cart-content ${cartActive ? "mini-cart-content-toggle" : ""}`}>
                        <button className="mini-cart-close" onClick={() => setcartState(!cartActive)}><i className="ti-close"></i></button>
                        <div className="mini-cart-items">
                          {carts &&
                            carts.length > 0 &&
                            carts.map((catItem, crt) => (
                              <div className="mini-cart-item clearfix" key={crt}>
                                <div className='container-dates'>
                                  <span className="dates-in-out">
                                    from {catItem.reservation.checkIn}
                                  </span>
                                  <span className='dates-in-out to'> to </span>
                                  <span className="dates-in-out">
                                    {catItem.reservation.checkOut}
                                  </span>
                                </div>

                                <div className="mini-cart-item-image">
                                  <span>
                                    <img src={catItem.image_rooms[0].image} alt="icon"/>
                                  </span>

                                </div>
                                <div className="mini-cart-item-des">
                                  <p>{catItem.title} </p>
                                  <span className="mini-cart-item-price">
                                    ${catItem.totalAdults = totalAdults(catItem.adults, catItem.adult_price)} x {" "} {catItem.adults} adults
                                  </span>
                                  {catItem.kids > 0 && (
                                    <span className="mini-cart-item-price">
                                    ${catItem.totalKids = totalKids(catItem.kids, catItem.kids_price)} x {catItem.kids} kids
                                  </span>)}
                                  <span className="mini-cart-item-price">
                                    ${catItem.total = totalByRoom(catItem.totalAdults, catItem.totalKids, catItem.qty)} x {" "} {catItem.qty}
                                  </span>

                                  <span className="mini-cart-item-quantity">
                                    <button
                                      onClick={() =>
                                        props.removeFromCart(catItem.id)
                                      }
                                      className="btn btn-sm btn-danger"
                                    >
                                      <i className="ti-close"></i>
                                    </button>
                                    {" "}
                                  </span>
                                </div>
                              </div>
                            ))}
                        </div>
                        <div className="mini-cart-action clearfix">
                          <span className="mini-checkout-price"> Subtotal:<span>${totalPrice(carts)}</span></span>
                          <div className="mini-btn">
                            <Link onClick={ClickHandler} to="/app/checkout" className="view-cart-btn s1">Checkout</Link>
                          </div>
                        </div>
                        <div className="visible-icon">
                          <img src={shape} alt="icon"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
    )
  }

const mapStateToProps = (state) => {
  return {
    carts: state.cartList.cart,
  };
};
export default connect(mapStateToProps, { removeFromCart })(Header);

