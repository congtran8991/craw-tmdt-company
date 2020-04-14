import * as types from './../constants/ActionType'
let initialState = '';
const craw_name_category = (state = initialState, action) => {
        switch (action.type) {
            case types.CRAW_NAME_WEB : 
                return action.nameCategory 
            default: return state ;
        }
        return state
    }
export default craw_name_category;