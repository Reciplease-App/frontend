import React, { useState } from 'react';
import { ButtonUnstyled } from '@mui/material';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

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
            <CardContainer>
                { results.map((result) => ( 
                    <Card id={result.id} >
                        <h1>{result.title}</h1>
                    </Card> 
                ))}
            </CardContainer>
        </div>
    )
}

const CardContainer = styled.div`
    margin-top: 5vh;
    width: 80%;
    height: 25vh;
    border: 1px solid black;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
`;

const Card = styled.div`
    flex: 0 0 auto;
    border: 1px solid red;
    width: 20vw;
    height: 100%;
`;

export default Landing
