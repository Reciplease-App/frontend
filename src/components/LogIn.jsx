import React, { useState } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import loginSchema from '../formSchema/loginSchema';


function LogIn() {
    // initial form values
    const formValues = {
        email: '',
        password: ''
    }

    const formErrors = {
        email: '',
        password: ''
    }

    // tracking form values with useState
    const [loginValues, setLoginValues] = useState(formValues)
    const [loginErrors, setLoginErrors] = useState(formErrors)

    // handler functions below
    const handleChange = (e) => {
        setLoginValues({...loginValues, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Congrats! You can search for delicious food!')
        setLoginValues(formValues)
    }
    
    return (
        <StyledContainer>
            <h1>Login</h1>
            <p>Welcome back! Lettuce show you some more recipes to fall in love with!</p>

            <form onSubmit={handleSubmit}>
                <input 
                    type='text'
                    name='email'
                    placeholder='Email'
                    value={loginValues.email}
                    onChange={handleChange}
                />
                <input 
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={loginValues.password}
                    onChange={handleChange}
                />
                <button>Let's get cook'n</button>
                <p>Sign Up or Learn More</p>
            </form>
        </StyledContainer>
    )
}

export default LogIn

// styled components
const StyledContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
`
