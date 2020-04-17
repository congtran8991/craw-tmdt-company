import * as types from './../constants/ActionType'
let initialState = false;
const checkDelete = (state = initialState, action) => {
        switch (action.type) {
            case types.DELETE_APP_COMPANY : 
            console.log(action);
                return action.checkDelete  
            default: return state ;
        }
    }
export default checkDelete;