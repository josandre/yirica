import React, {useState} from 'react';
import Grid from "@mui/material/Grid";
import SimpleReactValidator from "simple-react-validator";
import {toast} from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {Link, useNavigate} from "react-router-dom";

import './style.scss';
import {useSignIn} from "../../api/users/user-service";

const SignIn = (props) => {
    const push = useNavigate()
    const signInMutation = useSignIn()

    const [value, setValue] = useState({
        email: '',
        password: '',
        remember: false,
    });

    const changeHandler = (e) => {
        setValue({...value, [e.target.name]: e.target.value});
        validator.showMessages();
    };

    const rememberHandler = () => {
        setValue({...value, remember: !value.remember});
    };

    const [validator] = React.useState(new SimpleReactValidator({
        className: 'errorMessage'
    }));

    const submitForm = async (e) => {
        e.preventDefault();
        if (validator.allValid()) {

            signInMutation.mutate(value, {
               onSuccess: (response) => {
                   const token = response.headers.getAuthorization()
                   if (token && token.startsWith('Bearer ')) {
                       const jwtToken = token.split(' ')[1];
                       localStorage.setItem('token', jwtToken);
                   }

                   setValue({
                       email: '',
                       password: '',
                       remember: false
                   });
                   validator.hideMessages()
                   toast.success('You successfully Login on Yiri ca!');
                   push('/app');
               },
                onError: (err) => {
                    if (err.response && err.response.data) {
                        const errors = err.response.data;
                        toast.error(errors);
                    }else{
                        toast.error('Log in failed')
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
                <h2>Sign In</h2>
                <p>Sign in to your account</p>
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
                            <TextField
                                className="inputOutline"
                                fullWidth
                                placeholder="Password"
                                value={value.password}
                                variant="outlined"
                                name="password"
                                type="password"
                                label="Password"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onBlur={(e) => changeHandler(e)}
                                onChange={(e) => changeHandler(e)}
                            />
                            {validator.message('password', value.password, 'required')}
                        </Grid>
                        <Grid item xs={12}>
                            <Grid className="formAction">
                                <FormControlLabel
                                    control={<Checkbox checked={value.remember} onChange={rememberHandler}/>}
                                    label="Remember Me"
                                />
                                <Link to="/app/forgot-password">Forgot Password?</Link>
                            </Grid>
                            <Grid className="formFooter">
                                <Button fullWidth className="cBtnTheme" type="submit">Login</Button>
                            </Grid>
                            <p className="noteHelp">
                                <span className="line"></span>
                                Don't have an account? <Link to="/app/sign-up">Create an account</Link>
                                <span className="line"></span></p>
                            <p className="noteHelp">
                                <span className="line"></span>
                                Return to<Link to="/app">Home</Link>
                                <span className="line"></span></p>
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

export default SignIn;
