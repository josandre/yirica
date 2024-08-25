import React, {Fragment} from 'react';
import Footer from '../../components/footer';
import FunFact from '../../components/FunFact';
import Navbar from '../../components/Navbar'
import Rooms from '../../components/Rooms/Rooms';
import Scrollbar from '../../components/scrollbar'
import SearchSection from '../../components/SearchSection';
import Logo from '../../images/logo.png'
import Hero from "../../components/hero";
import ServiceSection from "../../components/ServiceSection";

const HomePage =() => {

    return(
        <Fragment>
            <Navbar topbarBlock={'wpo-header-style-2'} Logo={Logo}/>
            <Hero/>
            <SearchSection/>
            <Rooms/>
            <FunFact fClass={'wpo-fun-fact-section-s2 section-padding'}/>
            <ServiceSection/>
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};

export default HomePage;
