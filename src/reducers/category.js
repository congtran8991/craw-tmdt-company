import * as Types from './../constants/ActionType'
let initialState = [];
const categorys = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case Types.FIND_CATEGORY:
            return [...action.categorys];
        case Types.CRAW_NAME_WEB:
            return [...action.categorys];
        case Types.ON_UPDATE_CATEGORY:
            return [...action.categorys];
        case Types.ON_DELETE_CATEGORY :
            return [...action.categorys]
        default: return [...state];
        // case Types.FILL_CATEGORY_ID :
        // return action.categoryId
    }
    return [...state]
}
export default categorys;