import React from 'react';
import Baselistmmodal from 'layouts/list_modal';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Button } from 'reactstrap';
import download from 'downloadjs';
import Loading from 'layouts/loading-modal';
import Scroll from 'simplebar-react';
import app from 'app';


class listlaporandetail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            modal: false
        }
    }

    action =(id)=>{
        return(
            <>
                <Button type="button" size="sm" onClick={() => this.Downloadfile(id)} outline color="success">Download</Button>
            </>
        )
    }

    mode =()=>{
        this.setState({
            modal: !this.state.modal
        })
    }

    async Downloadfile(id){
       let data = this.props.data.filter(res => res.ID_FILE === id)[0];
       let idfile = data.ID_FILE;
       let name = data.ORIGINAL_NAME;
       
       this.mode();

       let res = await fetch(app.proxy+'downloadfile/'+idfile ,{
           method: 'get',
           headers: app.head2
       });

       if (res) {
        let blob = await res.blob();
    
        download(blob , name);
        this.mode();
        app.apiGet1('deletefile',idfile)  

       }
    }

    render(){

        const options = {
            sizePerPage: 10,
            hideSizePerPage: true,
            prePage: 'Back',
            nextPage: 'Next',
          };
        return(
            <Baselistmmodal modal= {this.props.modal} mode ={this.props.mode} title ={'List Detail'}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="content table-responsive">
                            <Loading modal={this.state.modal} text={'Proses Download'}/>
                            <Scroll>
                                {
                                    this.props.flag === 1 ?
                                        <BootstrapTable
                                        data={this.props.data}
                                        bordered={false}
                                        striped
                                        pagination={true}
                                        options={options}>
                                        <TableHeaderColumn
                                            dataField='TEMPLATE'
                                            width='25%'
                                            isKey = {true}
                                            dataSort>
                                            Periode
                                        </TableHeaderColumn>
                                        <TableHeaderColumn
                                            dataField='LAST_UPLOAD'
                                            width='25%'
                                            dataSort>
                                            Last Upload
                                        </TableHeaderColumn>
                                        <TableHeaderColumn
                                            dataField='JUMLAH_REVISI'
                                            width='25%'
                                            dataSort>
                                            Jumlah Revisi
                                        </TableHeaderColumn>
                                        <TableHeaderColumn
                                            dataField='ID_FILE'
                                            dataFormat={this.action}
                                            width='25%'>
                                            Action
                                        </TableHeaderColumn>
                                    </BootstrapTable>
                                    :

                                    <BootstrapTable
                                    data={this.props.data}
                                    bordered={false}
                                    striped
                                    pagination={true}
                                    options={options}>
                                    <TableHeaderColumn
                                        dataField='REPO'
                                        width='50%'
                                        dataSort>
                                        Laporan
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField='TEMPLATE'
                                        width='50%'
                                        isKey = {true}
                                        dataSort>
                                        Periode
                                    </TableHeaderColumn>
                                </BootstrapTable>
                                }
                                
                            </Scroll>
                            </div>
                        </div>
                    </div>
                </div>  
            </Baselistmmodal>
        )
    }
}


export default listlaporandetail;