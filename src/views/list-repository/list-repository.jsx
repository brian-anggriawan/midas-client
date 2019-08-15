import React from "react";
import FormRepository from './form-repository';
import Pageadmin from 'layouts/page-admin';
import app from 'app';
import {Button} from 'reactstrap';
import Listuser from './list-user';
import Scroll from 'simplebar-react';
import Tabel from 'layouts/tabel';

class listRepository extends React.Component {
  constructor(){
    super()

    this.state = {
      repo: [],
      user:[],
      reponame:'',
      modal: false,
      modal2: false
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

  button =(id)=>{
    return <Button type="button" size="sm" color="default" onClick={()=> this.Showlist(id)}> List User </Button>
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
        <Scroll>
          <Tabel keyField={'ID_REPO'} data={this.state.repo} columns={columns} width={{width:'300px'}} />
        </Scroll>
      </Pageadmin>
    );
  }
}

export default listRepository;
