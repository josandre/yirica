import React, {Fragment} from "react";
import { Link } from "react-router-dom";
import SectionTitleS2 from "../../components/SectionTitleS2";
import Navbar from "../../components/Navbar";
import Logo from "../../images/logo.png";
import PageTitle from "../../components/pagetitle/PageTitle";
import SearchRooms from "../../components/SearchRooms/SearchRooms";
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
import SearchSection from "../../components/SearchSection";
import SearchBar from "../../components/SearchBar/SearchBar";


const Reservations = () => {

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };


  return(
    <Fragment>
      <Navbar topbarBlock={'wpo-header-style-2'} Logo={Logo}/>
      <PageTitle pageTitle={'Reservations'} pagesub={'Reservations'}/>
      <section className="wpo-shop-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <SearchBar></SearchBar>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
      <Scrollbar/>
    </Fragment>
  )
};

export default Reservations;
