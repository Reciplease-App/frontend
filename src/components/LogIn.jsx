import React, { useState, useEffect } from 'react';
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
    const [loginValues, setLoginValues] = useState(formValues);
    const [loginErrors, setLoginErrors] = useState(formErrors);
    const [disabled, setDisabled] = useState(true);



    // useEffect is checking if the form input is valid. If so, then it is enabling the submit button
    useEffect(() => {
        loginSchema.isValid(loginValues)
            .then(valid => setDisabled(!valid))

    }, [loginValues])


    // handler function - tracking errors
    const handleFormErrors = (name, value) => {
    
        Yup.reach(loginSchema,name).validate(value)
            .then(valid => {
                setLoginErrors({...loginErrors, [name]: ''})
            })
            .catch(err => {
                setLoginErrors({...loginErrors, [name]: err.errors[0]})
            })
    }

    // handler functions - tracking the user inputs
    const handleChange = (e) => {
        handleFormErrors(e.target.name, e.target.value)
        setLoginValues({...loginValues, [e.target.name]: e.target.value})
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Congrats! You can search for delicious food!')
        setLoginValues(formValues)
    }
    
    return (
        <StyledSection>
            <StyledContainer>
                <h1>Login</h1>
                <p>Welcome back! Lettuce show you some more recipes to fall in love with!</p>
                <p>{loginErrors.email}</p>
                <p>{loginErrors.password}</p>
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
                    <button disabled={disabled}>Let's get cook'n</button>
                    <p>Sign Up or Learn More</p>
                </form>
            </StyledContainer>
            
        </StyledSection>
    )
}

export default LogIn

// styled components
const StyledSection = styled.section`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 3px solid black;

    form {
        display: flex;
        flex-direction: column;
    }
`
