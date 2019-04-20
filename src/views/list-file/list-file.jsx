import React from 'react';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Pageadmin from 'layouts/page-admin';
import Formfile from './form-file';
import Listfiledetail from './list_file_detail';
import { Button , Row , Col , Card , CardText , Input , Badge } from 'reactstrap';
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
          accperiod: [],
          dataform: [],
          idperiod: app.dataUser[0].ID_PERIOD
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
    
    
      componentDidMount(){

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
            this.setState({
              groupfile: res
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
    
      render() {

        return (
          <Pageadmin head={'List File'}>
          <Listfiledetail modal= {this.state.modal} mode ={this.mode} data ={this.state.filedetail} />
          <Formfile modal={this.state.modal2} mode={this.mode2} data={this.state.dataform} />
          <Input type="select" id="period" style={{marginBottom: '10px' , width:'23%'}}  onChange={this.selectPeriod} value={this.state.idperiod}>
              {
                this.state.accperiod.map(data =>
                 <option key={data.VCIDACCPERIOD} value ={data.VCIDACCPERIOD}>{data.VCDESCRIPTION}</option> 
                )
              }
          </Input>
          <Row>
              <Col sm="3"> 
              {
                this.state.repo.map(repo =>
                 <Card body key={repo.ID_REPO} style={{ marginBottom: '10px'}}>
                  <CardText style={{fontSize:'15px'}}>{repo.REPOSITORY}</CardText>
                  <CardText className="text-center" style={{fontWeight: 'bold'}}>{repo.COUNT}</CardText>
                  <Button color="primary" size='sm' onClick={()=> this.Showlist(repo.ID_REPO)}>Show File</Button>
                 </Card> 
                )
              }
              </Col>
              <Col sm="9">
                      <BootstrapTable
                        data={this.state.groupfile}
                        bordered={false}
                        striped
                        pagination={true}
                        options={app.optionTable}>
                          <TableHeaderColumn
                            dataField='TEMPLATE'
                            width='16%'
                            isKey = {true}
                            dataSort>
                            Periode
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField='LAST_UPLOAD'
                            width='16%'
                            dataSort>
                            Last Upload
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField='COUNT'
                            width='16%'
                            dataSort>
                            Jumlah File
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField='COUNT'
                            dataFormat={this.status}
                            width='16%'
                            dataSort>
                            Status
                          </TableHeaderColumn>      
                          <TableHeaderColumn
                            dataField='ID_TEMPLATE'
                            dataFormat={this.action}
                            width='16%'
                            dataSort>
                            Action
                          </TableHeaderColumn>
                      </BootstrapTable>
              </Col>
            </Row>
          </Pageadmin>
        );
      }
    }

export default listFile;