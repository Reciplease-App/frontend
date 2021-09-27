import React, { useState } from 'react';
import '../styles/search.scss';
import Header from './constants/Header';
import { Search, FavoriteBorder, Favorite, KeyboardArrowRight } from '@mui/icons-material'
import Close from '@mui/icons-material/Close'
import { InputBase, Drawer, CircularProgress, IconButton, ButtonUnstyled } from '@mui/material'
import axios from 'axios';
import ToggleIcon from "material-ui-toggle-icon";

const drawerStyles = {
    background: '#f8f0e3',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
}

function SearchPage() {
    console.log('this should only render once')
    const [results, setResults] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const [loading, setLoading] = useState(false);

    const [pageRendered, setPageRendered] = useState(false);

    const submitSearch = () => {
        setLoading(true)
        axios.post('https://reciplease-backend.vercel.app/recipe', {recipe: searchValue})
            .then(res => {
                const likedProp = res.data.map(recipe => {
                    recipe.open = false;
                    recipe.liked = false;
                    return recipe;
                })
                setResults(likedProp);
            })
            .finally(() => {
                setLoading(false);
                setPageRendered(true);
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    return (
        <div>
            <Header/> 
                {pageRendered ? <div className="search-content">
                    <div className="search-bar">
                        <div className="search-icon-wrapper">
                            <Search fontSize='large' />
                        </div>
                        <InputBase
                        placeholder="Search by Recipe Name, Ingredient"
                        inputProps={{ 'aria-label': 'search' }}
                        id="search-input"
                        value={searchValue}
                        onChange={(e) => {setSearchValue(e.target.value)}}
                        />
                        <ButtonUnstyled onClick={submitSearch} variant="contained" id="search-button">Search</ButtonUnstyled>
                    </div>
                    <CircularProgress color="success" style={{display: `${loading ? '' : 'none'}`, marginTop: '2rem'}}/>
                        <div className="cards-wrapper" id={loading ? 'cards-wrapper-loading' : ''}>
                            {!results ? console.log('nothin to see here') : results && !loading ? results.map(recipe => {
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
                                                    offIcon={<KeyboardArrowRight fontSize="large"/>}
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
                                                        onIcon={<Favorite fontSize="large"/>}
                                                        offIcon={<FavoriteBorder fontSize="large"/>}
                                                    />
                                                </IconButton>
                                            </div>
                                        </Drawer>
                                    </div>
                                )
                            }) : null}
                        </div>
                </div>
                :
                <div className="search-content">
                <div className="search-bar">
                    <div className="search-icon-wrapper">
                        <Search fontSize='large' />
                    </div>
                        <InputBase
                        placeholder="Search by Recipe Name, Ingredient"
                        inputProps={{ 'aria-label': 'search' }}
                        id="search-input"
                        value={searchValue}
                        onChange={(e) => {setSearchValue(e.target.value)}}
                        />
                        <ButtonUnstyled onClick={submitSearch} variant="contained" id="search-button">Search</ButtonUnstyled>
                    </div>
                    <CircularProgress color="success" style={{display: `${loading ? '' : 'none'}`, marginTop: '2rem'}}/>
                </div>
                }
        </div>
    )
}

export default SearchPage