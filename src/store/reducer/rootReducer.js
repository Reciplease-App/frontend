import {REDUX_WORKS} from '../actions/actions'

const initialState = {
    isWorking: false
}

export const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case REDUX_WORKS:
            return {
                ...state,
                isWorking: !state.isWorking
            }
        
        default: 
            return state;
    }
}