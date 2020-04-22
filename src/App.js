import React, { Component } from 'react';
import SearchData from './components/search'
import BootstrapTable from 'react-bootstrap-table-next';
import { confirmAlert } from 'react-confirm-alert';
import { Redirect, Link } from "react-router-dom";
import { CircleLoading } from 'react-loadingg';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import './App.css';
import { CSVLink } from 'react-csv';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import { Axios } from './Utils/Axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../src/actions/index'
import 'react-confirm-alert/src/react-confirm-alert.css'
let tam = 0;
let demInterval = 0;
let today = new Date();
    let  date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    let  time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
   let dateTime = date+' '+time;
let storeDataDelete = [];
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listCompany: [],
            showPage: 1,
            searchData: '',
            isExportCsv: false,
            dataCsvOnepage: [],
            selected: [],
            listAppCompanys: []
        };
    }
    componentWillReceiveProps(props) {
        console.log(props.isResultCraw);
        
        if (props.isResultCraw == false) {
            console.log(demInterval);
            // if(demInterval==0){
                console.log("vdhfbvjdfbv");
                
                let stop   =    setInterval(() => {
                    console.log("abc");
                   (async () => {
                     //  let a = await Axios('get', '/Api/listInfoWeb');
                       let data = await Axios('get', '/Api/listInfoWeb');
                       console.log(data.data[0]);
                       
                       let catagoryId = data.data.length > 0 ? data.data[0]._id : undefined
                       console.log(catagoryId);
                       let findListAppCompany = await Axios('get', '/Api/listCompany/' + catagoryId);
                       console.log(findListAppCompany.data);
                       //this.props.appActions.findListAppCompany(findListAppCompany.data);
                       if (findListAppCompany.data.length > 20) {
                           this.setState({
                               listAppCompanys: findListAppCompany.data
                           })
                           console.log("ddddddddddddddddddd");
                           demInterval = 1;
                           clearInterval(stop)
                       }
                   })()
               }, 1000)
           // }
        } else if (props.isResultCraw == true) {
            console.log('abcd');
            
            this.setState({
                listAppCompanys: props.listAppCompanys
            })
        }
    }
    componentDidMount() {
            (async () => {
                this.setState({
                    firstPageLoad : false
                })
                let data = await Axios('get', '/Api/listInfoWeb/')
                let catagoryId = data.data.length > 0 ? data.data[0]._id : undefined
                let findListAppCompany = await Axios('get', '/Api/listCompany/' + catagoryId);
                this.props.appActions.findListAppCompany(findListAppCompany.data);
                this.setState({
                    firstPageLoad : true
                })
            })()
        // }, 1000)
    }
    backHomePage = () => {
        this.setState({
            backHomePage: true
        })
    }
    render() {
        // if(this.state.firstPageLoad == false) return <CircleLoading color="#ffc107"/>;
        console.log(this.props.listAppCompanys);
        console.log(this.state.listAppCompanys);
        console.log(this.props.check_find_data_company);

        function priceFormatter(cell, row) {
            return (
                <a href={`https://${cell}`} target={`_blank`}>{cell}</a>
            );
        }
        // const { SearchBar } = Search;
        const headerSortingStyle = { backgroundColor: '#e3edf8' };
        const { listCompany, redirect = false, searchData, isLoading = false, dataListUrl = '', backHomePage = false } = this.state;
        console.log(listCompany);
        let { listAppCompanys } = this.props;
        console.log(listAppCompanys);
        console.log(this.state.listAppCompanys);

        let dataListAppCompanys = this.props.listAppCompanys.length > 0 ? this.props.listAppCompanys : this.state.listAppCompanys;
        console.log(dataListAppCompanys);
        let dataListCompany = dataListAppCompanys.map((listCompanys, index) => {
            return (
                { stt: index + 1, ...listCompanys }
            )
        })
        console.log(this.state.sizePage);
        console.log(this.state.sizePerPage);
        let sizePerPage = this.state.sizePerPage ? this.state.sizePerPage : 25
        let dataCsvOnepage = listAppCompanys.slice((this.state.sizePage - 1) * sizePerPage, this.state.sizePage * sizePerPage);
        let datafield = dataListCompany[0] ? dataListCompany[0].nameApp ? 'nameApp' : 'domainName' : '';
        let columns = [
            {
                dataField: 'stt',
                text: 'STT',
                sort: true,
                headerSortingStyle,
                headerAlign: 'center',
                headerStyle: { width: '50px' },
                align: 'center'
            },
            {
                dataField: datafield,
                text: datafield == 'nameApp' ? 'Tên Ứng Dụng' : 'Tên miền chính',
                sort: true,
                headerSortingStyle,
                headerAlign: 'center',
                headerStyle: { width: '150px' },
                formatter: datafield == 'nameApp' ? undefined : priceFormatter,
                align: 'center'
            },
            // dataListCompany[0] ? dataListCompany[0].nameApp ?  {
            //     dataField: 'nameCity',
            //     text: 'Tên thành phố',
            //     sort: true,
            //     headerSortingStyle,
            //     headerStyle: { minWidth: '150px' },
            //     headerAlign: 'center',
            //     align: 'center',
            // } : {
            //     dataField: 'subdomainName',
            //     text: 'Tên Miền Phụ',
            //     sort: true,
            //     headerSortingStyle,
            //     headerAlign: 'center',
            //     headerStyle: { maxWidth: '150px'},
            //     align: 'center'
            // } : {
            //     dataField: 'subdomainName',
            //     text: 'Tên Miền Phụ',
            //     sort: true,
            //     headerSortingStyle,
            //     headerAlign: 'center',
            //     headerStyle: { width: '150px'},
            //     align: 'center'
            // }
            // , 
            {
                dataField: 'nameCompany',
                text: 'Tên công ty',
                sort: true,
                headerSortingStyle,
                headerStyle: { minWidth: '150px' },
                headerAlign: 'center',
                align: 'center',
            }, {
                dataField: 'taxCode',
                text: 'Mã số thuế',
                sort: true,
                headerSortingStyle,
                headerAlign: 'center',
                headerStyle: { minWidth: '150px' },
                align: 'center'
            }, {
                dataField: 'address',
                text: 'Địa chỉ',
                sort: true,
                headerSortingStyle,
                headerAlign: 'center',
                headerStyle: { minWidth: '250px' },
                align: 'center'
            }, {
                dataField: 'telePhone',
                text: 'Số điện thoại',
                sort: true,
                headerSortingStyle,
                headerAlign: 'center',
                align: 'center',
            }
        ];
        const defaultSorted = [{
            dataField: '_id',
            order: 'asc'
        }];

        const MyExportCSV = () => {
            return (
                <div className="btn-group">
                    <i
                        className="btn primary dropdown-toggle fas fa-file-csv"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false">
                    </i>
                    <div className="dropdown-menu">
                        {
                            <CSVLink data={listAppCompanys} filename={'CrawlerData_'+dateTime+'.csv'}>
                                <p className="dropdown-item">Export CSV All</p>
                            </CSVLink>
                        }
                        {
                            <CSVLink data={dataCsvOnepage} filename={'CrawlerData_'+dateTime+'.csv'}>
                                <p className="dropdown-item">Export CSV One Page</p>
                            </CSVLink>
                        }
                    </div>
                </div>
            );
        };
        const selectRow = {
            mode: 'checkbox',
            clickToSelect: false,
            selected: this.state.selected,
            onSelect: (row, isSelect, rowIndex, e) => {
                if (isSelect == true) {
                    storeDataDelete.push(row._id)
                } else {
                    let i = storeDataDelete.indexOf(row._id);
                    if (i != -1) {
                        storeDataDelete.splice(i, 1)
                    }
                }
            },
            onSelectAll: (isSelect, rows, e) => {
                if (isSelect == true) {
                    storeDataDelete = []
                    let abc = rows.map((a, index) => {
                        return a._id
                    })
                    storeDataDelete = abc
                } else {
                    storeDataDelete = [];
                }
            }
        };
        const CrawlerData = () => {
            const crawlerUpdateData = async () => {
                let dataInfoCategory = await Axios('get', '/Api/listInfoWeb');
                let dataReaload = this.props.fillCategoryId ? this.props.fillCategoryId : this.props.categorys[0]._id;
                let data = dataInfoCategory.data.filter((dataCategory) => {
                    return dataCategory._id == dataReaload;
                })
                console.log(this.props.categorys);
                
                console.log(data);
                if(this.props.categorys.length==1){
                    let dataRealoadUrl = {
                        webinforId: this.props.categorys[0]._id,
                        lastPage: this.props.categorys[0].lastPage,
                        pathUrl: this.props.categorys[0].pathUrl
                    }
                    this.props.appActions.onRealoadCraw(dataRealoadUrl);
                }else{
                    let dataRealoadUrl = {
                        webinforId: data[0]._id,
                        lastPage: data[0].lastPage,
                        pathUrl: data[0].pathUrl
                    }
                    this.props.appActions.onRealoadCraw(dataRealoadUrl);
                }
            }
            return (
                <i
                    className="btn btn-warning crawler-button fas fa-sync"
                    onClick={crawlerUpdateData}
                ></i>
            )
        }
        const DeleteData = () => {
            const deleteDataCompany = () => {
                if (storeDataDelete.length > 0) {
                    confirmAlert({
                        title: 'Message',
                        message: 'Bạn có muốn xóa không !? ',
                        buttons: [
                            {
                                label: 'Yes',
                                onClick: () => {
                                    (async () => {
                                        try {
                                            console.log("cong dep trai");

                                            let dataDelete = {
                                                arrayId: storeDataDelete
                                            }
                                            let CategoryId = this.props.fillCategoryId ? this.props.fillCategoryId : this.props.categorys[0]._id;
                                            console.log(CategoryId);
                                            console.log(dataDelete);
                                            this.props.appActions.deleteAppCompany(dataDelete, CategoryId);
                                        } catch (err) {
                                            //     console.log(err);
                                        }
                                    })()
                                }
                            },
                            {
                                label: 'Cancel',
                            }
                        ]
                    })
                } else {
                    alert('Bạn Chưa chọn mục cần xóa ')
                }
            }
            return (
                <i
                    className="btn btn-danger crawler-button fas fa-trash-alt"
                    onClick={deleteDataCompany}
                ></i>
            )
        }
        const options = {
            onSizePerPageChange: (sizePerPage, page) => {
                console.log(sizePerPage);
                this.setState({
                    sizePerPage:sizePerPage,
                    sizePage:page
                })
                
                
            },
            onPageChange: (page, sizePerPage) => {
                (async () => {
                    this.setState({
                        sizePerPage:sizePerPage,
                        sizePage:page
                    })
                    console.log(this.props.checkSdDatabase);
                    console.log(this.props.onCheckLoading);
                    console.log(this.props.isResultCraw);
                    
                    if (this.props.categorys.length > 0) {
                         if(this.props.isResultCraw == false ){
                            
                             
                            let pagiCategoryId = this.props.fillCategoryId ? this.props.fillCategoryId : this.props.categorys[0]._id;
                            let findListAppCompany = await Axios('get', '/Api/listCompany/' + pagiCategoryId);
                            console.log(this.props.appActions); 
                            this.props.appActions.findListAppCompany(findListAppCompany.data);
                         }
                    }
                })()
            },
            sizePerPage: 25,

        };
        return (
            <div className='container-fluid'>
                {isLoading ? <CircleLoading color='#0a1c2c'/> : undefined}
                {this.state.firstPageLoad == false ? <CircleLoading color="#ffc107"/> : ''}
                <PaginationProvider
                    pagination={paginationFactory(
                        options)}
                    keyField='_id'
                    columns={columns}
                    data={dataListCompany}
                >
                    {
                        ({ paginationProps, paginationTableProps }) => (
                            <ToolkitProvider
                                keyField='_id'
                                columns={columns}
                                data={dataListCompany}
                                search
                                exportCSV={{
                                    fileName: 'productList.csv',
                                    onlyExportSelection: true,
                                    exportAll: true,
                                    ignoreHeader: true,
                                    noAutoBOM: false
                                }}
                            >
                                {
                                    toolkitprops => (
                                        <div>
                                            <br />
                                            <br />
                                            <div className="right-floating-section">
                                                <div className='flex-app'>
                                                    <div className='spaceMr'>
                                                        <div className="right-floating-subsection">
                                                            <MyExportCSV/>
                                                        </div>
                                                    </div>
                                                    <div className='spaceMr'>
                                                        <div className="right-floating-subsection">
                                                            <CrawlerData />
                                                        </div>
                                                    </div>
                                                    <div className='spaceMr'>
                                                        <div className="right-floating-subsection">
                                                            <DeleteData />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='app-Search'>
                                                    <div className="right-floating-subsection sizeWidth">
                                                        <SearchData/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <BootstrapTable
                                                    {...toolkitprops.baseProps}
                                                    {...paginationTableProps}
                                                    keyField='stt'
                                                    selectRow={selectRow}
                                                    columns={columns}
                                                    defaultSorted={defaultSorted}
                                                    defaultSortDirection="asc"
                                                    hover
                                                    condensed
                                                    noDataIndication="No Data Is Available"
                                                />
                                                <div className='row'>
                                                    <div className='col-lg-6'>
                                                        {/* <SizePerPageDropdownStandalone
                                                            {...paginationProps}
                                                        /> */}
                                                    </div>
                                                    {/* <div className='col-lg-3 pagi' onClick={this.pageNumber}>
                                                        <PaginationListStandalone
                                                            {...paginationProps}
                                                        />
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </ToolkitProvider>
                        )
                    }
                </PaginationProvider>
            </div>
        )
    }
}
const mapStateToprops = (state) => {
    console.log(state);
    return {
        listAppCompanys: state.listAppCompanys,
        categorys: state.categorys,
        check_find_data_company: state.check_find_data_company,
        fillCategoryId: state.fillCategoryId,
        checkDelete: state.checkDelete,
        checkSdDatabase :state.checkSdDatabase,
        onCheckLoading : state.onCheckLoading,
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
export default connect(mapStateToprops, mapDispathToprops)(App);

