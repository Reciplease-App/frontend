export const REDUX_WORKS = "REDUX_WORKS";
export const SEARCH_SCREEN_ACTIVE = 'SEARCH_SCREEN_ACTIVE';
export const HAMBURGER_MENU = 'HAMBURGER_MENU';


export const checkIfReduxWorks = () => {
    return {type: REDUX_WORKS}
}

export const activeScreen = (location) => {
    return {type: SEARCH_SCREEN_ACTIVE, payload: location.pathname}
}

export const hamburgerMenu = () => {
    return {type: HAMBURGER_MENU}
}