import * as Types from './../constants/ActionType'
let initialState = true;
const onCheckLoading = (state = initialState, action) => {
    switch (action.type) {
        case Types.ON_CHECK_LOADING:
            return action.isCheckLoading;
        case Types.CRAW_LIST_APP_COMPANY:
            return action.isCheckLoading;
        case Types.ON_REALOAD_CRAW_CATEGORY:
            return action.isCheckLoading
        // case Types.LOADING_FULL_PROJECT :
        //     return action.isCheckLoading
        // case Types.FILL_CATEGORY_ID :
        //     return action.isCheckLoading       
        // case Types.ON_DELETE_CATEGORY :
        //     return action.isCheckLoading   
        default: return state;
    }
}
export default onCheckLoading;