import React, {useState,  useRef, useMemo} from 'react';
import Grid from "@mui/material/Grid";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import './style.scss';
import {useCheckout} from "../../api/checkout/checkout-service";
import {useNavigate} from "react-router-dom";
import { decodeJWT } from "../../utils"


const CheckWrap = ({cartList, total}) => {

    const navigate = useNavigate();
    const checkoutMutation = useCheckout()
    const [value, setValue] = useState({
        card_holder: '',
        card_number: '',
        cvv: '',
        expire_month: '',
        expire_year: '',
    });

    const validatorRef = useRef(new SimpleReactValidator({
        className: 'errorMessage',
        validators: {
            card_format: {
                message: 'The card number must be in the format XXXX XXXX XXXX XXXX and cannot start with "0000".',
                rule: (val) => {
                    const regex = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
                    return regex.test(val) && !val.startsWith('0000');
                }
            }
        }
    }));

    const validator = useMemo(() => validatorRef.current, [validatorRef]);

    const reservationData = cartList[0].reservation;
    let roomsIds = [];
    let metadataObjects = [];

    const createMetadata = () => {
        cartList.map((data) => {
            let metadata = {
                "roomType": data.room_type.name,
                "kids": data.kids,
                "adults": data.adults,
                "totalAdults": data.totalAdults,
                "totalKids": data.totalKids,
                "rooms": data.qty,
                "total": data.total,
                "reservation": data.reservation,
            }
            roomsIds.push(data.id)
            metadataObjects.push(metadata)

        })
    }

    const changeHandler = (e) => {
        let { name, value } = e.target;

        if (name === "card_number") {
            value = value.replace(/\D/g, '');

            if (value.length > 16) {
                value = value.slice(0, 16);
            }

            value = value.replace(/(.{4})/g, '$1 ').trim();
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
        let user_id
        const token = localStorage.getItem('token')
        if(!token){
            navigate('/app/sign-in');
            return;
        }else{
            createMetadata()
            user_id = decodeJWT(token)
        }

        if (validator.allValid()) {
            const payload = {
                user_id: user_id.sub,
                card: {
                    number: value.card_number,
                    exp_month: value.expire_month,
                    exp_year: value.expire_year,
                    cvc: value.cvv,
                },
                reservation: reservationData,
                rooms: roomsIds,
                metadata: metadataObjects,
                total: total
            };
            checkoutMutation.mutate(payload, {
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
                          {validator.message('card_number', value.card_number, 'required|card_format')}
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
