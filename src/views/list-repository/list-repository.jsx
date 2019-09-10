import React from "react";
import FormRepository from './form-repository';
import Pageadmin from 'layouts/page-admin';
import app from 'app';
import {Button} from 'reactstrap';
import Listuser from './list-user';
import Scroll from 'simplebar-react';
import Tabel from 'layouts/tabel';
import Listfile from './list-file-detail';

class listRepository extends React.Component {
  constructor(){
    super()

    this.state = {
      repo: [],
      user:[],
      reponame:'',
      modal: false,
      modal2: false,
      modal3: false,
      data:[],
      idperiod: app.dataUser[0].ID_PERIOD
    }
  }

  mode = ()=>{
    this.setState({
      modal: !this.state.modal
    })
  }

  mode2 = ()=>{
    this.setState({
      modal2: !this.state.modal2
    }) 
  }

  mode3 = () =>{
    this.setState({ modal3: !this.state.modal3 });
  }

  componentWillMount(){
    app.apiGet('repository')
       .then(res => {
         if (app.dataUser[0].ACCESS === 2) {
            let data = res.filter(x => x.DIVISION === app.dataUser[0].DIVISION );
            this.setState({ repo: data  })
         }else{
            this.setState({ repo: res })
         }
       });
  }

  Showlist(id){
    let data = this.state.repo.filter(res => res.ID_REPO === id)[0];
    app.apiGet1('repository/user',id)
       .then(res =>{
         this.setState({
           user: res
         })
         this.setState({
          reponame: data.REPOSITORY
        })
       })
    this.mode();    
  }

  Showfile(id){
    app.apiGet3('laporananalis',1,id,this.state.idperiod)
            .then(res =>{
                this.setState({
                    detail: res
                });
                this.mode3();
              }) 
  }

  button =(id)=>{
    return (
      <div>
          <Button type="button" size="sm" color="default" onClick={()=> this.Showlist(id)}> List User </Button>
          <Button type="button" size="sm" color="info" onClick={()=> this.Showfile(id)}> List File </Button>
      </div>
    )  
  }


  render() {

    let columns =  [
    {
      dataField: 'REPOSITORY',
      text: 'Description'
    }, {
      dataField: 'NODOC',
      text: 'No Doc'
    }, {
      dataField: 'JENIS_REPO',
      text: 'Jenis Laporan'
    }, {
      dataField: 'KETERANGAN',
      text: 'keterangan'
    }, {
      dataField: 'SBU',
      text: 'SBU'
    }, {
      dataField: 'DIVISION',
      text: 'Division'
    }, {
      dataField: 'JUMLAH_USER',
      text: 'Jumlah User'
    }, {
      dataField: 'ID_REPO',
      formatter: this.button,
      text: 'Action'
    }
  ];

    return (
      <Pageadmin head={'List Master Report'}>
        <Button type='button' color='default' onClick={this.mode2} style={{marginBottom:'10px'}}>Tambah Data</Button>
        <FormRepository modal={this.state.modal2} mode={this.mode2}/>
        <Listuser modal={this.state.modal} mode={this.mode} data={this.state.user} title={this.state.reponame}/>
        <Listfile mode={this.mode3} modal={this.state.modal3} data={this.state.detail} />
        <Scroll>
          <Tabel keyField={'ID_REPO'} data={this.state.repo} columns={columns} width={{width:'300px'}} />
        </Scroll>
      </Pageadmin>
    );
  }
}

export default listRepository;
