import React, { Component } from 'react';
import Modal from 'layouts/list_modal';
import Scroll from 'simplebar-react';
import { ChatItem } from 'react-chat-elements';
import { 
    Button,
    Row,
    Col,
    Input
    } from 'reactstrap';

export default class listContact extends Component {
    constructor(){
        super()
        this.state ={
            search:''
        }

        this.setSearch = this.setSearch.bind(this);
    }

    setSearch(e){
        this.setState({ search: e.target.value });
    }

    click(id){
        alert()
    }

    render() {
        let { mode , modal , title , users ,post } = this.props;
        let { search } = this.state;

        let list = users.filter( x =>{
            return x.USERNAME.toLowerCase().includes(search.toLocaleLowerCase());
        })


        return (
            <Modal mode={mode} modal={modal} title={title}>
                <Input type='text' placeholder={'Cari User'} onChange={this.setSearch} />
                <hr />
                <Scroll style={{ height: '450px' }}>
                            {   
                                list.map((x , i) => (
                                    <Row key={i}>
                                        <Col md='8'>
                                            <ChatItem
                                                avatar={require('assets/img/theme/man.png')}
                                                alt={'Reactjs'}
                                                title={x.USERNAME}
                                                subtitle={x.DIVISION}
                                                statusColor={'#49E20E'}
                                                date={new Date()}
                                                key={i}/>  
                                        </Col>
                                        <Col md='4'>
                                            <Button type='button' size='sm' color='success'onClick={()=> post(x.USERNAME,x.IDLOGIN,x.DIVISION)} >Send Message</Button>
                                        </Col>
                                    </Row>
                                ))
                            }
                        </Scroll>                           
            </Modal>
        )
    }
}
