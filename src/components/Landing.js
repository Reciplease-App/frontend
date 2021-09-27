import React from 'react';
import { ButtonUnstyled } from '@mui/material';
import { useHistory } from 'react-router-dom';

function Landing() {

    const history = useHistory()

    const onSubmit = () => {
        history.push('/login')
    }
    
    return (
        <div className="content">
            <h1 className="landing-title">Reciplease</h1>
            <p className="landing-description">Don't know what to cook next? Browse the best recipes & save time.</p>
            <ButtonUnstyled id="submit-btn" onClick={onSubmit}>Let's get cook'n</ButtonUnstyled>
        </div>
    )
}

export default Landing
