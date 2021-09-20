import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ButtonUnstyled from '@mui/core/ButtonUnstyled';
import MenuIcon from '@mui/icons-material/Menu';
import '../../styles/header.scss'

const Header = () => {
    return (
        <div className="header">
            <div className="header-content">
                <AccountCircleIcon fontSize="large"/>
                <ButtonUnstyled id="liked-recipes-button">
                    Saved Recipes
                </ButtonUnstyled>
                <MenuIcon fontSize="large" />
            </div>
        </div>
    )
}

export default Header;