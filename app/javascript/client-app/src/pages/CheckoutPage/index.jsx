import React, {Fragment} from 'react';
import PageTitle from '../../components/pagetitle/PageTitle';
import Navbar from '../../components/Navbar';
import CheckoutSection from '../../components/CheckoutSection'
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'
import {connect} from "react-redux";
import Logo from '../../images/logo2.png'

const CheckoutPage =({cartList}) => {
    return(
        <Fragment>
            <Navbar hclass={'wpo-header-style-3'} Logo={Logo} />
            <PageTitle pageTitle={'Checkout'} pagesub={'Checkout'}/> 
            <CheckoutSection cartList={cartList}/>
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};
const mapStateToProps = state => {
    return {
        cartList: state.cartList.cart,
        symbol: state.data.symbol
    }
};

export default connect(mapStateToProps)(CheckoutPage);
