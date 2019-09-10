import React, { Component } from 'react';
import Baselistmmodal from 'layouts/list_modal';
import {Button } from 'reactstrap';
import download from 'downloadjs';
import Loading from 'layouts/loading-modal';
import Scroll from 'simplebar-react';
import Tabel from 'layouts/tabel'
import app from 'app';

export default class listfiledetail extends Component {
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

    render() {
        let { modal , mode , data} = this.props;
        return (
            <Baselistmmodal modal= {modal} mode ={mode} title ={'List Detail'}>
                <Loading modal={this.state.modal} text={'Proses Download'}/>
                <Scroll>
                    <Tabel 
                        data={data}
                        keyField={'ID_FILE'}
                        columns={[
                            {
                                dataField:'TEMPLATE',
                                text: 'Periode'
                            },
                            {
                                dataField: 'LAST_UPLOAD',
                                text:'Last Upload'
                            },
                            {
                                dataField:'JUMLAH_REVISI',
                                text: 'Jumlah Revisi'
                            },
                            {
                                dataField:'ID_FILE',
                                text:'Action',
                                formatter: this.action
                            }
                        ]}
                                            
                    />
                </Scroll>
            </Baselistmmodal>
        )
    }
}
