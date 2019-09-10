import React from 'react';
import Pageadmin from 'layouts/page-admin';
import { Row , Col , FormGroup , Button } from 'reactstrap';
import Formacc from './form_access_repo';
import Scroll from 'simplebar-react';
import Select from 'react-select';
import Tabel from 'layouts/tabel';
import app from 'app';



class listAccessmenu extends React.Component{
constructor(){
    super()
    this.state = {
        sbu: [],
        dpt: [],
        user:[],
        data:[],
        modal: false,
        repo:[],
        idsbu:'',
        iddept:'',
        iduser:'',

    }
}


componentDidMount(){
    let user = app.dataUser[0];

    if (user.ACCESS === 2) {
            app.apiGet2('userFilter',user.SBU_ID , user.IDDPT)
            .then(res =>{
                let data = [];
    
                res.map(x =>
                    data.push({
                        value: x.IDLOGIN,
                        label: x.USERNAME
                    })
                )
                this.setState({
                    user: data
                })
            })
        
    }else{
        app.apiGet('sbu')
       .then(res =>{

        let data = [];
        res.map( x =>
                data.push({
                    value: x.SYSTEM_ID,
                    label: x.SBU
                })
            )
           this.setState({
               sbu: data
           })
       })
    }
}


dpt = (e)=>{
    app.apiGet1('dpt',e.value)
       .then(res =>{
           let data = [];
           res.map(x =>
                data.push({
                    value: x.SYSTEM_ID,
                    label: x.DIVISION
                })
            )
           this.setState({
               dpt: data,
               idsbu: e.value
           })
       })  
}

user = (e) =>{
  
    app.apiGet2('userFilter',this.state.idsbu , e.value)
       .then(res =>{
           let data = [];

           res.map(x =>
                data.push({
                    value: x.IDLOGIN,
                    label: x.USERNAME
                })
            )
           this.setState({
               user: data
           })
       })
    
    this.setState({
        iddept: e.value
    })
}

data = (e) =>{
  app.apiGet1('accessrepo',e.value)
     .then(res =>{
        this.setState({
            data: res
        })
         
     })  

     this.setState({
         iduser: e.value
     }) 

        // get list repository
        let dpt = app.dataUser[0].IDDPT;

         if (app.dataUser[0].ACCESS === 2) {
             app.apiGet2('accessrepo/repo',dpt, e.value)
                 .then(res =>{
                     this.setState({
                         repo: res
                     })
                 })
         }
}

refresh = () =>{
    app.apiGet1('accessrepo',this.state.iduser)
     .then(res =>{
        this.setState({
            data: res
        })
         
     })  
}

mode = ()=>{
    
    let dpt = app.dataUser[0].IDDPT;

    if (this.state.iduser !== '') {
        if (app.dataUser[0].ACCESS === 2) {
            app.apiGet2('accessrepo/repo',dpt, this.state.iduser)
                .then(res =>{
                    this.setState({
                        repo: res
                    })
                })
        }else{
            app.apiGet2('accessrepo/repo',this.state.iddept, this.state.iduser)
                .then(res =>{
                    this.setState({
                        repo: res
                    })
                })
        }
        this.setState({
            modal: !this.state.modal
        })

    }else{
        app.msgerror('Belum Memilih User')
    }

    
}

delete(idrepo){

    app.apiDelete('accessrepo',{
        id: idrepo
    })
       .then(data =>{
           if (data) {
               this.refresh();
           }
       })
}

action=(id)=>{
    return <Button color="danger" onClick={()=> this.delete(id)} size="sm"> Delete Hak Akses </Button>
}

getRepo = (e) =>{
    app.apiPostJson('accessrepo' ,{
        idrepo: e.value,
        iduser: this.state.iduser 
    })
    .then(res =>{
        if (res) {
            this.refresh();

            let dpt = app.dataUser[0].IDDPT;
            app.apiGet2('accessrepo/repo',dpt, this.state.user)
            .then(res =>{
                this.setState({
                    repo: res
                })
            })
        }
    })

}



render(){

    return(
        <Pageadmin head={'List Access Repository'}>
                {
                    app.dataUser[0].ACCESS === 2 ?
                    <Row style={{marginBottom:'20px'}}>
                        <Col md='3'>
                            <FormGroup>
                                <Select clearable={true} options={this.state.user} placeholder={'Pilih User'} onChange={this.data} />              
                            </FormGroup>    
                        </Col> 
                    </Row>

                    :
                    <Row style={{marginBottom:'20px'}}>
                        <Col md='3'>
                            <FormGroup>
                                <Select options={this.state.sbu} placeholder={'Pilih SBU'} onChange={this.dpt} id='sbu' />
                            </FormGroup>
                        </Col>
                        <Col md='3'>
                            <FormGroup>
                                <Select options={this.state.dpt} placeholder={'Pilih Division'} onChange={this.user} />
                            </FormGroup>
                        </Col>
                        <Col md='3'>
                            <FormGroup>
                                <Select clearable={true} options={this.state.user} placeholder={'Pilih User'} onChange={this.data} />             
                            </FormGroup>    
                        </Col> 
                    </Row>
                }
            <Button type="button" color='default' className='mb-3' onClick={this.mode}>Tambah Akses Repository</Button>
            <Select options={this.state.repo.map(x => ({
                value: x.ID_REPO,
                label: x.REPOSITORY
            }))} placeholder={'Pilih Report'} className='mb-3' onChange={this.getRepo}  clearable={true} />
            <Formacc modal={this.state.modal} mode={this.mode} repo ={this.state.repo} user={this.state.iduser} test={this.refresh} />
            
            <Scroll>
                <Tabel data={this.state.data} columns={[
                    {
                        dataField: 'REPOSITORY',
                        text: 'Priode'
                    },
                    {
                        dataField: 'JENIS_REPO',
                        text: 'Kategori'
                    },
                    {
                        dataField: 'IDACC_REPO',
                        formatter: this.action,
                        text: 'Action'
                    }
                
                ]} keyField={'IDACC_REPO'} width={{width:'380px'}} />
               
            </Scroll>
        </Pageadmin>
    )
}

}

export default listAccessmenu;