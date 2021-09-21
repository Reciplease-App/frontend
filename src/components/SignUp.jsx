import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import schema from '../formSchema/signSchema';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import "../styles/signup.scss";

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
    
    useEffect(() => {
        schema.isValid(formValues)
            .then((valid) => {
                setDisabled(!valid)
            })
    }, [formValues])

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

    const onSubmit = (evt) => {
        evt.preventDefault()
        formSubmit()
    }

    const formSubmit = () => {
        const newUser = {

            username: formValues.username.trim(),
            email: formValues.email.trim(),
            password: formValues.password.trim(),

        }
        postNewUser(newUser)
    }

    const postNewUser = (newUser) => {
        console.log(newUser)
        axios.post('https://reciplease-application.herokuapp.com/users/register', newUser)
            .then((res) => {
                push("/register")
            })
            .catch(err => {
                console.log('POST ERR -->', err)
            })
            .finally(() => {
                setFormValues(initialFormValues)
            })
    }


    return (
        <div className='wrapper'>
            <div className="signup-container">
                <form onSubmit={onSubmit}>

                    <div className="errors">
                        <div>{formErrors.username}</div>
                        <div>{formErrors.email}</div>
                        <div>{formErrors.password}</div>
                    </div>

                    <h3>Sign Up</h3>
                    <div className="input-wrapper">
                    <input
                            name='username'
                            type='text'
                            value={formValues.username}
                            onChange={onChange}
                            placeholder='Name here'
                        />

                        <input
                            name='email'
                            type='email'
                            value={formValues.email}
                            onChange={onChange}
                            placeholder='Email address here'
                        />
                    
                        <input
                            name='password'
                            type='password'
                            value={formValues.password}
                            onChange={onChange}
                            placeholder='Password here'
                        />
                    
                    <button disabled={disabled}>Submit</button>
                    </div>
                        

                </form>
            </div>
        </div>
    )
}

export default SignUp
