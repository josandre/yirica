import React, {Fragment} from "react";
import Navbar from "../../components/Navbar";
import Logo from "../../images/logo.png";
import PageTitle from "../../components/pagetitle/PageTitle";
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
import SearchBarRooms from "../../components/SearchBarRooms/SearchBarRooms";


const AllRooms = () => {

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };


  return(
    <Fragment>
      <Navbar topbarBlock={'wpo-header-style-2'} Logo={Logo}/>
      <PageTitle pageTitle={'Rooms'} pagesub={'Rooms'}/>
      <section className="wpo-shop-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <SearchBarRooms></SearchBarRooms>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
      <Scrollbar/>
    </Fragment>
  )
};

export default AllRooms;
