import {HAMBURGER_MENU} from '../actions/actions'
import {SEARCH_SCREEN_ACTIVE} from '../actions/actions'
const initialState = {
    pathname: '',
    menuOpen: false
}

export const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case SEARCH_SCREEN_ACTIVE:
            return {
                ...state,
                pathname: action.payload
            }
        case HAMBURGER_MENU:
            return {
                ...state,
                menuOpen: !state.menuOpen
            }
        default: 
            return state;
    }
}