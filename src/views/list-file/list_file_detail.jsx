import React from 'react';
import Baselistmmodal from 'layouts/list_modal.jsx';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Button , Badge} from 'reactstrap';
import download from 'downloadjs';
import Loading from 'layouts/loading-modal';
import app from 'app';


class listfiledetail extends React.Component{
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

    cekversion =(id)=>{
        if (id === 1) {
            return <Badge color="success">File Terbaru</Badge> 
        }else{
            return <Badge color="danger">File Lama</Badge> 
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
            <Baselistmmodal modal= {this.props.modal} mode ={this.props.mode} title ={'List Detail File'}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="content">
                            <Loading modal={this.state.modal} text={'Proses Download'}/>
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
                                    dataField='FILE_DESCRIPTION'
                                    width='16%'
                                    dataSort>
                                    Description
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField='ORIGINAL_NAME'
                                    width='16%'
                                    dataSort>
                                    Original File Name
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField='USER'
                                    width='16%'
                                    dataSort>
                                    User Upload
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField='ACTIVE'
                                    dataFormat={this.cekversion}
                                    width='16%'
                                    dataSort>
                                    Status
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField='ID_FILE'
                                    dataFormat={this.action}
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