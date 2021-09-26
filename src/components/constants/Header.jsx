import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import '../../styles/header.scss'
import { useHistory, useLocation } from 'react-router';
import { connect } from 'react-redux';
import { hamburgerMenu } from '../../store/actions/actions';
import { Drawer } from '@material-ui/core';

const Header = (props) => {
    const history = useHistory();



    return (
        <div className="header">
            <Drawer open={props.menuOpen} onClose={() => {props.hamburgerMenu()}} anchor="right">
                <div className="drawer">
                    hello world
                </div>
            </Drawer>
            <div className="header-content">
                <AccountCircleIcon fontSize="large"/>
                <div onClick={() => {console.log(props); props.hamburgerMenu();}}>
                    <MenuIcon fontSize="large" />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps, {hamburgerMenu})(Header);