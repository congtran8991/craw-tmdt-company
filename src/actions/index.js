import * as Types from './../constants/ActionType';
import { Axios } from '../Utils/Axios';
export const findCategory = (categorys) => {
    return {
        type: Types.FIND_CATEGORY,
        categorys,
        selectedCheck: false
    }
}
export const findListAppCompany = (listAppCompanys) => {
    return {
        type: Types.FIND_LIST_APP_COMPANY,
        listAppCompanys,
        selectedCheck: false
    }
}
export const addCrawDataCompany = (addInputCrawData) => {
    return {
        type: Types.ADD_DATA_CRAW,
        addInputCrawData,
        selectedCheck: false
    }
}
export const actionCrawNameCategory = (data, dateTime, pathUrl) => {
    return dispatch => {
        (async () => {
            let nameCategory = await Axios('post', '/Api/listInfoWeb/crawlerWeb', data);
            if (nameCategory.data.length > 0) {
                let dataInfoweb = {
                    nameWeb: nameCategory.data,
                    pathUrl: pathUrl,
                    timeCrawler: dateTime
                }
                dispatch({
                    type: Types.LOADING_CATEGORY,
                    isResultCraw: false 
                })
                await Axios('post', '/Api/listInfoWeb', dataInfoweb);
                let allDataCategory = await Axios('get', '/Api/listInfoWeb');
                console.log(allDataCategory.data);
                
                dispatch({
                    type: Types.CRAW_NAME_WEB,
                    nameCategory: nameCategory.data,
                    categorys: allDataCategory.data,
                    checkFindDataCompany: true,
                    selectedCheck: false
                    //isResultCraw: false 
                })
            } else {
                alert('Chưa cào được tên danh mục')
                dispatch({
                    type: Types.MESSAGE_CRAW_NAME_WEB,
                    message: false,
                    selectedCheck: false
                })
            }
        })()
    }
}
export const actionCrawAppCompany = (dataCrawCompany, dataUrl) => {
    return async dispatch => {
        //(async () => {
        dispatch({
            type: Types.BEFORE_CRAW_LIST_APP_COMPANY,
            checkFindDataCompany: false,
            isResultCraw: false,
        })
        let allDataCategory = await Axios('get', '/Api/listInfoWeb');
        console.log(allDataCategory.data);
        let checkData = allDataCategory.data.filter((data) => {
            return data.pathUrl == dataUrl;
        })
        if (checkData.length > 0) {
            let resultCraw = await Axios('post', '/Api/listCompany/', dataCrawCompany);
            console.log(resultCraw.data.success);
            let findListAppCompany = await Axios('get', '/Api/listCompany/' + allDataCategory.data[0]._id);
            console.log(resultCraw.data.success);
            alert('Bạn đã cào xong')
            dispatch({
                type: Types.CRAW_LIST_APP_COMPANY,
                listAppCompanys: findListAppCompany.data,
                isCheckLoading: true,
                isResultCraw: resultCraw.data.success,
                seletedCheck: true,
                checkSdDatabase: true,
                checkFindDataCompany: true
            })
        } else {
            // dispatch({
            //     type: Types.CRAW_LIST_APP_COMPANY,
            //     isCheckLoading: true
            // }) 
             alert('Chưa cào được data,bạn nhấn reload để cào lại')
            dispatch({
                type: Types.BEFORE_CRAW_LIST_APP_COMPANY,
                checkFindDataCompany: true,
                isCheckLoading: false,
                isResultCraw: true
            })

        }
    }
}
export const crawFindDataCompany = (listAppCompanys) => {
    return {
        type: Types.CRAW_FIND_LIST_APP_COMPANY,
        listAppCompanys
    }
}
export const fillCategoryId = (categoryId) => {
    return dispatch => {
        (async () => {
            // let abc= await Axios('delete', '/Api/listCompany/deleteAll');
            // console.log(abc);
            dispatch({
                type: Types.LOADING_FULL_PROJECT,
                isChechFillLoading : false
            })
            let findListAppCompany = await Axios('get', '/Api/listCompany/' + categoryId);
            dispatch({
                type: Types.FILL_CATEGORY_ID,
                categoryId,
                listAppCompanys: findListAppCompany.data,
                selectedCheck: false,
                isChechFillLoading : true
            })
        })()
    }
}
export const deleteAppCompany = (deleteData, categoryId) => {
    return dispatch => {
        (async () => {
            dispatch({
                type: Types.LOADING_FULL_PROJECT,
                isChechFillLoading : false
            })
            await Axios('delete', '/Api/listCompany', deleteData);
            let findListCompany = await Axios('get', '/Api/listCompany/' + categoryId);
            dispatch({
                type: Types.DELETE_APP_COMPANY,
                listAppCompanys: findListCompany.data,
                checkDelete: true,
                selectedCheck: false,
                isChechFillLoading : true
            })
        })()
    }
}
export const onSearchDataCompany = (dataSearchAppCompany) => {
    return {
        type: Types.ON_SEARCH_DATA_COMPANY,
        listAppCompanys: dataSearchAppCompany,
        selectedCheck: false,
        checkFindDataCompany:true
    }
}
export const onEffectProject = (boolean) => {
    return {
        type: Types.ON_LOOK_CATEGORY,
        isToggleForm: boolean,
        selectedCheck: false
    }
}
export const onUpdateCategory = (data) => {
    return dispatch => {
        (async () => {
            await Axios('put', '/Api/listInfoWeb', data);
            let dataInfoCategory = await Axios('get', '/Api/listInfoWeb');
            alert('Update danh mục thành công')
            dispatch({
                type: Types.ON_UPDATE_CATEGORY,
                categorys: dataInfoCategory.data,
                selectedCheck: false
            })
        })()
    }
}
export const onDeleteCategory = (data) => {
    return dispatch => {
        (async () => {
            dispatch({
                type:Types.LOADING_FULL_PROJECT, 
                isChechFillLoading : false
            })
            await Axios('delete', '/Api/listInfoWeb/', data);
            let dataInfoCategory = await Axios('get', '/Api/listInfoWeb');
            let categoryId = dataInfoCategory.data.length > 0 ? dataInfoCategory.data[0]._id : undefined;
            let findListCompany = await Axios('get', '/Api/listCompany/' + categoryId);
            alert('Delete thành công')
            dispatch({
                type: Types.ON_DELETE_CATEGORY,
                categorys: dataInfoCategory.data,
                seletedValue: dataInfoCategory.data.length > 0 ? dataInfoCategory.data[0].pathUrl : '',
                listAppCompanys: findListCompany.data,
                checkFindDataCompany: true,
                selectedCheck: true,
                isChechFillLoading :true
            })
        })()
    }
}
export const onCheckLoading = () => {
    return {
        type: Types.ON_CHECK_LOADING,
        isCheckLoading: false,
        selectedCheck: false
    }
}
export const onRealoadCraw = (dataReaload) => {
    console.log(dataReaload);
    
    return async dispatch => {
        let findListCompanyBefore = await Axios('get', '/Api/listCompany/' + dataReaload.webinforId);
        dispatch({
            type: Types.ON_REALOAD_CRAW_CATEGORY,
            isCheckLoading: false,
            listAppCompanys: findListCompanyBefore.data,
            selectedCheck: false,
            checkSdDatabase: false,
            checkFindDataCompany: false,
            isResultCraw : false
        })
        alert("Bạn đang cào lại")
        console.log(dataReaload);

        let isResultCraw = await Axios('post', '/Api/listCompany/crawlerContinue', dataReaload);
        
        let findListCompanyAfter = await Axios('get', '/Api/listCompany/' + dataReaload.webinforId);
        alert('Dữ liệu đã cào hoàn tất')
        dispatch({
            type: Types.ON_REALOAD_CRAW_CATEGORY,
            listAppCompanys: findListCompanyAfter.data,
            isCheckLoading: true,
            selectedCheck: false,
            checkSdDatabase: true,
            checkFindDataCompany: true,
            isResultCraw  : isResultCraw.data.success
        })
    }
}
export const onChangeResetData = (tamData) => {
  //  console.log(tamData);
    
    return {
        type: Types.ON_CHANGE_RESET_DATA,
        listAppCompanys : tamData
    }
}

