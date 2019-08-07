import React from 'react';
import Pageadmin from 'layouts/page-admin';
import { Button , Input , Progress } from 'reactstrap';
import XLSX from 'xlsx';
import { make_cols } from './MakeColumn';
import app from 'app';
import Viewjson from 'react-json-view';


class Importrepo extends React.Component{
    constructor(){
        super()
        this.state = {
            file: {},
            data: [],
            cols: [],
            persen: 0
        }
    }

   
    Click =()=>{
        let id = document.getElementById('file');
        id.click();
    }

     sleep =(ms) =>{
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      
    Simpan = async () =>{

        let { data } = this.state;
        let count  = data.length;
        let progres = 0;

        for(let i = 0; i < count; i++ ){

            progres = progres + 1;
            let x = parseInt((progres / count) * 100);

            let  hasil = {
                    name: data[i].LAPORAN,
                    jenis: data[i].FREKUENSI,
                    ket: data[i].KETERANGAN,
                    user:'TEST003',
                    divisi: data[i].IDDPT,
                    sbu: data[i].IDSBU,
                    sbuname: data[i].SBU,
                    divname: data[i].DIVISI,
                    nodoc: data[i].NODOC
                }
            
            app.apiPostJson('repository',hasil)
            .then(res =>{
                if (res) {
                    this.setState({
                        persen: x
                    })
                }
            })

            this.setState({
                persen: x
            })

            await this.sleep(500)
        }

        app.msgok('Berhasil Import' ,'/admin/import-repo')
    }

    handleChange =(e)=> {
        const file = e.target.files[0];
        
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
    
        reader.onload = (e) => {
        /* Parse data */
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws);
        /* Update state */
        this.setState({ data: data, cols: make_cols(ws['!ref']) });
    
        };
    
        if (rABS) {
        reader.readAsBinaryString(file);
        } else {
        reader.readAsArrayBuffer(file);
        };
    };

    Reset = ()=>{
        this.setState({
            file:{},
            data:[],
            cols:[],
            persen:0
        })

        document.getElementById('file').value='';
    }

    render(){
        return(
            <Pageadmin>
                <Input type='file' hidden id='file' onChange={this.handleChange}/>
                <Button type='button' onClick={this.Click} color='success'>Import Repo</Button>
                <Button type='button' onClick={this.Simpan}  color='info'>Proses</Button>
                <Button type='button' onClick={this.Reset}  color='danger'>Reset</Button>
                <div className="progress-wrapper">
                    <div className="progress-info">
                        <div className="progress-percentage">
                        <span>{`${this.state.persen} %`}</span>
                        </div>
                    </div>
                    <Progress id='pg' max="100" value={this.state.persen} color="default" />
                </div>
               
                <div style={{height: '400px' , overflowY: 'scroll'}}>
                    <Viewjson src={this.state.data}/> 
                </div>
                

                
            </Pageadmin>
        )
    }



}


export default Importrepo;