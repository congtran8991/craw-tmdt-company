import * as types from './../constants/ActionType'
let initialState = true;
const craw_return_app_company = (state = initialState, action) => {
        switch (action.type) {
            case types.CRAW_LIST_APP_COMPANY : 
            console.log(action.isResultCraw);
                return action.isResultCraw;
            default: return state ;
        }
        return state
    }
export default craw_return_app_company;