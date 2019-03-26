import React from 'react';
import Baselistmmodal from 'layouts/list_modal.jsx';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


class listfiledetail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            
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
                                    dataField='DTUPLOAD'
                                    width='16%'
                                    isKey = {true}
                                    dataSort>
                                    Tanggal Upload
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField='KATEGORI'
                                    width='16%'
                                    dataSort>
                                    Kategori
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField='COUNTFILE'
                                    width='16%'
                                    dataSort>
                                    File Name
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField='COUNTFILE'
                                    width='16%'
                                    dataSort>
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