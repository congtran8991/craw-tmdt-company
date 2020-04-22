import React, { Component } from 'react';
import { Axios } from '../Utils/Axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions/index'
let wait = 0;
let tamData = [];
let tamDem = 0;
let tamFill = 0;
let fillData = [];
let checkSTTdata = 0
class Search extends Component {
    constructor(props) {
        super(props);
        //this.onSearchData = this.onSearchData.bind(this);
        this.state = {
            searchData: '',
            tamDemData: []
        }
    }
    onChangeData = (event) => {
        checkSTTdata = 0
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        })
        console.log(this.props.listAppCompanys);
        tamDem++
        if (this.props.fillCategoryId != '') {
            console.log(fillData[0]);
            console.log(this.props.fillCategoryId);
            if (fillData[0] != this.props.fillCategoryId) {
                fillData.pop();
                fillData.push(this.props.fillCategoryId);
                tamData.pop()
                tamData.push(this.props.listAppCompanys)
                tamDem = 1
            } else if (tamDem == 1) {
                tamData.pop()
                tamData.push(this.props.listAppCompanys)
            }
        } else if (tamDem == 1) {
            tamData.push(this.props.listAppCompanys)
        }
        console.log(tamData[0]);
        this.setState({
            tamDemData: tamData[0]
        })
        if (value.trim().length == 0) {
            this.props.appActions.onChangeResetData(tamData[0]);
        }
        //  this.props.appActions.onChangeResetData(tamData[0]);

    }
    longestCommonSubstring = (string1, string2) => {
        const s1 = string1;
        const s2 = string2;


        console.log(s1)
        const substringMatrix = Array(s2.length + 1).fill(null).map(() => {
            return Array(s1.length + 1).fill(null);
        });
        console.log(substringMatrix);

        for (let columnIndex = 0; columnIndex <= s1.length; columnIndex += 1) {
            substringMatrix[0][columnIndex] = 0;
        }

        for (let rowIndex = 0; rowIndex <= s2.length; rowIndex += 1) {
            substringMatrix[rowIndex][0] = 0;
        }

        let longestSubstringLength = 0;
        let longestSubstringColumn = 0;
        let longestSubstringRow = 0;

        for (let rowIndex = 1; rowIndex <= s2.length; rowIndex += 1) {
            for (let columnIndex = 1; columnIndex <= s1.length; columnIndex += 1) {
                if (s1[columnIndex - 1] === s2[rowIndex - 1]) {
                    substringMatrix[rowIndex][columnIndex] = substringMatrix[rowIndex - 1][columnIndex - 1] + 1;
                } else {
                    substringMatrix[rowIndex][columnIndex] = 0;
                }
                if (substringMatrix[rowIndex][columnIndex] > longestSubstringLength) {
                    longestSubstringLength = substringMatrix[rowIndex][columnIndex];
                    longestSubstringColumn = columnIndex;
                    longestSubstringRow = rowIndex;
                }
            }
        }

        if (longestSubstringLength === 0) {
            // Longest common substring has not been found.
            return '';
        }

        // Detect the longest substring from the matrix.
        let longestSubstring = '';

        while (substringMatrix[longestSubstringRow][longestSubstringColumn] > 0) {
            longestSubstring = s1[longestSubstringColumn - 1] + longestSubstring;
            longestSubstringRow -= 1;
            longestSubstringColumn -= 1;
        }

        return longestSubstring;
    }
    //   outDataSearch=()=>{

    //   }
    onSearchData = async () => {
        console.log("tran cong");
        if (this.props.isResultCraw == false) {
            let searchData = this.state.searchData.split(' ').join('').toLowerCase();
            let { listAppCompanys, checkSdDatabase, fillCategoryId } = this.props;
            let category = await Axios('get', '/Api/listInfoWeb');
            let idCategoryDefault = category.data.length > 0 ? category.data[0]._id : undefined ;
            let idCategory = fillCategoryId ? fillCategoryId : idCategoryDefault;
            let dataCompany = await Axios('get', '/Api/listCompany/' + idCategory);
            let dataListAppCompanys = dataCompany.data;
            let listCompanyName = dataListAppCompanys.filter((listAppCompany) => {
                let nameCompanyS = listAppCompany.nameCompany.split(' ').join('').toLowerCase();
                let address = listAppCompany.address ? listAppCompany.address.split(' ').join('').toLowerCase() : ' ';
                let taxCode = listAppCompany.taxCode ? listAppCompany.taxCode.split('') : '';
                let telePhone = listAppCompany.telePhone;
                if (this.longestCommonSubstring(nameCompanyS.split(''), searchData).length / searchData.length == 1 ||
                    this.longestCommonSubstring(address.split(''), searchData).length / searchData.length == 1 ||
                    this.longestCommonSubstring(taxCode, searchData).length / searchData.length == 1 ||
                    this.longestCommonSubstring(telePhone, searchData).length / searchData.length == 1) {
                    console.log(listAppCompany, this.longestCommonSubstring(nameCompanyS.split(''), searchData).length / searchData.length);
                    console.log(listAppCompany, this.longestCommonSubstring(address.split(''), searchData).length / searchData.length);
                    console.log(this.longestCommonSubstring(nameCompanyS.split(' '), searchData.split('')).length / searchData.length);
                    console.log(listAppCompany);
                    checkSTTdata = 1
                    return listAppCompany
                } else if ((checkSTTdata == 0) && (this.longestCommonSubstring(nameCompanyS.split(''), searchData).length / searchData.length >= 0.3 ||
                    this.longestCommonSubstring(address.split(''), searchData).length / searchData.length >= 0.3 ||
                    this.longestCommonSubstring(taxCode, searchData).length / searchData.length >= 0.7 ||
                    this.longestCommonSubstring(telePhone, searchData).length / searchData.length >= 0.7)) {
                    return listAppCompany
                }
            })
            return listCompanyName;
        } else {
            let searchData = this.state.searchData.split(' ').join('').toLowerCase();
            //let { listAppCompanys, checkSdDatabase, fillCategoryId } = this.props;
            let dataListAppCompanys = this.state.tamDemData;
            console.log(dataListAppCompanys);
            let listCompanyName = dataListAppCompanys.filter((listAppCompany) => {
                let nameCompanyS = listAppCompany.nameCompany.split(' ').join('').toLowerCase();
                let address = listAppCompany.address ? listAppCompany.address.split(' ').join('').toLowerCase() : ' ';
                let taxCode = listAppCompany.taxCode ? listAppCompany.taxCode.split('') : '';
                let telePhone = listAppCompany.telePhone;
                if (this.longestCommonSubstring(nameCompanyS.split(''), searchData).length / searchData.length == 1 ||
                    this.longestCommonSubstring(address.split(''), searchData).length / searchData.length == 1 ||
                    this.longestCommonSubstring(taxCode, searchData).length / searchData.length == 1 ||
                    this.longestCommonSubstring(telePhone, searchData).length / searchData.length == 1) {
                    console.log(listAppCompany, this.longestCommonSubstring(nameCompanyS.split(''), searchData).length / searchData.length);
                    console.log(listAppCompany, this.longestCommonSubstring(address.split(''), searchData).length / searchData.length);
                    console.log(this.longestCommonSubstring(nameCompanyS.split(' '), searchData.split('')).length / searchData.length);
                    console.log(listAppCompany);
                    checkSTTdata = 1
                    return listAppCompany
                } else if ((checkSTTdata == 0) && (this.longestCommonSubstring(nameCompanyS.split(''), searchData).length / searchData.length >= 0.3 ||
                    this.longestCommonSubstring(address.split(''), searchData).length / searchData.length >= 0.3 ||
                    this.longestCommonSubstring(taxCode, searchData).length / searchData.length >= 0.7 ||
                    this.longestCommonSubstring(telePhone, searchData).length / searchData.length >= 0.7)) {
                    return listAppCompany
                }
            })
            return listCompanyName;
        }
    }
    onKeyPressData = (event) => {
        // event.preventDefault()
        (async () => {
            if (event.key === 'Enter') {
                event.preventDefault()
                //console.log(await this.onSearchData());

                // console.log(this.state.tamDemData);
                this.props.appActions.onSearchDataCompany(await this.onSearchData());
            }
        })()
    }
    dataSearchCompany = () => {
        (async () => {
            let { categorys } = this.props;
            let { searchData } = this.state;
            if (searchData.length == 0) {
                let dataWebId = categorys.length > 0 ? categorys[0]._id : undefined
                let idCompany = this.props.fillWebInfoId ? this.props.fillWebInfoId : dataWebId;
                let findListCompany = await Axios('get', '/Api/listCompany/' + idCompany);
                this.props.appActions.onSearchDataCompany(findListCompany.data);
            } else {
                this.props.appActions.onSearchDataCompany(await this.onSearchData());
            }
        })()
    }
    render() {
        return (
            <form>
                <div className="form-group flexForm">
                    <input
                        type="text"
                        className="form-control sizeInput"
                        placeholder="Search"
                        value={this.state.searchData}
                        name="searchData"
                        onChange={this.onChangeData}
                        onKeyPress={this.onKeyPressData}
                    />
                    <div className='btn primary mr-input ' onClick={this.dataSearchCompany}>
                        Search
                        </div>
                </div>
            </form>
        );
    }
}

const mapStateToprops = (state) => {
    console.log(state);
    return {
        listAppCompanys: state.listAppCompanys,
        categorys: state.categorys,
        checkFindData: state.check_find_data_company,
        fillCategoryId: state.fillCategoryId,
        checkDelete: state.checkDelete,
        checkSdDatabase: state.checkSdDatabase,
        isResultCraw: state.isResultCraw
    }
}
const mapDispathToprops = (dispatch) => {
    return {
        //    findAllCatagory : (categorys) =>{
        //        dispatch(findCategory(categorys));
        //    }
        appActions: bindActionCreators(appActions, dispatch)
    }
}
export default connect(mapStateToprops, mapDispathToprops)(Search);
