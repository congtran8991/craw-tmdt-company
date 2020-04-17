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
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        })
        console.log(this.props.listAppCompanys);
        // if(tamDem==1){
        //     tamData.push(this.props.listAppCompanys);
        // }
        // this.setState({
        //     tamDemData :tamData[0]
        // })
        tamDem ++
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
        // console.log(value.trim().length);
        // console.log(value.length);


        if (value.trim().length == 0) {
            this.props.appActions.onChangeResetData(tamData[0]);
        }
        //  this.props.appActions.onChangeResetData(tamData[0]);

    }
    onSearchData = async () => {
        if (this.props.isResultCraw == false) {
            console.log("Trần văn công");
            console.log(this.state.tamDemData);


            let { searchData } = this.state;
            let { listAppCompanys, checkSdDatabase, fillCategoryId } = this.props;
            let category = await Axios('get', '/Api/listInfoWeb');
            let idCategory = fillCategoryId ? fillCategoryId : category.data.length > 0 ? category.data[0]._id : undefined;
            console.log(idCategory);
            let dataCompany = await Axios('get', '/Api/listCompany/' + idCategory);
            let dataListAppCompanys = dataCompany.data;
            console.log(dataListAppCompanys);
            let listCompanyName = dataListAppCompanys.filter((listAppCompany) => {
                return (listAppCompany.nameCompany) ? (listAppCompany.nameCompany).toLowerCase().indexOf(searchData.toLowerCase()) != -1 : '';
            })
            let listCompanyTaxCode = dataListAppCompanys.filter((listAppCompany) => {
                return (listAppCompany.taxCode) ? (listAppCompany.taxCode).toLowerCase().indexOf(searchData.toLowerCase()) != -1 : '';
            })
            let listCompanyAddress = dataListAppCompanys.filter((listAppCompany) => {
                return (listAppCompany.address) ? (listAppCompany.address).toLowerCase().indexOf(searchData.toLowerCase()) != -1 : '';
            })
            let listCompanyTelePhone = dataListAppCompanys.filter((listAppCompany) => {
                return (listAppCompany.telePhone) ? (listAppCompany.telePhone).toLowerCase().indexOf(searchData.toLowerCase()) != -1 : '';
            })
            let nameApp = dataListAppCompanys.filter((listAppCompany) => {
                return (listAppCompany.nameApp) ? (listAppCompany.nameApp).toLowerCase().indexOf(searchData.toLowerCase()) != -1 : '';
            })
            let nameTelephone = listCompanyAddress != 0 ? listCompanyAddress : listCompanyTelePhone;
            let nameTaxCode = listCompanyTaxCode != 0 ? listCompanyTaxCode : nameTelephone;
            let nameA = nameApp != 0 ? nameApp : nameTaxCode;
            let data = await listCompanyName != 0 ? listCompanyName : nameA;
            return data;
        } else {
            let { searchData } = this.state;
            console.log(this.state.tamDemData);
            console.log(this.props.listAppCompanys);


            let { listAppCompanys, checkSdDatabase, fillCategoryId } = this.props;
            let dataListAppCompanys = this.state.tamDemData;
            console.log(dataListAppCompanys);
            let listCompanyName = dataListAppCompanys.filter((listAppCompany) => {
                return (listAppCompany.nameCompany) ? (listAppCompany.nameCompany).toLowerCase().indexOf(searchData.toLowerCase()) != -1 : '';
            })
            let listCompanyTaxCode = dataListAppCompanys.filter((listAppCompany) => {
                return (listAppCompany.taxCode) ? (listAppCompany.taxCode).toLowerCase().indexOf(searchData.toLowerCase()) != -1 : '';
            })
            let listCompanyAddress = dataListAppCompanys.filter((listAppCompany) => {
                return (listAppCompany.address) ? (listAppCompany.address).toLowerCase().indexOf(searchData.toLowerCase()) != -1 : '';
            })
            let listCompanyTelePhone = dataListAppCompanys.filter((listAppCompany) => {
                return (listAppCompany.telePhone) ? (listAppCompany.telePhone).toLowerCase().indexOf(searchData.toLowerCase()) != -1 : '';
            })
            let nameApp = dataListAppCompanys.filter((listAppCompany) => {
                return (listAppCompany.nameApp) ? (listAppCompany.nameApp).toLowerCase().indexOf(searchData.toLowerCase()) != -1 : '';
            })
            let nameTelephone = listCompanyAddress != 0 ? listCompanyAddress : listCompanyTelePhone;
            let nameTaxCode = listCompanyTaxCode != 0 ? listCompanyTaxCode : nameTelephone;
            let nameA = nameApp != 0 ? nameApp : nameTaxCode;
            let data = await listCompanyName != 0 ? listCompanyName : nameA;
            console.log(data);

            return data;
        }
    }
    onKeyPressData = (event) => {
        // event.preventDefault()
        (async () => {
            if (event.key === 'Enter') {
                event.preventDefault()
                console.log(this.state.tamDemData);
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
