import React from "react";
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import FormUpload from './form-upload';
import Pageadmin from 'layouts/page-admin';
import {Button} from 'reactstrap';

class Icons extends React.Component {

  render() {


    const action = ()=>{
      return(
        <Button color='primary' size='sm' type='button'>Download</Button>
      )
      
    }
    const data = [
        {
          vcid: '1',
          dtupload: '2019/03/28',
          vcjenisfile: 'Harian',
          vcfilename: 'document.pdf',
          vcfilesrc: '/file/document.pdf',
          vbfile: '4534453gm4g3k4gm466'
        }
      ]
    
    const options = {
      sizePerPage: 10,
      hideSizePerPage: true,
      prePage: 'Back',
      nextPage: 'Next',
    };
    return (
      <Pageadmin head={'List Upload'}>
        <FormUpload/><br/>
        <div className="row">
          <div className="col-md-12">
              <div className="card">
                <div className="content">
                  <BootstrapTable
                    data={data}
                    bordered={false}
                    striped
                    pagination={true}
                    options={options}>
                      <TableHeaderColumn
                        dataField='vcid'
                        isKey
                        width="5%"
                        dataSort>
                        ID
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField='dtupload'
                          width="20%"
                          dataSort>
                          Tanggal Upload
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField='vcjenisfile'
                        width="30%">
                        Jenis File
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField='vcfilename'
                        width="30%">
                        Nama File
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataFormat={action}
                        width="30%">
                        Action
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

export default Icons;
