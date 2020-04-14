import * as Types from './../constants/ActionType'
let initialState ='';
const fillCategoryId = (state = initialState, action) => {
    console.log(action);
    
        switch (action.type) {
            case Types.FILL_CATEGORY_ID : 
            return action.categoryId;

            default: return state ;
            // case Types.FILL_CATEGORY_ID :
            // return action.categoryId
        }
        return [...state]
    }
export default fillCategoryId;