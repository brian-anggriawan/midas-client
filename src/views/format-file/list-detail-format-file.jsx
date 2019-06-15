import React from 'react';
import Baselistmmodal from 'layouts/list_modal';
import Tabel from 'layouts/tabel';
import {Button , Badge} from 'reactstrap';
import download from 'downloadjs';
import Loading from 'layouts/loading-modal';
import Scroll from 'simplebar-react';
import app from 'app';


class detailformat extends React.Component{
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

       let data = this.props.data.filter(res => res.ID_FORMAT === id)[0];
       let idfile = data.ID_FORMAT;
       let name = data.ORIGINAL_NAME;
      
       this.mode();

       let res = await fetch(app.proxy+'formatfile/download/'+idfile ,{
           method: 'get',
           headers: app.head2
       });

       if (res) {
        let blob = await res.blob();
    
        download(blob , name);
        this.mode();
        app.apiGet1('formatfile/delete',idfile)  

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
        return(
            <Baselistmmodal modal= {this.props.modal} mode ={this.props.mode} title ={'List Format Laporan'}>
                <Loading modal={this.state.modal} text={'Proses Download'}/>
                <Scroll>
                    <Tabel 
                        keyField ={'ID_FORMAT'}
                        data={this.props.data}
                        columns={[
                            {
                                dataField: 'TANGGAL_UPLOAD',
                                text: 'Tanggal Upload'
                            },
                            {
                                dataField: 'ORIGINAL_NAME',
                                text: 'File Name'
                            },
                            {
                                dataField: 'ACTIVE',
                                text: 'Status',
                                formatter: this.cekversion
                            },
                            {
                                dataField: 'ID_FORMAT',
                                text: 'Action',
                                formatter: this.action
                            },
                        ]}
                    
                    />
                </Scroll>                                                                
            </Baselistmmodal>
        )
    }
}


export default detailformat;