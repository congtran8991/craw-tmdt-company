import * as Types from './../constants/ActionType'
let initialState = true;
const checkSdDatabase = (state = initialState, action) => {
    switch (action.type) {
        case Types.CHECK_SD_DATABASE:
            return action.checkSdDatabase;
        case Types.CRAW_LIST_APP_COMPANY:
            return action.checkSdDatabase
        case Types.ON_REALOAD_CRAW_CATEGORY:
            return action.checkSdDatabase;
        // case Types.ON_REALOAD_CRAW_CATEGORY :
        //     return action.checkSdDatabase ;
        default: return true;
    }
}
export default checkSdDatabase;