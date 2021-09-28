import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import schema from '../formSchema/signSchema';
import axios from 'axios';
import {useHistory, Link} from 'react-router-dom';
import "../styles/signup.scss";
import { Input } from '@material-ui/core';
import { Button } from '@mui/material';

const initialValues = {
    username: '',
    email: '',
    password: '',
}

function SignUp() {
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState(initialValues)
    const [disabledBtn, setDisabledBtn] = useState(true)
    const [message, setMessage] = useState("")
    
    const { push } = useHistory();

    const onChange = (evt) => {
        const { name, value, } = evt.target;
        inputChange(name, value);
    }

    const inputChange = (name, value) => {
        yup
            .reach(schema, name)
            .validate(value)
            .then(() => {
                setFormErrors({
                    ...formErrors,
                    [name]: '',
                })
            })
            .catch(err => {
                setFormErrors({
                    ...formErrors,
                    [name]: err.errors[0],
                })
            })

        setFormValues({
            ...formValues,
            [name]: value,
        })
    }

    useEffect(() => {
        schema.isValid(formValues)
            .then(valid => {
                setDisabledBtn(!valid)
            })
    }, [formValues])

<<<<<<< HEAD:src/components/SignUp.jsx
    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("Loading...")
        
        axios.post('https://reciplease-application.herokuapp.com/users/register', formValues)
=======
    const postNewUser = (newUser) => {
        console.log(newUser)
        axios.post('https://reciplease-backend.vercel.app/users/register', newUser)
>>>>>>> 3b4029153247ae1df60c52fc1bf69367b7992ca0:src/components/SignUp.js
            .then((res) => {
                setMessage("Sign Up Successful!")
                localStorage.setItem("token", res.data.token)
                setTimeout(() => {
                    push("/cookbook")
                }, 2000)
            })
            .catch(err => {
                setMessage(err.message)
            })
            .finally(() => {
                setFormValues(initialValues)
            })
    }

    return (
        <div className="signup-container">
                <form onSubmit={handleSubmit}>
                    <h3>Sign Up</h3>
                    <p>Don’t worry, we aren’t doing anything with your info! Just need you to create an account to save the recipes you love.</p>
                        
                    { formErrors.username && 
                        <p className="errors">{formErrors.username}</p> }
                    <Input
                            variant="outlined"
                            name='username'
                            type='text'
                            value={formValues.username}
                            onChange={onChange}
                            placeholder='Username'
                            disableUnderline
                        />

                    { formErrors.email && 
                        <p className="errors">{formErrors.email}</p> }
                    <Input
                        name='email'
                        type='email'
                        value={formValues.email}
                        onChange={onChange}
                        placeholder='Email'
                        disableUnderline
                    />

                    { formErrors.password && 
                        <p className="errors">{formErrors.password}</p> }
                    <Input
                        name='password'
                        type='password'
                        value={formValues.password}
                        onChange={onChange}
                        placeholder='Password'
                        disableUnderline
                    />
                        
                    <Button variant="contained" type="submit" disabled={disabledBtn}>Submit</Button>

                    <p>
                        Already have an account? <Link to="/login">Login here</Link>
                    </p>
                    { message ? <p>{message}</p> : null}
                </form>
            </div>
    )
}

export default SignUp;
