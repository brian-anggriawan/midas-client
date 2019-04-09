import React from 'react';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Pageadmin from 'layouts/page-admin';
import Formfile from './form-file';
import Listfiledetail from './list_file_detail';
import { Button , Row , Col , Card , CardHeader  } from 'reactstrap';
import app from 'app';

class listFile extends React.Component{
    constructor(){
        super()
    
        this.state = {
          repo: [],
          groupfile: [],
          filedetail:[],
          modal: false
        }
      }


      mode = () =>{
          this.setState({
              modal: !this.state.modal
          })
      }
    
    
      componentDidMount(){

        app.apiGet1('uploadfile/repo',app.dataUser[0].IDLOGIN)
           .then(res =>{
              this.setState({
                repo: res
              })
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
          <Button type="button" size="sm" color="success" onClick={() => this.onClickProductSelected(cell, row, rowIndex)}>History File</Button>
          </>
          
        )
      }
    
      render() {


        const options = {
          sizePerPage: 10,
          hideSizePerPage: true,
          prePage: 'Back',
          nextPage: 'Next',
        };
        return (
          <Pageadmin head={'List File'}>
          <Listfiledetail modal= {this.state.modal} mode ={this.mode} data ={this.state.filedetail} />
          <Formfile /><br/>
          <Row>
              <Col sm="3">
              <Card body>
              <CardHeader className="text-center" >List Repository</CardHeader>  
              <br />
              {
                this.state.repo.map(repo =>
                  <div key={repo.VCIDREPO}>
                  {/*<Card outline color="primary"  style={{ cursor: 'pointer' , marginBottom: '10px' , height: '50px' }}>
                    <CardText className="text-center" onClick={()=> this.Showlist(repo.VCIDREPO)} >
                      {repo.VCDESCRIPTION}
                    </CardText>
                  </Card>*/}
                    <Button outline color="dark" onClick={()=> this.Showlist(repo.ID_REPO)} style={{ width: '100%' , marginBottom: '10px' , height: '50px' , fontSize:'12px'}}>
                      {repo.REPOSITORY}
                    </Button>
                  </div>
                )
              }
              </Card>
              </Col>
            
              <Col sm="9">
                      <BootstrapTable
                        data={this.state.groupfile}
                        bordered={false}
                        striped
                        pagination={true}
                        options={options}>
                          <TableHeaderColumn
                            dataField='DTPERIOD'
                            width='16%'
                            isKey = {true}
                            dataSort>
                            Periode
                          </TableHeaderColumn>
                           <TableHeaderColumn
                            dataField='KATEGORI'
                            width='16%'
                            dataSort>
                            Kategori
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField='COUNTFILE'
                            width='16%'
                            dataSort>
                            Jumlah File
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