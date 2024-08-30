import React, { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import './style.scss';
import {useSignUp} from "../../api/users/user-service";
import {useCheckout} from "../../api/checkout/checkout-service";

const CheckWrap = ({cartList}) => {
    console.log("$", cartList)
    const checkoutMutation = useCheckout()
    const [value, setValue] = useState({
        card_holder: '',
        card_number: '',
        cvv: '',
        expire_month: '',
        expire_year: '',
    });



    const [validator] = useState(new SimpleReactValidator({
        className: 'errorMessage'
    }));

    const changeHandler = (e) => {
        let { name, value } = e.target;

        if (name === "card_number") {
            value = value.replace(/\D/g, '');

            if (value.length > 16) {
                value = value.slice(0, 16);
            }

            value = value.replace(/(.{4})/g, '$1 ').trim();

            console.log("ASB", value)
        }

        if (name === "expire_month") {
            value = value.replace(/\D/g, '');
            if (value.length > 2) value = value.slice(0, 2);
            if (value > 12) value = '12';
        }

        setValue(prevValue => ({
            ...prevValue,
            [name]: value
        }));
    };


    const submitForm = (e) => {
        e.preventDefault();

        validator.showMessages()

        console.log("Form Values:", value);
        if (validator.allValid()) {

            checkoutMutation.mutate(value, {
                onSuccess: (response) => {
                    setValue({
                        card_holder: '',
                        card_number: '',
                        cvv: '',
                        expire_month: '',
                        expire_year: '',
                    });
                    validator.hideMessages();
                    toast.success('Successfully submitted!');
                },
                onError: (err) => {
                    console.log(err)
                    if (err.response && err.response.data) {
                        const errors = err.response.data.status.message;
                        toast.error(errors);
                    }else{
                        toast.error('Registration failed')
                    }
                }
            })


        } else {
            console.log("Validation Messages:");
            validator.showMessages();
            toast.error('Empty field is not allowed!');
        }
    };

    const currentYear = new Date().getFullYear();
    const years = [{ value: '', label: 'Year' }];
    for (let i = 0; i < 20; i++) {
        years.push({ value: currentYear + i, label: currentYear + i });
    }

    return (
      <Grid className="cardbp mt-20">
          <Grid>
              <form onSubmit={submitForm} method="POST">
                  <Grid container spacing={3}>
                      <Grid item sm={6} xs={12}>
                          <TextField
                            className="inputOutline"
                            fullWidth
                            value={value.card_holder}
                            variant="outlined"
                            label="Card holder Name"
                            name="card_holder"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onBlur={(e) => changeHandler(e)}
                            onChange={(e) => changeHandler(e)}
                          />
                          {validator.message('card_holder', value.card_holder, 'required|alpha_space')}
                      </Grid>
                      <Grid item sm={6} xs={12}>
                          <TextField
                            fullWidth
                            label="Card Number"
                            name="card_number"
                            value={value.card_number}
                            onBlur={(e) => changeHandler(e)}
                            onChange={(e) => changeHandler(e)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            className="formInput radiusNone"
                          />
                          {validator.message('card_number', value.card_number, 'required|regex:/^\\d{4}\\s\\d{4}\\s\\d{4}\\s\\d{4}$/')}
                      </Grid>
                      <Grid item sm={6} xs={12}>
                          <TextField
                            fullWidth
                            label="CVV"
                            name="cvv"
                            value={value.cvv}
                            onBlur={(e) => changeHandler(e)}
                            onChange={(e) => changeHandler(e)}
                            type="text"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            className="formInput radiusNone"
                          />
                          {validator.message('cvv', value.cvv, 'required|numeric|min:3|max:4')}
                      </Grid>
                      <Grid item sm={6} xs={12}>
                          <TextField
                            fullWidth
                            type="number"
                            label="Month"
                            name="expire_month"
                            value={value.expire_month}
                            onBlur={(e) => changeHandler(e)}
                            onChange={(e) => changeHandler(e)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            className="formInput radiusNone"
                            inputProps={{ min: "1", max: "12", step: "1" }}
                          />
                          {validator.message('expire_month', value.expire_month, 'required|numeric|min:1|max:12')}
                      </Grid>
                      <Grid item sm={3} xs={6}>
                          <TextField
                            select
                            fullWidth
                            label="Year"
                            name="expire_year"
                            value={value.expire_year}
                            onBlur={(e) => changeHandler(e)}
                            onChange={(e) => changeHandler(e)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            SelectProps={{
                                native: true,
                            }}
                            className="formInput radiusNone"
                          >
                              {years.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                              ))}
                          </TextField>
                          {validator.message('expire_year', value.expire_year, 'required')}
                      </Grid>
                      <Grid item xs={12}>
                          <Grid className="formFooter mt-20">
                              <Button fullWidth className="cBtn cBtnLarge cBtnTheme mt-20 ml-15" type="submit">Proceed to Checkout</Button>
                          </Grid>
                      </Grid>
                  </Grid>
              </form>
          </Grid>
      </Grid>
    );
};

export default CheckWrap;
