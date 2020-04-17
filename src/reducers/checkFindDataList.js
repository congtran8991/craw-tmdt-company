import * as types from './../constants/ActionType'
let initialState = true;
const checkFindDataList = (state = initialState, action) => {
    switch (action.type) {
        case types.CRAW_NAME_WEB:
            return action.checkFindDataCompany
        case types.ON_DELETE_CATEGORY:
            return action.checkFindDataCompany
        // case types.BEFORE_CRAW_LIST_APP_COMPANY:
        //     return action.checkFindDataCompany
        case types.CRAW_LIST_APP_COMPANY:
            return action.checkFindDataCompany
        case types.ON_REALOAD_CRAW_CATEGORY:
            return action.checkFindDataCompany
        case types.BEFORE_CRAW_LIST_APP_COMPANY:
            return action.checkFindDataCompany
        case types.ON_SEARCH_DATA_COMPANY :
            return action.checkFindDataCompany   
        default: return state;
    }
    return state
}
export default checkFindDataList;