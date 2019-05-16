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
                        this.props.mode();
                        this.props.test();
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
              name='cek'
              value={idrepo}
            />
            <label className="custom-control-label" htmlFor={idrepo}>
              Tambah
            </label>
          </div>
        )
    }

    render(){
        return(
            <Baselistmmodal modal={this.props.modal} mode={this.props.mode} title={'Tambah Access Repository'}>
            <Button type='button' color='success' onClick={this.proses}> Simpan </Button>
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