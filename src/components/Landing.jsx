import React from 'react';
import { connect } from 'react-redux';
import { checkIfReduxWorks } from '../store';
import '../styles/landing.scss';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router';

function Landing({isWorking, checkIfReduxWorks}) {
    // const [login, setLogin] = useState(false);
    // const [signup, setSignup] = useState(false);

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

const mapStateToProps = (state) => {
    return {
        isWorking: state.isWorking
    }
}

export default connect(mapStateToProps, {checkIfReduxWorks})(Landing)
