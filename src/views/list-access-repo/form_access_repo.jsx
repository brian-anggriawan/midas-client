import React from 'react';
import Baselistmmodal from 'layouts/list_modal.jsx';
import app from 'app';
import {BootstrapTable , TableHeaderColumn} from 'react-bootstrap-table';
import {Button} from 'reactstrap';

class formaccessrepo extends React.Component{

    action(cell, row, enumObject, rowIndex){
        return <Button color="primary" type="Button" onClick={()=> this.Save(cell ,row , rowIndex)} size="sm"> Pilih Repository</Button>
    }

    Save(cell , row , rowIndex){
        let id = this.props.repo[rowIndex].ID_REPO;
        let user = this.props.user

        app.apiPostJson('accessrepo',{
            idrepo: id,
            iduser: user
        })
        .then(res =>{
            if (res) {
                this.props.mode();
                this.props.test();
            }
        })
    }

    render(){
        return(
            <Baselistmmodal modal={this.props.modal} mode={this.props.mode} title={'Tambah Access Repository'}>
                <BootstrapTable
                    bordered={false}
                    striped
                    data={this.props.repo}
                    pagination={true}
                    options= {app.optionTable}
                    >
                    <TableHeaderColumn
                        dataField='REPOSITORY'
                        width='16%'
                        isKey = {true}
                        dataSort>
                        Repository
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField='KETERANGAN'
                        width='16%'
                        dataSort>
                        Keterangan
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField='JENIS_REPO'
                        width='16%'
                        dataSort>
                        Jenis Repo
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataFormat={this.action.bind(this)}
                        width='16%'
                        dataSort>
                        Action
                    </TableHeaderColumn>
                </BootstrapTable>
            </Baselistmmodal>
        )
    }
}

export default formaccessrepo;