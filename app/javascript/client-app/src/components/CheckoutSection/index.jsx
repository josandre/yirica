import React, {Fragment} from 'react';
import Grid from "@mui/material/Grid";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Link} from 'react-router-dom'
import {totalPrice} from "../../utils";
import visa from '../../images/icon/visa.png';
import mastercard from '../../images/icon/mastercard.png';

import CheckWrap from '../CheckWrap'

import './style.scss';

const cardType = [
    {
        title: 'visa',
        img: visa
    },
    {
        title: 'mastercard',
        img: mastercard
    }
];


const CheckoutSection = ({cartList}) => {
    const [tabs, setExpanded] = React.useState({
        payment: true
    });
    const [forms, setForms] = React.useState({
        payment_method: 'cash',
        card_type: '',

        card_holder: '',
        card_number: '',
        cvv: '',
        expire_date: '',
    });


    const changeHandler = e => {
        setForms({...forms, [e.target.name]: e.target.value})
    };


    return (
        <Fragment>
            <Grid className="checkoutWrapper section-padding">
                <Grid className="container" container spacing={3}>
                    <Grid item md={6} xs={12}>
                        <div className="check-form-area">
                            <Grid className="cuponWrap checkoutCard">
                                <Button className="collapseBtn" fullWidth>
                                    Payment Method
                                </Button>
                                <Grid className="chCardBody">
                                    <Collapse in={tabs.payment} timeout="auto">

                                        <Collapse in={forms.payment_method === 'cash'} timeout="auto">
                                            <Grid className="cardType">
                                                {cardType.map((item, i) => (

                                                    <Grid
                                                        key={i}
                                                        className={`cardItem ${forms.card_type === item.title ? 'active' : null}`}
                                                        onClick={() => setForms({...forms, card_type: item.title})}>
                                                        <img src={item.img} alt={item.title}/>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                            <Grid>
                                                <CheckWrap/>
                                            </Grid>
                                        </Collapse>
                                        <Collapse in={forms.payment_method === 'card'} timeout="auto">
                                            <Grid className="cardType">
                                                <Link to='/order_received' className="cBtn cBtnLarge cBtnTheme mt-20 ml-15" type="submit">Proceed to Checkout</Link>
                                            </Grid>
                                        </Collapse>
                                    </Collapse>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Grid className="cartStatus">
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Grid className="cartTotals">
                                        <h4>Cart Total</h4>
                                        <Table>
                                            <TableBody>
                                                {cartList.map(item => (
                                                    <TableRow key={item.id}>
                                                        <TableCell>{item.title} ${item.price} x {item.qty}</TableCell>
                                                        <TableCell
                                                            align="right">${item.qty * item.price}</TableCell>
                                                    </TableRow>
                                                ))}
                                                <TableRow className="totalProduct">
                                                    <TableCell>Total Room</TableCell>
                                                    <TableCell align="right">{cartList.length}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Sub Price</TableCell>
                                                    <TableCell align="right">${totalPrice(cartList)}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Total Price</TableCell>
                                                    <TableCell
                                                        align="right">${totalPrice(cartList)}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    )
};


export default CheckoutSection;