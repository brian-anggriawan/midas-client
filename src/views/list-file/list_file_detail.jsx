import React from 'react';
import Baselistmmodal from 'layouts/list_modal';
import Tabel from 'layouts/tabel';
import {Button , Badge} from 'reactstrap';
import download from 'downloadjs';
import Loading from 'layouts/loading-modal';
import Scroll from 'simplebar-react';
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
        return(
            <Baselistmmodal modal= {this.props.modal} mode ={this.props.mode} title ={'List Detail File'}>
               
                            <Loading modal={this.state.modal} text={'Proses Download'}/>
                            <Scroll>
                                <Tabel 
                                    keyField={'ID_FILE'}
                                    data={this.props.data}
                                    columns={[
                                        {
                                            dataField:'DTUPLOAD',
                                            text:'Tanggal Upload'
                                        },
                                        {
                                            dataField:'FILE_DESCRIPTION',
                                            text:'Description'
                                        },
                                        {
                                            dataField:'ORIGINAL_NAME',
                                            text:'File Name'
                                        },
                                        {
                                            dataField:'USER',
                                            text:'User Upload'
                                        },
                                        {
                                            dataField:'ACTIVE',
                                            text:'Status',
                                            formatter: this.cekversion
                                        },
                                        {
                                            dataField:'ID_FILE',
                                            text:'Action',
                                            formatter: this.action
                                        }
                                    ]}

                                    width={{width:'300px'}}
                                
                                />
                            </Scroll>
                            
            </Baselistmmodal>
        )
    }
}


export default listfiledetail;