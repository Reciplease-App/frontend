import React from 'react';
import '../styles/landing.scss';
import CircularProgress from '@mui/material/CircularProgress';

function LoadingScreen() {
    
    return (
        <div className="content">
            <h1 className="landing-title">Reciplease</h1>
            <p className="landing-description">Don't know what to cook next? Browse the best recipes & save time.</p>
            <CircularProgress color="success"/>
        </div>
    )
}

export default LoadingScreen