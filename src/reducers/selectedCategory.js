import * as Types from './../constants/ActionType'
let initialState ='';
const selectedCategory = (state = initialState, action) => {
        switch (action.type) {
            case Types.ON_DELETE_CATEGORY : 
            return action.seletedValue;
            default: return state ;
            // case Types.FILL_CATEGORY_ID :
            // return action.categoryId
        }
        return [...state]
    }
export default selectedCategory;