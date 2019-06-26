import React, { Component } from 'react';
import Page from 'layouts/page-admin';
import {
    Row,
    Col,
    ListGroupItem,
    ListGroup,
    Badge,
    Input,
    Navbar
 
} from 'reactstrap';
import app from 'app';
import Scroll from 'simplebar-react';

export default class ListChats extends Component {
    constructor(){
        super()
        this.state = {
            users: [],
            filter: '',
            chats : [{
                        from:'orang',
                        msg: 'Selamat Pagi'
                    },
                    {
                        from:'aku',
                        msg: 'Selamat Pagi Juga'
                    },
                    {
                        from:'orang',
                        msg: 'Perkenalkan Aku Andi'
                    },
                    {
                        from:'aku',
                        msg: 'Salam Kenal Juga'
                    }
                ],
            active:false,
            name:''
        }
        this.getFilter = this.getFilter.bind(this);
        this.setName = this.setName.bind(this);
    }



    componentWillMount(){
        app.apiGet('chats/users')
            .then(res =>{
                this.setState({ users: res})
            })
    }

    getFilter( e ){
        this.setState({ filter: e.target.value })
    }

    setName(name){
        this.setState({ 
            name : name,
            active: true
        })
    }

    render() {
        let { users , filter , chats , active , name } = this.state;

        let dataUsers = users.filter( x =>{
            return x.USERNAME.toLowerCase().includes(filter.toLocaleLowerCase())
        });

        return (
            <Page head={'Chats MTG'}>
                <Row>
                    <Col md='3'>
                        <Input type='text' className='mb-2' onChange={this.getFilter} placeholder={'Cari User'} />
                        <Scroll style={{ height: '500px' }}>
                            {   
                                dataUsers.map(x => (
                                    <ListGroup flush key={x.IDLOGIN} >
                                        <ListGroupItem
                                            className="list-group-item-action flex-column align-items-start py-4 px-4"
                                            href="#pablo"
                                            onClick={()=> this.setName(x.USERNAME)}
                                            tag="a"
                                            color='default'
                                        
                                        >
                                            <div className="d-flex w-100 justify-content-between">
                                            <div>
                                                <div className="">
                                                <h5  className="mb-1">{x.USERNAME}</h5>
                                                </div>
                                            </div>
                                                <small className='text-center'>
                                                    <Badge className="badge-success">Online</Badge><br/>
                                                    <h4>{x.DIVISION}</h4>
                                                </small>
                                            </div>
                                        </ListGroupItem>
                                    </ListGroup>
                                ))
                            }
                        </Scroll>
                    </Col>
                    <Col md='9'>
                        {
                            active ? <div>
                                        <Navbar className="navbar-horizontal bg-primary ">
                                        <h3 className='text-secondary'>{name}</h3>
                                        </Navbar>
                                        <hr />
                                        <Scroll style={{ height: '500px' , }}>
                                        <ul>
                                            {
                                                chats.map((x , i) =>(
                                                    x.from === 'aku' ?
                                                    <Row className="d-flex flex-row-reverse">
                                                        <Col md='6'> 
                                                            <ListGroup flush key={x.IDLOGIN} >
                                                                <ListGroupItem color='success text-dark' style={{ borderRadius: '20px' , fontSize:'13px'}}>
                                                                    {x.msg}
                                                                </ListGroupItem>
                                                            </ListGroup>
                                                        </Col>
                                                    </Row>
                                                    :
                                                    <Row className="d-flex flex-row">
                                                        <Col md='6'> 
                                                            <ListGroup flush key={x.IDLOGIN} >
                                                                <ListGroupItem color='success text-dark' style={{ borderRadius: '20px' , fontSize:'13px' }}>
                                                                   {x.msg}
                                                                </ListGroupItem>
                                                            </ListGroup>
                                                        </Col>
                                                    </Row>
                                                ))
                                            }
                                            </ul>
                                        </Scroll>
                                    </div> :
                            <h1 className='text-center'>Chat MTG</h1> 
                        }
                    </Col>
                </Row>
            </Page>
        )
    }
}
