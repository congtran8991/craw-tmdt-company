import * as Types from './../constants/ActionType'
let initialState = [];
const listAppCompanys = (state = initialState, action) => {
    switch (action.type) {
        case Types.FIND_LIST_APP_COMPANY:
            console.log(action.listAppCompanys);
            
            if(action.listAppCompanys.success==false){
                return [] ;
            }else{
                return [...action.listAppCompanys];
            }
        case Types.DELETE_APP_COMPANY:
            return [...action.listAppCompanys];
        case Types.FILL_CATEGORY_ID:
            console.log(action.listAppCompanys);
            if(action.listAppCompanys==undefined){
                alert('Không kết nối được , Vui lòng F5 để load lại')
                return [] ;
            }else if(action.listAppCompanys){
                return [...action.listAppCompanys];
            }else{
                alert('Không kết nối được , Vui lòng F5 để load lại')
                return []
            }
        case Types.CRAW_LIST_APP_COMPANY:
            console.log(action.listAppCompanys);
            if(action.listAppCompanys==undefined){
                alert('ko cào được data')
                return [] ;
            }else{
                return [...action.listAppCompanys];
            }
        case Types.ON_SEARCH_DATA_COMPANY :
            return [...action.listAppCompanys];
        case Types.ON_DELETE_CATEGORY :
            return [...action.listAppCompanys];   
        case Types.ON_REALOAD_CRAW_CATEGORY :
            return [...action.listAppCompanys];    
        case Types.ON_CHANGE_RESET_DATA :
            return [...action.listAppCompanys];     
        default: return [...state];
    }
    return state;
}
export default listAppCompanys;