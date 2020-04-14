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
        console.log(props.checkFindData);

        if (props.check_find_data_company == false) {
            console.log(props.check_find_data_company);
             let abc   =    setInterval(() => {
                (async () => {
                    let data = props.categorys;
                    let catagoryId = data.length > 0 ? data[0]._id : undefined
                    console.log(catagoryId);
                    let findListAppCompany = await Axios('get', '/Api/listCompany/' + catagoryId);
                    //this.props.appActions.findListAppCompany(findListAppCompany.data);
                    if (findListAppCompany.data.length > 21) {
                        console.log("cccccccccccccccc");
                        
                        this.setState({
                            listAppCompanys: findListAppCompany.data
                        })
                        console.log("ddddddddddddddddddd");
                        
                        clearInterval(abc)
                        return 
                    }
                })()
            }, 2000)
        } else if (props.check_find_data_company == true) {
             console.log("dddddddddddddddddddddddddddddddddd");
            this.setState({
                listAppCompanys: props.listAppCompanys
            })

        }
    }
    componentDidMount() {
        // this.setState({
        //     isLoading: true
        // })
        setTimeout(() => {
            (async () => {
                let data = await Axios('get', '/Api/listInfoWeb/')
                let catagoryId = data.data.length > 0 ? data.data[0]._id : undefined
                let findListAppCompany = await Axios('get', '/Api/listCompany/' + catagoryId);
                this.props.appActions.findListAppCompany(findListAppCompany.data);
                // console.log(findListAppCompany.data);

                // this.setState({
                //     listAppCompanys: this.props.listAppCompanys
                // })
            })()
        }, 1000)
    }
    pageNumber = (event) => {
        // let button = event.target;
        // let page = 1;
        // if (button.closest('li.page-item') == null) {
        //     page = pageIndex;
        // } else {
        //     page = button.closest('li.page-item').querySelector('a.page-link').text;
        //     pageIndex = page;
        // }
        // (async () => {
        //     let data = await Axios('get', '/Api/listInfoWeb');
        // let dataIdWebInfo = this.props.fillWebInfoId ? this.props.fillWebInfoId : data.data[0]._id
        // // if(arr[0] != this.props.fillWebInfoId){
        // //     arr[0]=this.props.fillWebInfoId
        // //     this.state.showPage=1
        // // }
        // console.log(arr[0]);
        // console.log(this.state.showPage);
        // if (page == '>') {
        //     this.state.showPage++;
        //     let findListCompany = await Axios('get', '/Api/listCompany/' + dataIdWebInfo);
        //     console.log(findListCompany.data);
        //     this.setState({
        //         listCompany: findListCompany.data,
        //         showPage: this.state.showPage++
        //     })
        // } else if (page == '<') {
        //     console.log(this.state.showPage--);
        //     let findListCompany = await Axios('get', '/Api/listCompany/' + dataIdWebInfo);
        //     console.log(findListCompany.data);
        //     this.setState({
        //         listCompany: findListCompany.data,
        //         showPage: this.state.showPage--
        //     })
        // } else if (page == '>>') {
        //     let findListCompany = await Axios('get', '/Api/listCompany/' + dataIdWebInfo);
        //     // console.log(Math.ceil(findListCompany.data.length/20));  
        //     // Math.ceil(findListCompany.data.length/20);
        //     this.setState({
        //     listCompany: findListCompany.data,
        //     showPage: Math.ceil(findListCompany.data.length / 20)
        // })
        // } else if (page == '<<') {
        //     let findListCompany = await Axios('get', '/Api/listCompany/' + dataIdWebInfo);
        //     console.log(findListCompany.data);
        //     this.setState({
        //         listCompany: findListCompany.data,
        //         showPage: 1
        //     })
        // } else if (page == null) {
        //     console.log("cong tran");
        // } else {
        //         let findListCompany = await Axios('get', '/Api/listCompany/' + dataIdWebInfo);
        //         console.log(findListCompany.data);
        //         this.setState({
        //             listCompany: findListCompany.data,
        //             showPage: Number(page)
        //         })
        //     }
        // })()
    }

    onSearchData = (filter) => {
        (async () => {
            this.setState({
                isLoading: true
            })
            // let data = await Axios('get', '/Api/listInfoWeb/')
            // console.log(data);

            // let dataWebId = data.data.length > 0 ? data.data[0]._id : undefined
            // let idCompany = this.props.fillWebInfoId ? this.props.fillWebInfoId : dataWebId
            // console.log(this.props.idListCompany);

            // let findListCompany = await Axios('get', '/Api/listCompany/' + idCompany);
            // console.log(findListCompany.data);
            // let listCompanyName = findListCompany.data.filter((listcompany) => {
            //     return (listcompany.nameCompany) ? (listcompany.nameCompany).toLowerCase().indexOf(filter.toLowerCase()) != -1 : '';
            // })
            // let listCompanyTaxCode = findListCompany.data.filter((listcompany) => {
            //     return (listcompany.taxCode) ? (listcompany.taxCode).toLowerCase().indexOf(filter.toLowerCase()) != -1 : '';
            // })
            // let listCompanyAddress = findListCompany.data.filter((listcompany) => {
            //     return (listcompany.address) ? (listcompany.address).toLowerCase().indexOf(filter.toLowerCase()) != -1 : '';
            // })
            // let listCompanyTelePhone = findListCompany.data.filter((listcompany) => {
            //     return (listcompany.telePhone) ? (listcompany.telePhone).toLowerCase().indexOf(filter.toLowerCase()) != -1 : '';
            // })
            // let nameApp = findListCompany.data.filter((listcompany) => {
            //     return (listcompany.nameApp) ? (listcompany.nameApp).toLowerCase().indexOf(filter.toLowerCase()) != -1 : '';
            // })
            // let lengthMax = [listCompanyName, listCompanyTaxCode, listCompanyTelePhone, listCompanyAddress];
            // //listCompanyName.length !=0 ? listCompanyName : (listCompanyTaxCode != 0 ? listCompanyTaxCode : (listCompanyAddress !=0 ? listCompanyAddress : listCompanyTelePhone))
            // let listCompany = listCompanyName.length != 0 ? listCompanyName : nameApp != 0 ? nameApp : (listCompanyTaxCode != 0 ? listCompanyTaxCode : (listCompanyAddress != 0 ? listCompanyAddress : listCompanyTelePhone))
            // this.setState({
            //     listCompany: listCompany,
            //     isLoading: false
            // })
        })()
    }
    dataLink = (dataListUrl) => {
        (async () => {
            let findListCompany = await Axios('get', '/Api/listCompany/' + dataListUrl);
            this.setState({
                listCompany: findListCompany.data,
                redirect: true,
                dataListUrl
            })
        })()
        this.setState({
            isLoading: true
        })
    }
    handleChange = (event) => {
        console.log("tran van cong");

        if (event.target.checked == true) {
            storeDataDelete.push(event.target.value)
            console.log(storeDataDelete);
        } else {
            let deleteElement = event.target.value;
            let i = storeDataDelete.indexOf(deleteElement);
            if (i != -1) {
                storeDataDelete.splice(i, 1)
            }
        }
        this.setState({
            deleteCompany: storeDataDelete
        })
    }
    removeFomatterData = (cell, row) => {
        return (
            <input
                //id = {row._id}
                type="checkbox"
                name="check"
                value={row._id}
                checked={this.state.check}
                onChange={this.handleChange}
            />
        )
    }
    backHomePage = () => {
        this.setState({
            backHomePage: true
        })
    }
    render() {
        console.log(this.props.listAppCompanys);
        console.log(this.state.listAppCompanys);
        console.log(this.props.check_find_data_company);

        function priceFormatter(cell, row) {
            return (
                <a href={`https://${cell}`} target={`_blank`}>{cell}</a>
            );
        }
        const { SearchBar } = Search;
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
        let dataCsvOnepage = listAppCompanys.slice((this.state.showPage - 1) * 20, this.state.showPage * 20);
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
            clickToSelect: true,
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
                let dataReaload = this.props.fillCategoryId ? this.props.fillCategoryId : this.props.categorys[0]._id;
                let data = this.props.categorys.filter((dataCategory) => {
                    return dataCategory._id == dataReaload;
                })
                console.log(data[0].lastPage);
                let dataRealoadUrl = {
                    webinforId: data[0]._id,
                    lastPage: data[0].lastPage,
                    pathUrl: data[0].pathUrl
                }
                this.props.appActions.onRealoadCraw(dataRealoadUrl);
                // (async () => {
                //     let data = await Axios('get', '/Api/listInfoWeb/')
                //     if (data.data.length > 0) {
                //         let dataWebId = data.data[0]._id;
                //         let idWeb = {
                //             id: this.props.fillWebInfoId ? this.props.fillWebInfoId : dataWebId
                //         }
                //         console.log(idWeb.id);
                //         let lastPage = await Axios('post', '/Api/listInfoWeb/findId', idWeb);
                //         if (lastPage.data.length > 0) {
                //             if (lastPage.data[0].lastPage >= 0 || lastPage.data[0].lastPage != undefined) {
                //                 let data = {
                //                     webinforName: idWeb.id,
                //                     lastPage: lastPage.data[0].lastPage,
                //                     pathUrl: lastPage.data[0].pathUrl
                //                 }
                //                 console.log(data);
                //                 alert('Bạn đang cào lại')
                //                 localStorage.checkCrawDelete = false;
                //                 let checkFalse = localStorage.getItem('checkCrawDelete');
                //                 this.props.messageDelete(checkFalse)
                //                 let reloadCrawler = await Axios('post', '/Api/listCompany/crawlerContinue', data);
                //                 console.log(reloadCrawler.data);
                //                 if (reloadCrawler.data.success == true) {
                //                     localStorage.checkCrawDelete = true;
                //                     let checkTrue = localStorage.getItem('checkCrawDelete');
                //                     this.props.messageDelete(checkTrue);
                //                     alert('Bạn đã cào xong')
                //                 }
                //             } else {
                //                 alert('Dữ liệu đang được cào ')
                //             }
                //         }
                //     } else {
                //         alert('Không có dữ liệu cào')
                //     }
                // })()
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
                // console.log('Size per page change!!!');
                // console.log('Newest size per page:' + sizePerPage);
                // console.log('Newest page:' + page);
            },
            onPageChange: (page, sizePerPage) => {
                (async () => {
                    console.log(this.props.checkSdDatabase);
                    console.log(this.props.onCheckLoading);
                    if (this.props.categorys.length > 0) {
                        // if(this.props.onCheckLoading == false ){
                            let pagiCategoryId = this.props.fillCategoryId ? this.props.fillCategoryId : this.props.categorys[0]._id;
                            let findListAppCompany = await Axios('get', '/Api/listCompany/' + pagiCategoryId);
                            console.log(this.props.appActions);
                            
                            this.props.appActions.findListAppCompany(findListAppCompany.data);
                       // }
                    }
                })()
            },
            sizePerPage: 20,

        };
        return (
            <div className='container-fluid'>
                {isLoading ? <CircleLoading color='#0a1c2c'/> : undefined}
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
                                                        <SearchData onDataSearch={this.onSearchData} />
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
                                                    <div className='col-lg-3 pagi' onClick={this.pageNumber}>
                                                        {/* <PaginationListStandalone
                                                            {...paginationProps}
                                                        /> */}
                                                    </div>
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




    // constructor(props) {
    //     super(props);
    //     this.state = {
    //          selected: [0, 1] 
    //         };
    //   }

    //   handleBtnClick = () => {
    //     if (!this.state.selected.includes(2)) {
    //       this.setState(() => ({
    //         selected: [...this.state.selected, 2]
    //       }));
    //     } else {
    //       this.setState(() => ({
    //         selected: this.state.selected.filter(x => x !== 2)
    //       }));
    //     }
    //   }

    //   handleOnSelect = (row, isSelect) => {
    //     if (isSelect) {
    //       this.setState(() => ({
    //         selected: [...this.state.selected, row.id]
    //       }));
    //     } else {
    //       this.setState(() => ({
    //         selected: this.state.selected.filter(x => x !== row.id)
    //       }));
    //     }
    //   }

    //   handleOnSelectAll = (isSelect, rows) => {
    //     const ids = rows.map(r => r.id);
    //     if (isSelect) {
    //       this.setState(() => ({
    //         selected: ids
    //       }));
    //     } else {
    //       this.setState(() => ({
    //         selected: []
    //       }));
    //     }
    //   }

    //   render() {
    //     const columns = [{
    //         dataField: 'id',
    //         text: 'Product ID'
    //       }, {
    //         dataField: 'name',
    //         text: 'Product Name'
    //       }, {
    //         dataField: 'price',
    //         text: 'Product Price'
    //       }];
    //     const products =[{
    //         id : 1,
    //         name :"Trân Văn công",
    //         price : "50000k"
    //     }] 
    //     const selectRow = {
    //       mode: 'checkbox',
    //       clickToSelect: true,
    //       selected: this.state.selected,
    //       onSelect: this.handleOnSelect,
    //       onSelectAll: this.handleOnSelectAll
    //     };
    //     return (
    //       <div>
    //         <button className="btn btn-success" onClick={ this.handleBtnClick }>Select/UnSelect 3rd row</button>
    //         <BootstrapTable keyField="id" data={ products } columns={ columns } selectRow={ selectRow } />

    //       </div>
    //     );
    //   }
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
        onCheckLoading : state.onCheckLoading
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

