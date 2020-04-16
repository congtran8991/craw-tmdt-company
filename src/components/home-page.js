import React, { Component } from 'react';
import BigItem from './bigItem';
import { Redirect, Link } from "react-router-dom";
import { CircleLoading } from 'react-loadingg';
import { Axios } from '../Utils/Axios';
import DeleteForm from './deleteForm';
import InputCrawler from './inputCrawlerData';
import PopupCategory from './popupCategory';
import App from '../../src/App';
import './../App.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions/index'
class homePage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  onSignOut = () => {
    console.log(document.cookie.length);
    var d = new Date();
    d.setTime(d.getTime())
    var expires = "expires=" + d.toUTCString();
    for (let i = 0; i <= document.cookie.split(';').length; i++) {
      let cname = document.cookie.split(';')[0].split('=')[0];
      let cvalue = document.cookie.split(';')[0].split('=')[1];
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    this.setState({
      redirect: true
    })
    // (async()=>{
    // let abc = await  Axios('delete', '/Api/listCompany/abc');
    // console.log(abc);
    
    // })()
    // Axios('delete', '/Api/listCompany/abc');
  }
  onListCategory = () => {
    console.log(this.props.onCheckLoading);
    
    if (this.props.onCheckLoading == false) {
      alert('Đang cào lại dữ liệu');
    } else {
      this.props.appActions.onEffectProject(true);
    }
  }
  onMessage = () => {
    alert('Danh mục hiện tại đang rỗng')
  }
  onCrawProcess = () => {
    alert('Đang cào dữ liệu')
  }
  render() {
    console.log(this.props.onEffectProject);
    console.log(this.props.onCheckLoading);
    console.log(this.props.categorys.length);
    let { redirect = false } = this.state;
    if (redirect) return <Redirect to={'/'} />
    // if(this.props.isChechFillLoading==false) return (
    //      <div style={{ background:'red' }}>
    //        {/* <CircleLoading color="#485e74"/> */}
    //        </div>
    //   )
    return (
      <div className='full'>
        <div className={this.props.onEffectProject == true ? "row taskForm" : "row"}>
          <div className='col-sm-3'></div>
          <div className='col-sm-6'>
            <PopupCategory />
          </div>
          <div className='col-sm-3'></div>
        </div>
        <div className='selectionAction'>
          <div className='left_vt'
            onClick={this.onSignOut}
          >
            <i className="fas fa-sign-out-alt">&nbsp;&nbsp;Đăng xuất</i>
          </div>
        </div>
        {/* <div>{this.state.loadingCrawler == 'false' ? <CircleLoading/> : ''}</div> */}
        {/* <div className='NavBar_handling'>
        <div className='eventIcon'>
             <i className="far fa-plus-square i1" onClick={this.onAddForm}></i>
             <i className="far fa-edit i2"onClick={this.onUpdate}></i>
             <i className="far fa-trash-alt i3"onClick = {this.state.crawlerNumber ? this.onDeleteForm : this.onHidenDelete}></i>
        </div>
        </div> */}
        <div>
          <div className='flex-inline'>
            {this.props.isResultCraw === false ? <CircleLoading color="#ffc107"/> : this.props.isResultCraw === true ? <InputCrawler /> : <InputCrawler />}
          </div>
          {this.props.isChechFillLoading==false ? <div className='fillLoading'>
            <div>
                <CircleLoading color="#485e74"/> 
            </div>     
          </div> : ''}
          <div className='input_flex'>
            <BigItem />
            {/* {this.props.onCheckLoading === false ? <CircleLoading/> : this.props.onCheckLoading === true ? <InputCrawler/> : <InputCrawler/>} */}
          </div>
          <div className='category-Company'>
            <i className="fas fa-eye" onClick={this.props.categorys.length > 0 ? this.onListCategory : this.onMessage}>
              &nbsp;&nbsp;
               <u>
                Xem danh mục
               </u>
            </i>
          </div>
          <div>
            <App />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToprops = (state) => {
  console.log(state);
  return {
    categorys: state.categorys,
    fillCategoryId: state.fillCategoryId,
    onEffectProject: state.onEffectProject,
    onCheckLoading: state.onCheckLoading,
    isChechFillLoading : state.isChechFillLoading,
    isResultCraw : state.isResultCraw
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
export default connect(mapStateToprops, mapDispathToprops)(homePage);
