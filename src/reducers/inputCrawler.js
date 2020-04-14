import * as types from './../constants/ActionType'
let initialState = '';
const add_data_craw = (state = initialState, action) => {
        switch (action.type) {
            case types.ADD_DATA_CRAW :
                return action.addInputCrawData;
            default: return state ;
        }
        return state
    }
export default add_data_craw;