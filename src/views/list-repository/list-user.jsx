import React from 'react';
import Basemodal from 'layouts/list_modal'
import Table from 'layouts/tabel';



class listUser extends React.Component{
    render(){
      let columns = [
        {
          dataField: 'USERNAME',
          text: 'Nama User'
        },
        {
          dataField: 'SBU',
          text: 'SBU'
        },
        {
          dataField: 'DIVISION',
          text: 'DIVISION'
        }
    ]
        return(
            <Basemodal modal={this.props.modal} mode={this.props.mode} title={this.props.title}>
              <Table keyField={'USERNAME'} data={this.props.data} columns={columns} width={{ width: '100%'}} />
            </Basemodal>
           
        )
    }
}


export default listUser;