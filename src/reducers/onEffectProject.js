import * as Types from './../constants/ActionType'
let initialState ='';
const onEffectProject = (state = initialState, action) => {
        switch (action.type) {
            case Types.ON_LOOK_CATEGORY : 
            return action.isToggleForm;
            default: return state;
        }
        return [...state]
    }
export default onEffectProject;