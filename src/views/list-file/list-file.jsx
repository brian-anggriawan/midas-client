import React from 'react';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Pageadmin from 'layouts/page-admin';
import Formfile from './form-file';
import Listfiledetail from './list_file_detail';
import { Button , Row , Col , Card , CardText , Input } from 'reactstrap';
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
          accperiod: []
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

        app.apiGet1('uploadfile/repo',app.dataUser[0].IDLOGIN)
           .then(res =>{
              this.setState({
                repo: res
              })
           }) 
        
        app.apiGet('periodtoday')
           .then(res =>{
            let id = res[0].idperiod;
            document.getElementById('period').value = id;
           })
      }

      Showlist = (kategori) =>{

        app.apiGet1('uploadfile',kategori)
           .then(res =>{
            this.setState({
              groupfile: res
            })
           })
      }

      onClickProductSelected(cell, row, rowIndex){
        let id = this.state.groupfile[rowIndex].VCIDREPO,
            tanggal = this.state.groupfile[rowIndex].DTPERIOD;

            app.apiGet2('uploadfiledetail' , id , tanggal)
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

      action = (cell, row, enumObject, rowIndex)=>{
        return(
          <>
          <Button type="button" size="sm" color="success" onClick={this.mode2}>Upload</Button>
          <Button type="button" size="sm" color="info" onClick={() => this.onClickProductSelected(cell, row, rowIndex)}>History File</Button>
          </>
          
        )
      }
    
      render() {

        return (
          <Pageadmin head={'List File'}>
          <Listfiledetail modal= {this.state.modal} mode ={this.mode} data ={this.state.filedetail} />
          <Formfile modal={this.state.modal2} mode={this.mode2} />
          <Input type="select" id="period" style={{marginBottom: '10px' , width:'23%'}}>
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
                            dataField="button"
                            dataFormat={this.action.bind(this)}
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