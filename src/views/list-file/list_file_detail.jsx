import React from 'react';
import Baselistmmodal from 'layouts/list_modal.jsx';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Button} from 'reactstrap';
import download from 'downloadjs';
import app from 'app';


class listfiledetail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    action(cell, row, enumObject, rowIndex){
        return(
            <>
                <Button type="button" size="sm" onClick={() => this.Downloadfile(cell, row, rowIndex)} outline color="success">Download</Button>
            </>
        )
    }

    async Downloadfile(cell, row, rowIndex){
        let id = this.props.data[rowIndex].VCIDFILE;
        let name = this.props.data[rowIndex].VCORIGINALNAME;

       let res = await fetch(app.proxy+'downloadfile/'+id ,{
           method: 'get',
           headers: app.head2
       });
       let blob = await res.blob();
    
       download(blob , name);

    }



    render(){

        const options = {
            sizePerPage: 10,
            hideSizePerPage: true,
            prePage: 'Back',
            nextPage: 'Next',
          };
        return(
            <Baselistmmodal modal = {this.props.modal} mode = {this.props.mode} title ={'List Detail File'}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="content">
                            <BootstrapTable
                                data={this.props.data}
                                bordered={false}
                                striped
                                pagination={true}
                                options={options}>
                                <TableHeaderColumn
                                    dataField='DTPERIOD'
                                    width='16%'
                                    dataSort>
                                    Periode
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField='DTUPLOAD'
                                    width='16%'
                                    isKey = {true}
                                    dataSort>
                                    Tanggal Upload
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField='REPO'
                                    width='16%'
                                    dataSort>
                                    Kategori
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField='VCORIGINALNAME'
                                    width='16%'
                                    dataSort>
                                    File Name
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataFormat={this.action.bind(this)}
                                    width='16'>
                                    Action
                                </TableHeaderColumn>
                            </BootstrapTable>
                            </div>
                        </div>
                    </div>
                </div>  
            </Baselistmmodal>
        )
    }
}


export default listfiledetail;