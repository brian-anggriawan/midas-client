import React from "react";
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import FormRepository from './form-repository';
import Pageadmin from 'layouts/page-admin';
import app from 'app';

class listRepository extends React.Component {
  constructor(){
    super()

    this.state = {
      repo: []
    }
  }


  componentDidMount(){

    app.apiGet1('repository',app.dataUser[0].IDLOGIN)
       .then(res => {
        this.setState({
          repo: res
        })
       });
  }

  render() {
 
    const options = {
      sizePerPage: 10,
      hideSizePerPage: true,
      prePage: 'Back',
      nextPage: 'Next',
    };
    return (
      <Pageadmin head={'List Master Report'}>
        <FormRepository/><br/>
        <div className="row">
          <div className="col-md-12">
              <div className="card">
                <div className="content">
                        <BootstrapTable
                        data={this.state.repo}
                        bordered={false}
                        striped
                        pagination={true}
                        options={options}>
                          <TableHeaderColumn
                            dataField='REPOSITORY'
                            width='20%'
                            isKey = {true}
                            dataSort>
                            Description
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField='JENIS_REPO'
                            width='20%'
                            dataSort>
                            Jenis Laporan
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField='KETERANGAN'
                            width='20%'
                            dataSort>
                            Keterangan
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField='SBU'
                            width='20%'
                            filter={ { type: 'TextFilter'} }
                            dataSort>
                            SBU
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField='DIVISION'
                            width='20%'
                            filter={ { type: 'TextFilter'} }
                            dataSort>
                            Division
                          </TableHeaderColumn>
                      </BootstrapTable>
                </div>
              </div>
            </div>
          </div>  
      </Pageadmin>
    );
  }
}

export default listRepository;
