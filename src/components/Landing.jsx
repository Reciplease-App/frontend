import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { checkIfReduxWorks } from '../store';

function Landing({isWorking, checkIfReduxWorks}) {
    const handleClick = e => {
        console.log("it's working")
        checkIfReduxWorks()
    }
    
    return (
        <div>
            Hello From Reciplease Landing!
            <button onClick={handleClick}>Let's get cook'n</button>
            {isWorking && <p>Redux is working!! Boom!</p>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isWorking: state.isWorking
    }
}

export default connect(mapStateToProps, {checkIfReduxWorks})(Landing)
