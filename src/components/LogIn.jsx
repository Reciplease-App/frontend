import React, { useState } from 'react';
import styled from 'styled-components';


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

    const inputValue = (e) => {
        setLoginValues({...loginValues, [e.target.name]: e.target.value})
    }
    
    return (
        <StyledContainer>
            <h1>Login</h1>
            <p>Welcome back! Lettuce show you some more recipes to fall in love with!</p>

            <form>
                <input 
                    type='text'
                    name='email'
                    placeholder='Email'
                    value={loginValues.email}
                    onChange={inputValue}
                />
                <input 
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={loginValues.password}
                    onChange={inputValue}
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
