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
    const [message, setMessage] = useState("")
    const [activeClass, setActiveClass] = useState(null)
    
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
        setMessage(<CircularProgress />)
        
        axios.post('https://reciplease-backend.vercel.app/users/register', formValues)
            .then((res) => {
                setActiveClass("success-modal")
                setMessage("Succes!")
                localStorage.setItem("token", res.data.token)
                setTimeout(() => {
                    push("/search")
                }, 2000)
            })
            .catch(err => {
                setActiveClass("error-modal")
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

                    { message ? <p className={activeClass}>{message}</p> : null}

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
                </form>
            </div>
    )
}

export default SignUp;
