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

    app.apiGet('repository')
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
                            dataField='VCDESCRIPTION'
                            width='20%'
                            isKey = {true}
                            dataSort>
                            Description
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField='VCJENISREPO'
                            width='20%'
                            dataSort>
                            Jenis Laporan
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField='TXKET'
                            width='20%'
                            dataSort>
                            Keterangan
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
