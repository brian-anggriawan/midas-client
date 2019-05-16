import React from 'react';
import Pageadmin from 'layouts/page-admin';
import Formfile from './form-file';
import Listfiledetail from './list_file_detail';
import { Button , Row , Col , Card , CardText , Input , Badge } from 'reactstrap';
import Scroll from 'simplebar-react';
import download from 'downloadjs';
import Loading from 'layouts/loading-modal';
import Tabel from 'layouts/tabel';
import app from 'app';


class listFile extends React.Component{
    constructor(){
        super()
    
        this.state = {
          repo: [],
          groupfile: [],
          filedetail:[],
          modal: false,
          modal2: false,
          loading: false,
          accperiod: [],
          dataform: [],
          idperiod: app.dataUser[0].ID_PERIOD,
          filtercard:''
        }
      }


      mode = () =>{
          this.setState({
              modal: !this.state.modal
          })
      }

      mode2 = () =>{
        this.setState({
          modal2: !this.state.modal2
      })
      }

      loading = () =>{
        this.setState({
          loading: !this.state.loading
        })
      }
    
    
      componentWillMount(){

        app.apiGet('accperiod')
           .then(res =>{
             this.setState({
               accperiod: res
             })
           })

        app.apiGet2('uploadfile/repo',app.dataUser[0].IDLOGIN ,app.dataUser[0].ID_PERIOD)
           .then(res =>{
                this.setState({
                  repo: res
            })
        }) 

      }

      Showlist = (repo) =>{

        app.apiGet2('uploadfile',repo , this.state.idperiod)
           .then(res =>{
             let data = [];

             res.map(x =>
                data.push({
                  COUNT: x.COUNT,
                  COUNT1: x.COUNT,
                  DIRECTORY: x.DIRECTORY,
                  ID_TEMPLATE: x.ID_TEMPLATE,
                  LAST_UPLOAD: x.LAST_UPLOAD,
                  NODOC: x.NODOC,
                  REPO: x.REPO,
                  TEMPLATE: x.TEMPLATE
                })
              )
            this.setState({
              groupfile: data
            })
           })
      }

      onClickProductSelected(index){

            app.apiGet2('uploadfiledetail' , index , this.state.idperiod)
               .then(res =>{
                this.setState({
                  filedetail: res
                })
               })


            this.setState({
              modal: true
            })  
            
            this.mode();
       }

       onClickForm(rowindex){
         let groupfile = this.state.groupfile.filter(res => res.ID_TEMPLATE === rowindex)[0];
         let idselect  = document.getElementById('period');
         let txselect= idselect.options[idselect.selectedIndex].text;

         let data = [{
           idperiod: this.state.idperiod,
           idtemplate: groupfile.ID_TEMPLATE,
           directory: groupfile.DIRECTORY,
           period : txselect,
           nodoc: groupfile.NODOC,
           repo : groupfile.REPO
         }]
        this.setState({
          dataform:data
        })
        this.mode2();
       }

      action = (index)=>{
        return(
          <>
          <Button type="button" size="sm" color="success" onClick={()=> this.onClickForm(index)}>Upload</Button>
          <Button type="button" size="sm" color="info" onClick={() => this.onClickProductSelected(index)}>History</Button>
          </>
          
        )
      }
      status = (count)=>{
    
        if (count > 0) {
          return <Badge color="success">Sudah Upload</Badge>
        }else{
          return <Badge color="danger">Belum Upload</Badge>
        }
      }

      selectPeriod =(e)=>{

        this.setState({
          idperiod: e.target.value
        })

        app.apiGet2('uploadfile/repo',app.dataUser[0].IDLOGIN ,e.target.value)
           .then(res =>{
                this.setState({
                  repo: res
            })
              this.setState({
                groupfile: []
              })
        }) 
      }

      Downloadfile = async (id) =>{

        let data = await app.apiGet1('formatfile/index' , id);
        let idformat = data[0].ID_FORMAT;
        let name = data[0].ORIGINAL_NAME;

  
        this.loading();
 
        let res = await fetch(app.proxy+'formatfile/download/'+idformat,{
            method: 'get',
            headers: app.head2
        });
 
        if (res) {
         let blob = await res.blob();
     
         download(blob , name);
         this.loading();
         app.apiGet1('formatfile/delete',idformat)  
          
        }
      }

      SearchReport = (e)=>{
        this.setState({
          filtercard: e.target.value
        })
      }
    
      render() {
        let { filtercard , repo } = this.state;
        let filterRepo = repo.filter( x =>{
         return x.REPOSITORY.toLowerCase().includes(filtercard.toLowerCase())
        })

        return (
          <Pageadmin head={'List File'}>
          <Loading modal={this.state.loading} text={'Proses Download'}/>
          <Listfiledetail modal= {this.state.modal} mode ={this.mode} data ={this.state.filedetail} />
          <Formfile modal={this.state.modal2} mode={this.mode2} data={this.state.dataform} />
          <Input type="select" id="period" className='mb-2 w-25'  onChange={this.selectPeriod} value={this.state.idperiod}>
              {
                this.state.accperiod.map(data =>
                 <option key={data.VCIDACCPERIOD} value ={data.VCIDACCPERIOD}>{data.VCDESCRIPTION}</option> 
                )
              }
          </Input>
          <Input type='text' className='mb-2 w-25' onChange={this.SearchReport} placeholder='Cari Laporan'/>
          <Row>
                <Col sm="3"> 
                <Scroll style={{ height: '700px' }}>
                {
                  filterRepo.map(repo =>
                  <Card id="cardfile" body key={repo.ID_REPO} style={{ marginBottom: '10px' , border: '5px solid lightblue'}}> 
                    <CardText style={{fontSize:'15px'}}>{repo.REPOSITORY}</CardText>
                    <CardText style={{fontSize:'15px'}}>{repo.JENIS_REPO}</CardText>
                    <CardText className="text-center" style={{fontWeight: 'bold'}}>{repo.COUNT}</CardText>
                    <div>
                     <Button color="primary" size='sm' style={{width: '100%'}} onClick={()=> this.Showlist(repo.ID_REPO)}>Show File</Button><br/><br/>
                     {
                       repo.JUMLAH_FORMAT === 0 ? <Button color="default" size='sm' style={{width: '100%'}} disabled >Belum Ada Format</Button>
                       : <Button color="default" size='sm' style={{width: '100%'}} onClick={()=> this.Downloadfile(repo.ID_REPO)} >Download Format</Button>
                     }  
                    </div>
                  </Card> 
                  )
                }
                </Scroll>
                </Col>
              
              <Col sm="9">
                <Scroll>
                  <Tabel 
                    keyField={'TEMPLATE'}
                    data={this.state.groupfile}
                    columns={[
                      {
                        dataField:'TEMPLATE',
                        text: 'Periode'
                      },
                      {
                        dataField:'LAST_UPLOAD',
                        text: 'Last Upload'
                      },
                      {
                        dataField:'COUNT',
                        text: 'Jumlah File'
                      },
                      {
                        dataField:'COUNT1',
                        text: 'Status',
                        formatter: this.status
                      },
                      {
                        dataField:'ID_TEMPLATE',
                        text: 'Action',
                        formatter: this.action
                      }
                    ]}

                    width={{ width:'300px'}}
                  
                  />
                  </Scroll>
              </Col>
            </Row>
          </Pageadmin>
        );
      }
    }

export default listFile;