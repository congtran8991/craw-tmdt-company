import React, { Component } from 'react';
import { Axios } from '../Utils/Axios';
import { CircleLoading } from 'react-loadingg';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index'
class InputCrawler extends Component {
    constructor(props){
      super(props);
      this.state={
        crawCategory : ''
      }
    }
  handleChangeAdd = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    this.setState({
      crawNameWebCategory: value
    })
    switch (value) {
      case 'http://online.gov.vn/WebDetails/WebDetailsTMDT':
        value = 'http://online.gov.vn/WebDetails/InfoSearchWebCCDV';
        break;
      case 'http://online.gov.vn/WebDetails':
        value = 'http://online.gov.vn/WebDetails/InfoSearchWeb';
        break;
      case 'http://online.gov.vn/AppDetails':
        value = 'http://online.gov.vn/AppDetails/InfoSearchApp';
        break;
      case 'http://online.gov.vn/AppDetails/AppDetailsTMDT':
        value = 'http://online.gov.vn/AppDetails/InfoSearchAppTMDT';
        break
      default:
        value = false
    }
    this.setState({
      newNameWebCategory: value
    })
    this.props.appActions.addCrawDataCompany(value)
  }
  // handleChangeAdd = (event) => {
  //   var name = event.target.name;
  //   var value = event.target.value;
  //   this.setState({
  //     crawNameWebCategory: value
  //   })
  //   switch (value) {
  //     case 'http://online.gov.vn/WebDetails/WebDetailsTMDT':
  //       value = 'http://online.gov.vn/WebDetails/InfoSearchWebCCDV';
  //       break;
  //     case 'http://online.gov.vn/WebDetails':
  //       value = 'http://online.gov.vn/WebDetails/InfoSearchWeb';
  //       break;
  //     case 'http://online.gov.vn/AppDetails':
  //       value = 'http://online.gov.vn/AppDetails/InfoSearchApp';
  //       break;
  //     case 'http://online.gov.vn/AppDetails/AppDetailsTMDT':
  //       value = 'http://online.gov.vn/AppDetails/InfoSearchAppTMDT';
  //       break
  //   }
  //   console.log(value);
  //   this.setState({
  //     [name]: value
  //   })
  // }
  //   onCrawlerDataWeb = () =>{
  //     let dem = 0;
  //       (async()=>{
  //         this.setState({
  //           loading : true
  //         })
  //         let data = {
  //           webinfoUrl:this.state.crawNameWebCategory
  //         }
  //         let nameWebdata = await Axios('get','/Api/listInfoWeb');
  //         console.log(nameWebdata.data);

  //         for(let i = 0 ; i< nameWebdata.data.length ; i++){ 
  //           if(nameWebdata.data[i].pathUrl==this.state.crawCategory){
  //             dem=1
  //           }
  //         }
  //         console.log(dem);

  //         let nameCategory = await Axios('post','/Api/listInfoWeb/crawlerWeb',data);
  //         if(nameCategory.data.success==false){
  //           this.setState({
  //             loading : false
  //           })
  //           alert('Đường dẫn bạn nhập sai !')
  //         }else if(dem==1){
  //           this.setState({
  //             loading : false
  //         })
  //           alert('URL bạn nhập đã tồn tại !')
  //         }else{
  //           let today = new Date();
  //           let  date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
  //           let  time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  //           let dateTime = date+' '+time;
  //             let dataInfoweb ={
  //               nameWeb : nameCategory.data,
  //               pathUrl : this.state.crawCategory,
  //               timeCrawler : dateTime
  //             }
  //             let dataCrawCompany= {
  //               webinfoUrl : this.state.crawCategory
  //             }
  //             await Axios('post','/Api/listInfoWeb',dataInfoweb); 
  //             setTimeout(()=>{
  //               this.setState({
  //                   loading : false
  //               })
  //               alert("Bạn đã thêm thành công,Dữ liệu đang được tải về");
  //               this.props.dataWebInfo(dataInfoWeb)
  //             },3000)
  //             localStorage.checkCrawDelete = false;
  //             let checkFalse = localStorage.getItem('checkCrawDelete');
  //             console.log(checkFalse==false);

  //             this.props.messageDelete(checkFalse)
  //             let dataInfoWeb =  await Axios('get','/Api/listInfoWeb'); 
  //             let dataCrawler = await Axios('post','/Api/listCompany',dataCrawCompany);

  //             if(dataCrawler.data.success==true){
  //               localStorage.checkCrawDelete = true;
  //               let checkTrue = localStorage.getItem('checkCrawDelete');
  //               console.log(checkTrue);   
  //               this.props.messageDelete(checkTrue);
  //               alert('Bạn đã cào xong')
  //             }
  //         }
  //       })() 
  //   }

  onCrawlerDataWeb = () => {
    let dem = 0;
    (async () => {
      let data = {
        webinfoUrl: this.state.crawNameWebCategory
      }
      console.log(this.props.categorys);
      let resuftCategory = this.props.categorys.filter(category => {
        return category.pathUrl == this.state.newNameWebCategory
      })
      console.log(this.state.crawNameWebCategory);
      
      if (data.webinfoUrl == undefined) {
        alert('Bạn chưa nhập dữ liệu vào để cào')
      } else if (resuftCategory.length > 0) {
        alert('Dữ liệu bạn nhập vào đã tồn tại')
      } else if (this.props.addInputCrawler == false) {
        alert('Dữ liệu bạn nhập sai')
      } else {
        let today = new Date();
        let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;
        let dataCrawAppCompany = {
          webinfoUrl: this.state.newNameWebCategory
      }
        this.props.appActions.onCheckLoading();
        await this.props.appActions.actionCrawNameCategory(data, dateTime, this.props.addInputCrawler);
        console.log(this.props.checkDelete);
        
         setTimeout(() => {
           alert('Đang cào data')
          this.props.appActions.actionCrawAppCompany(dataCrawAppCompany,this.state.newNameWebCategory);
        },4000)
      }
    })()
  }
  onKeyPressData = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.onCrawlerDataWeb();
    }
  }
  onSubmitCrawlerData=()=>{
    this.onCrawlerDataWeb();
  }
  render() {
    if(this.props.onCheckLoading === false) {
      return <CircleLoading color="#485e74"/>
    }
    return (
      <div>
        <form >
          <label className='input-mr-5'>
            <input
              className="form-control"
              id="exampleInputPassword1"
              placeholder="http://online.gov.vn/"
              name="crawCategory"
              onChange={this.handleChangeAdd}
              onKeyPress={this.onKeyPressData}
            />
            <div 
                 className='btn primary' 
                 style={{ marginLeft: 10 + "px" }}
                 onClick={this.onSubmitCrawlerData}
            >
              Craw
            </div>
          </label>
        </form>
      </div>
    )
  }
}
const mapStateToprops = (state) => {
  return {
    addInputCrawler: state.inputCrawData,
    categorys: state.categorys,
    crawNameCategory: state.craw_name_category,
    crawListAppCompany: state.craw_list_app_company,
    isCheckLoading    : state.isCheckLoading,
    check_find_data_company : state.check_find_data_company,
    checkDelete : state.checkDelete
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
export default connect(mapStateToprops, mapDispathToprops)(InputCrawler);
