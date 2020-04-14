import { combineReducers } from 'redux';
import categorys from './category';
import listAppCompanys from './list_app_company';
import inputCrawData from './inputCrawler';
import craw_name_category from './craw_name_category';
import craw_return_app_company from './craw_return_app_company';
import check_find_data_company from './checkFindDataList';
import fillCategoryId from './fillCategoryId';
import checkDelete from './checkDelete';
import onEffectProject from './onEffectProject';
import selectedCategory from './selectedCategory';
import onCheckLoading from './onCheckLoading';
import selectedCheck from './selectedCheck';
import checkSdDatabase from './checkSdDatabae';
const appReducer = combineReducers({
    categorys,
    listAppCompanys,
    inputCrawData,
    craw_name_category,
    craw_return_app_company,
    check_find_data_company,
    fillCategoryId,
    checkDelete,
    onEffectProject,
    selectedCategory,
    onCheckLoading,
    selectedCheck,
    checkSdDatabase
});
export default appReducer;