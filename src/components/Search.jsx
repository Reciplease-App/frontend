import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { checkIfReduxWorks } from '../store';
import '../styles/search.scss';
import { useHistory } from 'react-router';
import Search from '@mui/icons-material/Search'
import { InputBase } from '@mui/material'
import ButtonUnstyled from '@mui/core/ButtonUnstyled';
import axios from 'axios';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ToggleIcon from "material-ui-toggle-icon";
import IconButton from "@material-ui/core/IconButton";
import Header from './constants/Header';
import Drawer from '@mui/material/Drawer';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Close from '@mui/icons-material/Close';

function SearchPage({isWorking, checkIfReduxWorks}, props) {
    // const [login, setLogin] = useState(false);
    // const [signup, setSignup] = useState(false);
    const [results, setResults] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const submitSearch = () => {
        console.log(searchValue)
        axios.post('https://reciplease-application.herokuapp.com/recipe', {recipe: searchValue})
            .then(res => {
                console.log(res.data)
                const likedProp = res.data.map(recipe => {
                    recipe.open = false;
                    recipe.liked = false;
                    return recipe;
                })
                setResults(likedProp);
            })
            .catch(err => {
                console.log(err)
            })
    }



    const history = useHistory()
    
    return (
        <div className="search-content">
            <Header/>
            <div className="search-bar">
                <div className="search-icon-wrapper">
                    <Search fontSize='large' />
                </div>
                <InputBase
                placeholder="Search by Recipe Name, Ingredient"
                inputProps={{ 'aria-label': 'search' }}
                id="search-input"
                onChange={(e) => {setSearchValue(e.target.value)}}
                />
                <ButtonUnstyled onClick={submitSearch} variant="contained" id="search-button">Search</ButtonUnstyled>
            </div>
            <div className="cards-wrapper">
                {results ? results.map(recipe => {
                    let recipeName = recipe.title
                    let recipeDescription = recipe.summary
                    let vegetarian = recipe.vegetarian
                    let vegan = recipe.vegan
                    let recipeImage = recipe.image
                    let cheap = recipe.cheap
                    let recipeId = recipe.id
                    let liked = recipe.liked
                    return (
                        <div id="card">
                            <img className="recipe-image" src={recipeImage} alt="recipe"/>
                            <div className="card-content">
                                <h2 className="recipe-title">{recipeName}</h2>
                                {vegetarian ? <p className="vegetarian">Vegetarian</p> : null}
                                {vegan ? <p className="vegan">Vegan</p> : null}
                                {cheap ? <p className="cheap">Cost-friendly</p> : null}
                                <IconButton  size="large" onClick={() => {setResults(
                                    results.map(recipe => {
                                        if (recipe.id === recipeId) {
                                            recipe.open = !recipe.open;
                                        }
                                        return recipe
                                    })
                                )}}>
                                    <ToggleIcon
                                        id="heart-icon"
                                        on={recipe.open}
                                        onIcon={<Close fontSize="large"/>}
                                        offIcon={<KeyboardArrowRightIcon fontSize="large"/>}
                                    />
                                </IconButton>
                            </div>
                            <Drawer open={recipe.open} anchor='left'>
                                <div className="recipe-details-drawer">
                                    <div onClick={() => {setResults(
                                        results.map(recipe => {
                                            if (recipe.id === recipeId) {
                                                recipe.open = !recipe.open;
                                            }
                                            return recipe
                                        })
                                    )}}>
                                        <Close/>
                                    </div>
                                    <h1 className="recipe-details-title">{recipeName}</h1>
                                    <img className="recipe-details-image" src={recipeImage} alt="recipe"/>
                                    <p>{recipeDescription}</p>
                                    {vegetarian ? <p className="vegetarian">Vegetarian</p> : null}
                                    {vegan ? <p className="vegan">Vegan</p> : null}
                                    {cheap ? <p className="cheap">Cost-friendly</p> : null}
                                    <IconButton  size="large" onClick={() => {setResults(
                                        results.map(recipe => {
                                            if (recipe.id === recipeId) {
                                                recipe.liked = !recipe.liked;
                                            }
                                            return recipe
                                        })
                                    )}}>
                                        <ToggleIcon
                                            id="heart-icon"
                                            on={liked}
                                            onIcon={<FavoriteIcon fontSize="large"/>}
                                            offIcon={<FavoriteBorderIcon fontSize="large"/>}
                                        />
                                    </IconButton>
                                </div>
                            </Drawer>
                        </div>
                    )
                }) : console.log('no results')}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        state
    }
}

export default connect(mapStateToProps, {checkIfReduxWorks})(SearchPage)