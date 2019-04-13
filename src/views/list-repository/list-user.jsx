import React from 'react';
import Basemodal from 'layouts/list_modal'
import {BootstrapTable , TableHeaderColumn} from 'react-bootstrap-table';
import app from 'app';



class listUser extends React.Component{


    render(){
        return(
            <Basemodal modal={this.props.modal} mode={this.props.mode} title={this.props.title}>
            <BootstrapTable
               bordered={false}
               data={this.props.data}
               striped
               pagination={true}
               options={app.optionTable}>
                 <TableHeaderColumn
                   dataField='USERNAME'
                   width='20%'
                   isKey = {true}
                   dataSort>
                   Nama User
                 </TableHeaderColumn>
                 <TableHeaderColumn
                   dataField='SBU'
                   width='20%'
                   dataSort>
                   SBU
                 </TableHeaderColumn>
                 <TableHeaderColumn
                   dataField='DIVISION'
                   width='20%'
                   dataSort>
                   Divisi
                 </TableHeaderColumn>
                </BootstrapTable>
            </Basemodal>
        )
    }
}


export default listUser;