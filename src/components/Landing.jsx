import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { checkIfReduxWorks } from '../store';
import '../styles/landing.scss';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

function Landing({isWorking, checkIfReduxWorks}) {
    const [login, setLogin] = useState(false);
    const [signup, setSignup] = useState(false);

    const openLoginForm = () => {
        setLogin(true);
        setSignup(false);
    }
    const openSignupForm = () => {
        setSignup(true);
        setLogin(false);
    }
    
    return (
        <div className="screen">
            <h1 className="landing-title">Welcome to Reciplease!</h1>
            <div className="content">
                <div className="buttons">
                    <h1 className="buttons-card-header">Please login or sign up to continue</h1>
                    <div className="buttons-card-buttons">
                        <Button onClick={openLoginForm} id={login ? 'login-button-active' : 'login-button'}>Login</Button>
                        <Button onClick={openSignupForm} id={signup ? 'signup-button-active' : 'signup-button'}>Sign up</Button>
                    </div>
                    <div className={login ? 'login-form' : 'closed-login'}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                            <FormControl
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
                            <FormControl
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <Button id="submit-button">Submit</Button>
                    </div>
                    <div className={signup ? 'signup-form' : 'closed-signup'}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Username</InputGroup.Text>
                            <FormControl
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                            <FormControl
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
                            <FormControl
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <Button id="submit-button">Submit</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isWorking: state.isWorking
    }
}

export default connect(mapStateToProps, {checkIfReduxWorks})(Landing)
