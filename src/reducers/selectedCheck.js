import * as Types from './../constants/ActionType'
let initialState =false;
const selectedCheck = (state = initialState, action) => {
        switch (action.type) {
            case Types.CRAW_LIST_APP_COMPANY : 
            return action.seletedCheck;
            case Types.ON_DELETE_CATEGORY : 
            return true;
            default: return false ;
        }
    }
export default selectedCheck;