import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import schema from '../formSchema/signSchema';
import axios from 'axios';
import {useHistory, Link} from 'react-router-dom';
import "../styles/signup.scss";
import { Input } from '@material-ui/core';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


const initialValues = {
    username: '',
    email: '',
    password: '',
}

function SignUp() {
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState(initialValues)
    const [disabledBtn, setDisabledBtn] = useState(true)
    const [signUpSuccess, setSignUpSuccess] = useState({
        message: "",
        activeClass: ""
    })
    
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


    const handleSubmit = (e) => {
        e.preventDefault();
        setSignUpSuccess({
            ...signUpSuccess,
            message: <CircularProgress />
        })
        
        axios.post('https://reciplease-backend.vercel.app/users/register', formValues)
            .then((res) => {
                setSignUpSuccess({
                    message: "Success!",
                    activeClass:"success-modal"
                })
                localStorage.setItem("token", res.data.token)
                setTimeout(() => {
                    push("/search")
                }, 1500)
            })
            .catch(err => {
                setSignUpSuccess({
                    message: err.message,
                    activeClass: "error-modal"
                })
            })
            .finally(() => {
                setFormValues(initialValues)
            })
    }

    return (
        <div className="signup-container">
                <form onSubmit={handleSubmit}>
                    <h3>Sign Up</h3>
                    <p>Create your account today and start searching and saving your favorite recipes!</p>

                    { signUpSuccess ? <p className={signUpSuccess.activeClass}>{signUpSuccess.message}</p> : null}

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
                            id="signup-input"
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
                        id="signup-input"
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
                        id="signup-input"
                    />
                        
                    <Button variant="contained" type="submit" disabled={disabledBtn}>Submit</Button>

                    <p>
                        Already have an account? <Link to="/login">Login here</Link>
                    </p>
                </form>
            </div>
    )
}

export default SignUp;
