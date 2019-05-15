import React from 'react';
import Baselistmmodal from 'layouts/list_modal';
import app from 'app';
import {BootstrapTable , TableHeaderColumn} from 'react-bootstrap-table';
import {Button} from 'reactstrap';
import Scroll from 'simplebar-react';

class formaccessrepo extends React.Component{
    constructor(){
        super()
        this.state ={
            dataSelect : []
        }
    }

    action=(idrepo)=>{
        return <Button color="primary" type="Button" onClick={()=> this.Save(idrepo)} size="sm"> Pilih Repository</Button>
    }

    Save(idrepo){
        let user = this.props.user

        app.apiPostJson('accessrepo',{
            idrepo: idrepo,
            iduser: user
        })
        .then(res =>{
            if (res) {
                this.props.mode();
                this.props.test();
            }
        })
    }

    test = (e) =>{
        this.state.dataSelect.push({
            idrepo: e.ID_REPO,
            iduser: this.props.user
        })
    }

    proses = () =>{
        let data = this.state.dataSelect;
        let count = this.state.dataSelect.length;
        
        for(let i  = 0 ; i < count; i++){
            app.apiPostJson('accessrepo' ,{
                idrepo: data[i].idrepo,
                iduser: data[i].iduser
            })
        }
        this.setState({
            dataSelect:[]
        })

        this.props.test();
        this.props.mode();
            
           
    }

    render(){
        let selectRowProp ={
            mode: "checkbox",
            clickToSelect: true,
            bgColor: "rgb(238, 193, 213)",
            onSelect: this.test
        }
        return(
            <Baselistmmodal modal={this.props.modal} mode={this.props.mode} title={'Tambah Access Repository'}>
            <Button type='button' color='success' onClick={this.proses}> Save Multiple </Button>
                <Scroll>
                    <BootstrapTable
                        bordered={false}
                        striped
                        search
                        data={this.props.repo}
                        pagination={true}
                        options= {app.optionTable}
                        selectRow={selectRowProp}
                        id='table'
                        >
                        <TableHeaderColumn
                            dataField='REPOSITORY'
                            width='25%'
                            isKey = {true}
                            dataSort>
                            Repository
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField='KETERANGAN'
                            width='25%'
                            dataSort>
                            Keterangan
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField='JENIS_REPO'
                            width='25%'
                            dataSort>
                            Jenis Repo
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField='ID_REPO'
                            dataFormat={this.action}
                            width='25%'
                            dataSort>
                            Action
                        </TableHeaderColumn>
                    </BootstrapTable>
                </Scroll>
            </Baselistmmodal>
        )
    }
}

export default formaccessrepo;