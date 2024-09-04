import React, {Fragment, useMemo} from 'react';
import PageTitle from '../../components/pagetitle/PageTitle';
import { connect } from "react-redux";
import Navbar from '../../components/Navbar';
import { addToCart } from "../../store/actions/action";
import SearchRooms from '../../components/SearchRooms/SearchRooms';
import Scrollbar from '../../components/scrollbar';
import Logo from '../../images/logo.png'
import Footer from '../../components/footer';
import {useSearchAvailableRooms} from "../../api/rooms/room-service";
import {useLocation} from "react-router-dom";
import {queryParamsToObject} from "../../utils";

const SearchResults =({ addToCart }) => {
  const location = useLocation();

  const searchParams =  useMemo(
    () => queryParamsToObject(location.search),
    [location]);

    const {data: availableRooms, error, isLoading} = useSearchAvailableRooms(searchParams);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading rooms</div>;

    const reservation = {
      checkIn: searchParams.checkIn,
      checkOut: searchParams.checkOut,
    }


  const addToCartProduct = (room, qty = 1) => {
        console.log("room")
        room.kids = searchParams.kids
        room.adults = searchParams.adults
        room.reservation = reservation
        addToCart(room, qty);
      };

    return(
        <Fragment>
          <Navbar topbarBlock={'wpo-header-style-2'} Logo={Logo}/>
            <PageTitle pageTitle={'Hotel Booking Search'} pagesub={'Search'}/>
              <section className="wpo-shop-page">
                  <div className="container">
                      <div className="row">
                          <div className="col-lg-12">
                              <SearchRooms
                                      addToCartProduct={addToCartProduct}
                                      rooms={availableRooms}
                              />
                          </div>
                      </div>
                  </div>
              </section>
              <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};

export default connect(null, { addToCart })(SearchResults);