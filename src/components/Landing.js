import React, { useState } from 'react';
import { ButtonUnstyled } from '@mui/material';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Landing() {
    const [ searchValue, setSearchValue ] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const history = useHistory();

    const onChange = (evt) => {
        setSearchValue(evt.target.value);
    }

    const searchSubmit = (evt) => {
        evt.preventDefault();
        setLoading(true);
        axios.post('https://reciplease-backend.vercel.app/recipe', {recipe: searchValue})
            .then(res => {
                setResults(res.data);
            })
            .finally(() => {
                setLoading(false);
                console.log(results);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const onSubmit = () => {
        history.push('/login');
    }
    
    return (
        <div className="content">
            <h1 className="landing-title">Reciplease</h1>
            <p className="landing-description">Don't know what to cook next?</p>
            <ButtonUnstyled id="submit-btn" onClick={onSubmit}>Let's get cook'n</ButtonUnstyled>
            <form onSubmit={searchSubmit}>
                <input 
                    value={searchValue}
                    onChange={onChange}
                    name="search"
                    type="text"
                    placeholder="Search for recipes"
                />
                <button type="submit" >Search</button>
            </form>
            <div>
                { results.map((result) => ( 
                    <div id={result.id}>
                        <h1></h1>
                    </div> 
                ))}
            </div>
        </div>
    )
}

export default Landing
