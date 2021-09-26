import React from 'react';
import '../styles/landing.scss';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';

function Landing() {

    const history = useHistory()

    const onSubmit = () => {
        history.push('/login')
    }
    
    return (
        <div className="content">
            <h1 className="landing-title">Reciplease</h1>
            <p className="landing-description">Don't know what to cook next? Browse the best recipes & save time.</p>
            <Button id="submit-btn" onClick={onSubmit}>Let's get cook'n</Button>
        </div>
    )
}

export default Landing
