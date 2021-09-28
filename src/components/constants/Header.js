import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
// import { useHistory } from 'react-router';
import { Drawer } from '@material-ui/core';

const Header = () => {



    return (
        <div className="header">
            <Drawer anchor="right">
                <div className="drawer">
                    hello world
                </div>
            </Drawer>
            <div className="header-content">
                <AccountCircleIcon fontSize="large"/>
                <div>
                    <MenuIcon fontSize="large" />
                </div>
            </div>
        </div>
    )
}

export default Header;