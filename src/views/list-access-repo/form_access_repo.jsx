import React from 'react';
import Baselistmmodal from 'layouts/list_modal';
import app from 'app';
import {Button , Form , Input} from 'reactstrap';
import Scroll from 'simplebar-react';
import Table from 'layouts/tabel';
import Serilaze from 'form-serialize';

class formaccessrepo extends React.Component{

    proses = () =>{
        let form = document.getElementById('form');

        let data = Serilaze(form , { hash: true }).cek;
        let cek = typeof(data);

        if (data) {
            if (cek === 'string') {
                app.apiPostJson('accessrepo' ,{
                    idrepo: data,
                    iduser: this.props.user 
                })
                .then(res =>{
                    if (res) {
                        this.props.test();
                        this.props.mode();
                    }
                })
            }else{
                         
                let count = data.length;
        
                for(let i  = 0 ; i < count; i++){
                    app.apiPostJson('accessrepo' ,{
                        idrepo: data[i],
                        iduser: this.props.user
                    })
                }
                this.props.test();
                this.props.mode();
            }
        }               
    }

    cek = (idrepo) =>{
        return (
            <div className="custom-control custom-control-alternative custom-checkbox mb-3">
            <Input
              className="custom-control-input"
              id={idrepo}
              type="checkbox"
              defaultChecked={false}
              name='cek'
              value={idrepo}
            />
            <label className="custom-control-label" htmlFor={idrepo}>
              Tambah
            </label>
          </div>
        )
    }

    checkAll =() =>{
        let data = this.props.repo;

        for(let i  = 0 ; i < data.length; i++){
           
            app.apiPostJson('accessrepo' ,{
                idrepo: data[i].ID_REPO,
                iduser: this.props.user
            })
        }
        this.props.test();
        this.props.mode();
    }

    render(){
        return(
            <Baselistmmodal modal={this.props.modal} mode={this.props.mode} title={'Tambah Access Repository'}>
            <Button type='button' color='success' onClick={this.proses}> Simpan </Button>
            <Button type='button' color='info' onClick={this.checkAll}> Centang Semua </Button>
                <Scroll>
                    <Form id='form'>
                    <Table
                        data={this.props.repo}
                        keyField={'ID_REPO'}
                        columns ={[
                            {
                                dataField: 'REPOSITORY',
                                text:'Repository'
                            },
                            {
                                dataField: 'KETERANGAN',
                                text: 'Keterangan'
                            },
                            {
                                dataField: 'JENIS_REPO',
                                text: 'Jenis Repo'
                            },
                            {
                                dataField: 'ID_REPO',
                                text: 'Action',
                                formatter: this.cek
                            }
                        ]}
                        width={{width:'300px'}}   
                    />
                    </Form>
                </Scroll>
            </Baselistmmodal>
        )
    }
}

export default formaccessrepo;