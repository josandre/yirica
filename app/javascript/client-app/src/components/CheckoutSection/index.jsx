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
import {useCheckout} from "../../api/checkout/checkout-service";

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


    let totalRooms = 0;
    for (let i = 0; i < cartList.length; i++) {
        totalRooms += cartList[i].qty;
    }

    const total = totalPrice(cartList)
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
                                    <Grid className="cardType">
                                        {cardType.map((item, i) => (
                                            <Grid key={i} className={`cardItem`}>
                                                <img src={item.img} alt={item.title}/>
                                            </Grid>
                                        ))}
                                    </Grid>
                                    <Grid>
                                        <CheckWrap cartList={cartList} total={total}/>
                                    </Grid>
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
                                                        <TableCell>{item.adult_price} x {item.adults}  ${item.totalAdults} Adults</TableCell>
                                                        {item.kids > 0 ? (
                                                          <TableCell>
                                                              {item.kids_price} x {item.kids}  ${item.totalKids} Kids
                                                          </TableCell>
                                                        ) : (
                                                          <TableCell>
                                                              No Kids
                                                          </TableCell>
                                                        )}
                                                        <TableCell>{item.room_type.name}  x {item.qty} {item.qty > 1 ? 'Rooms' : 'Room'}</TableCell>
                                                        <TableCell>${item.total} Total</TableCell>

                                                    </TableRow>
                                                ))}
                                                <TableRow className="totalProduct">
                                                    <TableCell>Total Room</TableCell>
                                                    <TableCell align="right">{totalRooms}</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell>Is refundable</TableCell>
                                                    <TableCell
                                                      align="right">Yes</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell>Total Price</TableCell>
                                                    <TableCell
                                                      align="right">${total}</TableCell>
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