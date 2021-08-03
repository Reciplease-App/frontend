import React, { useState } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';

import loginSchema from '../formSchema/loginSchema';

const formValues = {
    email: '',
    password: ''
}

const formErrors = {
    email: '',
    password: ''
}

function LogIn() {

    const [loginValues, setLoginValues] = useState(formValues);
    const [loginErrors, setLoginErrors] = useState(formErrors);

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
        setLoginValues({...loginValues, [e.target.name]: e.target.value})
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        handleFormErrors(e.target.name, e.target.value)
        console.log('Congrats! You can search for delicious food!')
        setLoginValues(formValues)
    }
    
    return (
        <StyledSection>
            <StyledContainer>
                <h1>Login</h1>
                <p>Welcome back! Lettuce show you some more recipes to fall in love with!</p>
                {formErrors.email && <p>{formErrors.email}</p>}
                {formErrors.password && <p>{formErrors.password}</p>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        type='text'
                        name='email'
                        placeholder='Email'
                        value={loginValues.email}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={loginValues.password}
                        onChange={handleChange}
                    />
                    <Button variant="contained">Let's get cook'n</Button>
                    <p className='options'>
                        <Link to='/signup'>Sign Up</Link> or <Link to='/'>Learn More</Link>
                    </p>
                </form>
            </StyledContainer>
            
        </StyledSection>
    )
}

export default LogIn

// styled components
const StyledSection = styled.section`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url(/images/login-mobile-background.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
    background: rgba(235, 244, 255, 0.95);

    h1 {
        font-size: 5rem;
        margin-top: 5%;
        margin-bottom: 4%;
        font-weight: bold;
    }

    p {
        font-size: 1.8rem;
        line-height: 1.2;
        width: 80%;
        text-align: center;
        margin-bottom: 5%;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;

        .MuiFormControl-root {
            margin-bottom: 5%;
            width: 90%;
            background: #ffffff;
            box-shadow: 0px 7px 29px rgba(0, 0, 0, 0.25);
            
            input {
                font-size: 2rem;
            }
        }

        button {
            background: #FCDE7B;
            font-size: 2.2rem;
            width: 90%;
            margin-top: 2%;
            margin-bottom: 4%;
            box-shadow: 0px 7px 29px rgba(0, 0, 0, 0.25);
            text-transform: none;
        }
    }

    .options, a {
        font-size: 1.8rem;
        color: #F17012;
    }
`
