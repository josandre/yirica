import React, {useState} from 'react';
import Grid from "@mui/material/Grid";
import SimpleReactValidator from "simple-react-validator";
import {toast} from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";

import './style.scss';
import {useResetPassword} from "../../api/users/user-service";

const ForgotPassword = (props) => {

    const push = useNavigate()

    const [value, setValue] = useState({
        email: '',
    });

    const resetPasswordMutation = useResetPassword()

    const changeHandler = (e) => {
        setValue({...value, [e.target.name]: e.target.value});
        validator.showMessages();
    };

    const [validator] = React.useState(new SimpleReactValidator({
        className: 'errorMessage'
    }));

    const submitForm = (e) => {
        e.preventDefault();
        if (validator.allValid()) {
            resetPasswordMutation.mutate(value, {
                onSuccess: (response) => {
                    setValue({
                        email: '',
                    });
                    validator.hideMessages();
                    toast.success('We sent you an email with your new password!');
                    push('/app/sign-in');
                },
                onError: (error) => {
                    console.log("error", error);
                    if (error.response && error.response.data) {
                        const errors = error.response.data.error;
                        toast.error(errors);
                    }else{
                        toast.error('Connection failed')
                    }
                }
            })
        } else {
            validator.showMessages();
            toast.error('Empty field is not allowed!');
        }
    };
    return (
        <Grid className="loginWrapper">
            <Grid className="loginForm">
                <h2>Forgot Password</h2>
                <p>Reset your account password</p>
                <form onSubmit={submitForm}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                className="inputOutline"
                                fullWidth
                                placeholder="E-mail"
                                value={value.email}
                                variant="outlined"
                                name="email"
                                label="E-mail"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onBlur={(e) => changeHandler(e)}
                                onChange={(e) => changeHandler(e)}
                            />
                            {validator.message('email', value.email, 'required|email')}
                        </Grid>
                        <Grid item xs={12}>
                            <Grid className="formFooter">
                                <Button fullWidth className="cBtn cBtnLarge cBtnTheme" type="submit">Resend
                                    Password</Button>
                            </Grid>

                            <p className="noteHelp"><span
                              className="line"></span>Already have an account? <Link to="/app/sign-in">Return
                                to Sign In</Link><span className="line"></span>
                            </p>
                        </Grid>
                    </Grid>
                </form>
                <div className="shape-img">
                    <i className="fi flaticon-honeycomb"></i>
                </div>
            </Grid>
        </Grid>
    )
};

export default ForgotPassword;