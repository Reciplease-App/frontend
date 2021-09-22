import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import schema from '../formSchema/signSchema';
import axios from 'axios';
import {useHistory, Link} from 'react-router-dom';
import "../styles/signup.scss";
import { Input } from '@material-ui/core';
import { Button } from '@mui/material';

// initial values
const initialFormValues = {
    username: '',
    email: '',
    password: '',
}

const initialDisabled = true;

const initialFormErrors = {
    username: '',
    email: '',
    password: '',
}

function SignUp() {
    const [formValues, setFormValues] = useState(initialFormValues)
    const [disabled, setDisabled] = useState(initialDisabled)
    const [formErrors, setFormErrors] = useState(initialFormErrors)
    
    const {push} = useHistory();
    
    // useEffect(() => {
    //     schema.isValid(formValues)
    //         .then((valid) => {
    //             setDisabled(!valid)
    //         })
    // }, [formValues])

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

    const handleSubmit = (e) => {
        // const newUser = {

        //     username: formValues.username.trim(),
        //     email: formValues.email.trim(),
        //     password: formValues.password.trim(),

        // }
        e.preventDefault()
        postNewUser(formValues)
    }

    const postNewUser = (newUser) => {
        console.log(newUser)
        axios.post('https://reciplease-application.herokuapp.com/users/register', newUser)
            .then((res) => {
                console.log(res)
                push("/cookbook")
            })
            .catch(err => {
                console.log('POST ERR -->', err)
            })
            .finally(() => {
                setFormValues(initialFormValues)
            })
    }


    return (
        <div className="signup-container">
                <form onSubmit={handleSubmit}>
                    <h3>Sign Up</h3>
                    <p>Don’t worry, we aren’t doing anything with your info! Just need you to create an account to save the recipes you love.</p>
                        
                    <Input
                            variant="outlined"
                            name='username'
                            type='text'
                            value={formValues.username}
                            onChange={onChange}
                            placeholder='Username'
                            disableUnderline
                        />

                    <Input
                        name='email'
                        type='email'
                        value={formValues.email}
                        onChange={onChange}
                        placeholder='Email'
                        disableUnderline
                    />
                        
                    <Input
                        name='password'
                        type='password'
                        value={formValues.password}
                        onChange={onChange}
                        placeholder='Password'
                        disableUnderline
                    />
                        
                    <Button variant="contained" type="submit">Submit</Button>

                    <p>
                        <Link to='/signup'>Sign Up</Link> or <Link to='/'>Learn More</Link>
                    </p>
                </form>
            </div>
    )
}

export default SignUp;
