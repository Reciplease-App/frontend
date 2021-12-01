import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import loginSchema from '../formSchema/loginSchema';
import axios from 'axios';
import Input from '@mui/material/Input';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const formObj = {
    email: '',
    password: ''
}

function LogIn() {
    const [loginValues, setLoginValues] = useState(formObj);
    const [loginErrors, setLoginErrors] = useState(formObj);
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [signUpSuccess, setSignUpSuccess] = useState({
        message: "",
        activeClass: ""
    })

    const history = useHistory();

    useEffect(() => {
        loginSchema.isValid(loginValues)
        .then((valid) => {
            setDisabledBtn(!valid)
        })
    }, [loginValues])

    const handleFormErrors = (name, value) => {
        Yup.reach(loginSchema,name).validate(value)
            .then(valid => {
                setLoginErrors({...loginErrors, [name]: ''})
            })
            .catch(err => {
                setLoginErrors({...loginErrors, [name]: err.errors[0]})
            })
    }

    const handleChange = (e) => {
        handleFormErrors(e.target.name, e.target.value)
        setLoginValues({...loginValues, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSignUpSuccess({
            ...signUpSuccess,
            message: <CircularProgress />
        })

        axios.post('https://reciplease-backend.vercel.app/users/login', loginValues)
            .then(res => {
                setSignUpSuccess({
                    message: "Login Success",
                    activeClass: "success-modal"
                })
                window.localStorage.setItem("token", res.data.token)
                setTimeout(() => {
                    history.push('/search');
                }, 1500)
            })
            .catch(err => {
                console.log(err)
                setSignUpSuccess({
                    message: err.message,
                    activeClass: "error-modal"
                })
            })
            .finally(() => {
                setLoginValues(formObj)
            })
    }
    
    return (
        <div className="login-screen">
            <div className="login-wrapper">
                <h1>Login</h1>
                <p>Welcome back! Lettuce show you some more<br/> recipes to fall in love with!</p>

                {signUpSuccess && <p className={signUpSuccess.activeClass}>{signUpSuccess.message}</p>}
                
                <form onSubmit={handleSubmit}>
                    { loginErrors.email && <p className="errors">{loginErrors.email}</p>}
                    <Input
                        disableUnderline={true}
                        id="login-input"
                        type='text'
                        name='email'
                        placeholder='Email'
                        onChange={handleChange}
                    />

                    { loginErrors.password && <p className="errors">{loginErrors.password}</p>}
                    <Input
                        disableUnderline={true}
                        id="login-input"
                        type='password'
                        name='password'
                        placeholder='Password'
                        onChange={handleChange}
                    />
                    <Button type='submit' variant="contained" disabled={disabledBtn}>Let's get cook'n</Button>
                    <p className='options'>
                        <Link to='/signup'>Sign Up</Link> or <Link to='/'>Learn More</Link>
                    </p>
                </form>
            </div>
            
        </div>
    )
}

export default LogIn
