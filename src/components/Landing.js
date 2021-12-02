import React, { useState } from 'react';
import { ButtonUnstyled, CircularProgress } from '@mui/material';
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
                console.log(res.data)
                setResults(res.data);
            })
            .finally(() => {
                setLoading(false);
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
            <form className="search_form" onSubmit={searchSubmit}>
                <input 
                    value={searchValue}
                    onChange={onChange}
                    name="search"
                    type="text"
                    placeholder="Search for recipes"
                />
                <button type="submit" >Search</button>
            </form>
            <div 
                className={`card_container ${ results.length >= 1 ? "" : "not_active" } `}
            >
                { 
                    loading ?
                    <div className="loading_container"> 
                        <CircularProgress color="success" /> 
                    </div>
                    :
                    results.map((result) => {
                        let recipeDescription = result.summary.replaceAll('<b>', '').replaceAll('</b>', '').replaceAll('<a href="', '').replaceAll('>', '').replaceAll('</a', '').replaceAll('"', ' ');
                        let descArray = recipeDescription.split(".");
                        return (
                            <div 
                                className="card"
                                key={result.id} 
                            >
                                <img src={result.image} alt={result.title} />
                                <div className="card_content"> 
                                    <h1>{result.title}</h1>
                                    <p>{`${descArray[0]}.`}</p>
                                    <p>Estimated prep & cook time: {result.readyInMinutes} minutes</p>
                                </div>
                            </div> 
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Landing
