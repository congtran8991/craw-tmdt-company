import * as types from './../constants/ActionType'
let initialState = true;
const isResultCraw = (state = initialState, action) => {
    switch (action.type) {
        case types.BEFORE_CRAW_LIST_APP_COMPANY:
            return action.isResultCraw
        case types.CRAW_LIST_APP_COMPANY:
            return action.isResultCraw
        case types.ON_REALOAD_CRAW_CATEGORY:
            return action.isResultCraw
        case types.LOADING_CATEGORY:
            return action.isResultCraw     
        default: return state;
    }
}
export default isResultCraw;