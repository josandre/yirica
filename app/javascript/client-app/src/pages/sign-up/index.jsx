import React, {useState} from 'react';
import Grid from "@mui/material/Grid";
import SimpleReactValidator from "simple-react-validator";
import {toast} from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";
import './style.scss';
import {useSignUp} from "../../api/users/user-service";

const SignUp = (props) => {
    console.log("hello")
    const push = useNavigate()

    const signUpMutation = useSignUp()

    const [value, setValue] = useState({
        name: '',
        last_name: '',
        phone: '',
        password: '',
        confirm_password: '',
        email: '',
    });

    const changeHandler = (e) => {
        setValue({...value, [e.target.name]: e.target.value});
        validator.showMessages();
    };

    const handlePhoneChange = (e) => {
        const { name, value } = e.target;
        const onlyNums = value.replace(/[^0-9]/g, '');
        setValue(prevState => ({ ...prevState, [name]: onlyNums }));
        validator.showMessages();
    };

    const [validator] = React.useState(new SimpleReactValidator({
        className: 'errorMessage'
    }));


    const submitForm = (e) => {
        e.preventDefault();

        if(validator.allValid()){
            signUpMutation.mutate(value, {
                onSuccess: (res) => {

                    setValue({
                        name: '',
                        last_name: '',
                        phone: '',
                        password: '',
                        confirm_password: '',
                        email: ''
                    });
                    validator.hideMessages();
                    toast.success('Registration successfully');
                    push('/app/sign-in');
                },
                onError: (err) => {
                    if (err.response && err.response.data) {
                        const errors = err.response.data.status.message;
                        toast.error(errors);
                    }else{
                        toast.error('Registration failed')
                    }

                }
            })
        }else{
            validator.showMessages()
            toast.error('Empty field is not allowed')
        }
    };

    return (
        <Grid className="loginWrapper">

            <Grid className="loginForm">
                <h2>Signup</h2>
                <p>Signup your account</p>
                <form onSubmit={submitForm} method="POST">
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                className="inputOutline"
                                fullWidth
                                placeholder="Name"
                                value={value.name}
                                variant="outlined"
                                name="name"
                                label="Name"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onBlur={(e) => changeHandler(e)}
                                onChange={(e) => changeHandler(e)}
                            />
                            {validator.message('name', value.name, 'required|alpha_space')}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                              className="inputOutline"
                              fullWidth
                              placeholder="Last name"
                              value={value.last_name}
                              variant="outlined"
                              name="last_name"
                              label="Last name"
                              InputLabelProps={{
                                  shrink: true,
                              }}
                              onBlur={(e) => changeHandler(e)}
                              onChange={(e) => changeHandler(e)}
                            />
                            {validator.message('last_name', value.last_name, 'required|alpha_space')}
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                              className="inputOutline"
                              fullWidth
                              placeholder="Phone"
                              value={value.phone}
                              variant="outlined"
                              name="phone"
                              label="Phone"
                              InputLabelProps={{
                                  shrink: true,
                              }}
                              type={'tel'}
                              onBlur={(e) => changeHandler(e)}
                              onChange={(e) => handlePhoneChange(e)}
                            />
                            {validator.message('phone', value.phone, 'required|numeric')}
                        </Grid>

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
                                label="Password"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                type={"password"}
                                onBlur={(e) =>  changeHandler(e)}
                                onChange={(e) => changeHandler(e)}
                            />
                            {validator.message('password', value.password, 'required|min:6',
                              {
                                  messages: {
                                      required: 'Password is required.',
                                      min: 'Password must be at least 6 characters long.',
                                      default: 'Password should include numbers, letters, and special characters for stronger security, but it’s not mandatory.'
                                  }
                              }
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            {/*<TextField*/}
                            {/*    className="inputOutline"*/}
                            {/*    fullWidth*/}
                            {/*    placeholder="Confirm Password"*/}
                            {/*    value={value.confirm_password}*/}
                            {/*    variant="outlined"*/}
                            {/*    name="confirm_password"*/}
                            {/*    label="Confirm Password"*/}
                            {/*    InputLabelProps={{*/}
                            {/*        shrink: true,*/}
                            {/*    }}*/}
                            {/*    type="password"*/}
                            {/*    onBlur={(e) => {*/}
                            {/*        changeHandler(e)}*/}
                            {/*    }*/}
                            {/*    onChange={(e) => changeHandler(e)}*/}
                            {/*/>*/}

                            <TextField
                              className="inputOutline"
                              fullWidth
                              placeholder="Password"
                              value={value.password}
                              variant="outlined"
                              name="password"
                              label="Password"
                              InputLabelProps={{
                                  shrink: true,
                              }}
                              type={"password"}
                              onBlur={(e) =>  changeHandler(e)}
                              onChange={(e) => changeHandler(e)}
                            />
                            {validator.message('confirm_password', value.confirm_password, `in:${value.password}`)}
                        </Grid>
                        <Grid item xs={12}>
                            <Grid className="formFooter">
                                <Button fullWidth className="cBtn cBtnLarge cBtnTheme" type="submit">Sign Up</Button>
                            </Grid>
                            <p className="noteHelp"><span className="line"></span>
                                Already have an account? <Link
                                  to="/app/sign-in">Return to Sign In</Link>
                                <span className="line"></span>
                            </p>
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

export default SignUp;