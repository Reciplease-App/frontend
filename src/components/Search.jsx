import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import '../styles/search.scss';
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
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress'

function SearchPage() {
    const [results, setResults] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    const drawerStyles = {
        background: '#f8f0e3',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    }

    const submitSearch = () => {
        setLoading(true)
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
            .finally(() => {
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        const togglePageLoading = () => {
            setPageLoading(!pageLoading)
        }
        if (pageLoading) {
            setTimeout(togglePageLoading, 20000)
        }
    }, [])
    
    return (
        <div className="search-content">
            <Header/>
            {pageLoading ? <LinearProgress value={30} style={{width: '60vw', height: '1rem'}} color="success" /> : null}
            <div className="search-bar" id={pageLoading ? 'search-bar-loading' : ''}>
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
            <CircularProgress color="success" style={{display: `${loading ? '' : 'none'}`, marginTop: '2rem'}}/>
            <div className="cards-wrapper" id={loading ? 'cards-wrapper-loading' : ''}>
                {results.length > 0 && !loading ? results.map(recipe => {
                    let recipeName = recipe.title
                    let recipeDescription = recipe.summary.replaceAll('<b>', '').replaceAll('</b>', '').replaceAll('<a href="', '').replaceAll('>', '').replaceAll('</a', '').replaceAll('"', ' ')
                    let vegetarian = recipe.vegetarian
                    let vegan = recipe.vegan
                    let recipeImage = recipe.image
                    let cheap = recipe.cheap
                    let recipeId = recipe.id
                    let liked = recipe.liked
                    
                    return (
                        <div
                        id="card">
                            <img className="recipe-image" src={recipeImage} alt="recipe"/>
                            <div className="card-content">
                                <h2 className="recipe-title">{recipeName}</h2>
                                {vegetarian ? <p style={{display: 'none'}} className="vegetarian">Vegetarian</p> : null}
                                {vegan ? <p style={{display: 'none'}} className="vegan">Vegan</p> : null}
                                {cheap ? <p style={{display: 'none'}} className="cheap">Cost-friendly</p> : null}
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
                            <Drawer PaperProps={{style: drawerStyles}} open={recipe.open} anchor='left'>
                                <div className="recipe-details-drawer">
                                    <div id="drawer-close-icon" onClick={() => {setResults(
                                        results.map(recipe => {
                                            if (recipe.id === recipeId) {
                                                recipe.open = !recipe.open
                                            }
                                            return recipe
                                        })
                                    )}}>
                                        <Close/>
                                    </div>
                                    <h1 className="recipe-details-title">{recipeName}</h1>
                                    <img className="recipe-details-image" src={recipeImage} alt="recipe"/>
                                    <p className="recipe-details-description">{recipeDescription}</p>
                                    <div className="diet-details" id={!vegetarian && !vegan && !cheap ? 'diet-tags-hidden' : ''}>
                                        {vegetarian ? <p className="vegetarian">Vegetarian</p> : null}
                                        {vegan ? <p className="vegan">Vegan</p> : null}
                                        {cheap ? <p className="cheap">Cost-friendly</p> : null}
                                    </div>
                                    <IconButton  size="large" onClick={() => {
                                        setResults(
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

export default connect(mapStateToProps)(SearchPage)