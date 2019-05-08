import React from 'react';
import Pageadmin from 'layouts/page-admin';
import { Row , Col , Card , CardTitle , CardText , Button ,Input}  from 'reactstrap'; 
import Scroll from 'simplebar-react';
import Detail from './list-detail-format-file';
import app from 'app.js';


class Formatfile extends React.Component{
    constructor(){
        super()
        this.state = {
            laporan: [],
            idrepo:'',
            modal: false,
            detail: []
        }
    }

    componentWillMount(){
        let id = JSON.parse(localStorage.getItem('user'))[0].IDLOGIN;    
        app.apiGet1('formatfile' , id )
           .then(res =>{
               this.setState({
                   laporan: res
               })
           })
    }

    mode =()=>{
        this.setState({
            modal: !this.state.modal
        })
    }

    Listdetail =  async (id) =>{
        let data = await app.apiGet1('formatfile/detail' , id);
        this.setState({
            detail: data
        })

        this.mode();
    }

    Clickupload = (id)=>{
        document.getElementById('file').click();
        this.setState({
            idrepo: id
        })
    }

    upload = () =>{
        let files = document.getElementById('file').files;

        let reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = ()=>{

              let formData = new FormData();

              formData.append('name' , files[0].name);
              formData.append('files' , files[0]);
              formData.append('blob' , reader.result);
              formData.append('idrepo' , this.state.idrepo);
              formData.append('iduser' ,app.dataUser[0].IDLOGIN);

              app.apiUpdate('formatfile' , { idrepo: this.state.idrepo})
                 .then((res)=>{
                    if (res) {
                        app.apiPostFormdata('formatfile' , formData)
                            .then(res =>{
                                if (res) {
                                    app.msgok('Berhasil Di Upload' , '/admin/format-file')
                                }
                            })  
                     }
                 })
            } 
    }


    render(){
        return(
            <Pageadmin head={'Format File'}>
            <Detail data={this.state.detail} mode={this.mode} modal={this.state.modal}/>
            <Scroll style={{height: '700px'}}>
                <Row >  
                    {
                        this.state.laporan.map(repo =>
                            <Col sm='4' key={repo.IDACC_REPO}>
                                <Card className="card-pricing bg-gradient-primary border-0 text-center text-white mb-4" body  >
                                    <CardTitle >{repo.REPOSITORY}</CardTitle>
                                    <CardText>{repo.JENIS_REPO}</CardText>
                                    <Input type='file' id='file' hidden onChange={this.upload}/> 
                                    <Row>
                                        <Col sm='6'>
                                            <Button type='file' size='sm' className="btn-success" onClick={()=> this.Clickupload(repo.ID_REPO)} style={{width:'100%'}}>Upload</Button>
                                        </Col>
                                        <Col sm='6'>
                                          {
                                              repo.JUMLAH_FORMAT === 0 ? <Button type='file' size='sm' style={{width:'100%'}} disabled>Belum Upload</Button>
                                              :  <Button type='file' onClick={()=> this.Listdetail(repo.ID_REPO)}  size='sm'style={{width:'100%'}}>Download</Button>
                                          }
                                        </Col>
                                    </Row>
                                </Card>    
                            </Col>
                        )         
                    }
                </Row>
            </Scroll>
            </Pageadmin>
        )
    }
}

export default Formatfile;