import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions/index'
import { Axios } from '../Utils/Axios';
class popupCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCategory: []
        };
    }
    onCancleCloseForm = () => {
        // (async () => {
        //     let dataInfoWeb = await Axios('get', '/Api/listInfoWeb');
        //     this.props.dataWebInfo(dataInfoWeb);
        //     this.props.checkDeletePopup(true);
        //     this.props.onCloseForm();
        // })()
        // this.props.onCloseForm();
        this.props.appActions.onEffectProject(false);
    }

    componentWillReceiveProps(props) {
        // console.log(props.dataWebInfo);
        // if (props.nameWebInfoCategory.length > 0) {
        //     this.setState({
        //         dataCategory: props.nameWebInfoCategory
        //     })
        // }
    }
    componentDidMount() {
        (async () => {
            try {
                let dataCategory = await Axios('get', '/Api/listInfoWeb');
                console.log(dataCategory.data);
                this.setState({
                    dataCategory: dataCategory.data
                })
            } catch (err) {
                console.log(err);
            }
        })()
    }
    render() {
        const removeFomatterData = (cell, row) => {
            const onDeleteCategory = () => {
                let dataIdCategory = [];
                let {categorys}=this.props;
                console.log(categorys[0].pathUrl);
                console.log(categorys[0]._id);
                dataIdCategory.push(row._id)
                confirmAlert({
                    title: 'Message',
                    message: 'Bạn có muốn xóa không ? ',
                    buttons: [
                        {
                            label: 'Yes',
                            onClick: () => {
                               
                                    let data = {
                                        deleteNameWeb: dataIdCategory
                                    }
                                    this.props.appActions.onDeleteCategory(data)
                                    if(this.props.categorys.length == 1){
                                        this.props.appActions.onEffectProject(false);
                                    }
                                    // let allDataCategory = await Axios('get', '/Api/listInfoWeb');
                                    // console.log(allDataCategory.data.length);  
                                    // if(allDataCategory.data.length == 0){
                                    //     this.props.appActions.onEffectProject(false);
                                    // }
                            }
                        },
                        {
                            label: 'Cancel',
                        }
                    ]
                })
            }
            return (
                <div className='category-UD'>
                    <div className='category-update-delete' key={row._id}>
                        {/* <i className="fas fa-edit i1"></i> */}
                        <i className="fas fa-trash-alt i2" onClick={onDeleteCategory}></i>
                    </div>
                </div>
            )
        }
        console.log(this.state.dataUpdateCategory);
        let { categorys } = this.props;
        let dataCategorys = (categorys).map((category, index) => {
            return (
                { stt: index + 1, ...category }
            )
        })
        const columns = [{
            dataField: 'stt',
            text: 'stt',
            headerAlign: 'center',
            align: 'center',
            editable: (cell, row, rowIndex, colIndex) => {
                return false
            }
        }, {
            dataField: 'nameWeb',
            text: 'Tên danh mục ',
            headerAlign: 'center',
            align: 'center',
            // editable: (cell, row, rowIndex, colIndex) => {
            //     return false
            // }
            // formatter: updateFomatterData

        }, {
            dataField: "databasePkey",
            text: "",
            headerAlign: 'center',
            align: 'center',
            headerStyle: { width: '50px' },
            formatter: removeFomatterData,
            editable: (cell, row, rowIndex, colIndex) => {
                return false
            }
        }
            //   {
            //     dataField: "databasePkey",
            //     text: "Remove",
            //     headerAlign: 'center',
            //     align: 'center',
            //     headerStyle: { width: '250px' },
            //     formatter : this.removeFomatterData

            //   }
        ];
        const editOptions =
        {
            mode: 'click',
            afterSaveCell: (oldValue, newValue, row, column) => {
                (async () => {
                    let data = {
                        _id: row._id,
                        nameWeb: row.nameWeb
                    }
                    this.props.appActions.onUpdateCategory(data)
                })()
            },
            onStartEdit: (row, column, rowIndex, columnIndex) => {


                (async () => {
                    console.log("tran van cong");

                    // let data = {
                    //     _id: row._id,
                    //     nameWeb: row.nameWeb
                    // }
                    // await Axios('put', '/Api/listInfoWeb', data);
                    // let dataInfoWeb = await Axios('get', '/Api/listInfoWeb');
                    // console.log(dataInfoWeb.data);


                    // this.setState({
                    //     dataCategoryUpdate: dataInfoWeb.data
                    // })
                    // // row.nameWeb=newValue
                    // this.props.dataWebInfo(dataInfoWeb)
                    // // row.nameWeb=newValue
                })()

            }
        };
        console.log(this.state.dataCategoryUpdate);

        return (
                 <div style={{ display: this.props.onEffectProject == true ? ' ' : 'none' }} className ='setSize'>
                <BootstrapTable
                    keyField="_id"
                    data={dataCategorys}
                    columns={columns}
                    cellEdit={cellEditFactory(editOptions)}

                />
                <div className='cancelPageCategory' onClick={this.onCancleCloseForm}>
                    <i className="fas fa-sign-out-alt">
                        &nbsp;&nbsp;Trở về
                     </i>
                </div>
            </div>
        )
    }
}
const mapStateToprops = (state) => {
    console.log(state);
    return {
        categorys: state.categorys,
        fillCategoryId: state.fillCategoryId,
        onEffectProject: state.onEffectProject
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
export default connect(mapStateToprops, mapDispathToprops)(popupCategory);