import * as Types from './../constants/ActionType'
let initialState = true;
const isCheckFillLoading = (state = initialState, action) => {
    switch (action.type) {
        case Types.LOADING_FULL_PROJECT:
            return action.isChechFillLoading
        case Types.FILL_CATEGORY_ID:
            return action.isChechFillLoading
        case Types.DELETE_APP_COMPANY:
            return action.isChechFillLoading
        case Types.ON_DELETE_CATEGORY:
            return action.isChechFillLoading    
        default: return state;
    }
}
export default isCheckFillLoading;