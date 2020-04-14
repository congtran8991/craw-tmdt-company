import React, { Component } from 'react';
import { Redirect, Link } from "react-router-dom"
import { Axios } from '../Utils/Axios';
import { CircleLoading } from 'react-loadingg';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions/index'
import { findCategory } from '../actions/index';
//import $ from 'jquery';
// window.jQuery = window.$ = $;
const $ = window.$
// import moduleName from 'module';
// // require('popper');
// require('bootstrap');\
//require('bootstrap-select');

class BigItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categorys: []
        }
    }
    handleChange = (event) => {
        console.log(event.target.selectedIndex);
        const eTarget = event.target.options[event.target.selectedIndex]
        let infoWebId = eTarget.id;
        console.log(infoWebId);

        let url = eTarget.value;
        this.props.appActions.fillCategoryId(infoWebId);
        $('select[name=selValue]').val(url);
    }
    componentDidUpdate() {
        (async () => {
            if (this.props.selectedCheck == true) {
                let nameWeb = await Axios('get', '/Api/listInfoWeb');
                if(nameWeb.data.length>0){
                    $(".selectpicker").val(nameWeb.data[0].pathUrl);
                }
            }
            $(".selectpicker").selectpicker("refresh");
        })()
    }
    componentWillReceiveProps(props) {
        (async () => {
            if (props.selectedCheck == true) {
                console.log("cong tran");
                let nameWeb = await Axios('get', '/Api/listInfoWeb');
                if (nameWeb.data.length > 0) {
                    $(".selectpicker").selectpicker("refresh");
                    $(".selectpicker").val(nameWeb.data[0].pathUrl);
                }
            }
        })()
    }
    componentDidMount() {
        (async () => {
            try {
                $(".selectpicker").selectpicker("refresh");
                let categorys = await Axios('get', '/Api/listInfoWeb');
                console.log(categorys.data);
                this.props.appActions.findCategory(categorys.data);
            } catch (err) {
                console.log(err);
            }
        })()
    }
    // refreshData=()=>{
    //     console.log(this.props.nameWebData);
    //     (async()=>{
    //         try {
    //             let nameWeb = await Axios('get', '/Api/listInfoWeb');
    //             $('select[name=selValue]').val(nameWeb.data[0].pathUrl);
    //             $(".selectpicker").selectpicker("refresh");
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     })()
    // }
    render() {
        console.log(this.props.selectedCategory);
        let { categorys } = this.props;
        let dataCategory = categorys.map((category, index) => {
            return (
                <option value={category.pathUrl} key={index} id={category._id} data-subtext={category.timeCrawler} >
                    {category.nameWeb}
                </option>
            );
        })
        // let dataCategory = categorys.map((category, index) => {
        //     return (
        //         <option value={category.name} key={index} id={category.id} data-subtext={category.price} >
        //             {category.name}
        //         </option>
        //     );
        // })
        // console.log(nameWebs);

        return (
            <div>
                <form onSubmit={this.crawlerDataInforWeb}>
                    <label className='mrr-5'>
                        {/* <select className='form-control'
                            onChange={this.handleChange}
                        >
                            {nameWebInfo}
                        </select> */}
                        <select className="form-control selectpicker" data-live-search="true"
                            onChange={this.handleChange}
                            name="selValue" data-size="5">
                            {dataCategory}
                        </select>
                    </label>
                </form>


            </div>

        );
    }
}
const mapStateToprops = (state) => {
    console.log(state);
    return {
        categorys: state.categorys,
        fillCategoryId: state.fillCategoryId,
        selectedCategory: state.selectedCategory,
        check_find_data_company: state.check_find_data_company,
        selectedCheck: state.selectedCheck
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
export default connect(mapStateToprops, mapDispathToprops)(BigItem);
