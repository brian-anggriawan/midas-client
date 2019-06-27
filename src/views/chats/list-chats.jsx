import React, { Component } from 'react';
import Page from 'layouts/page-admin';
import {
    Row,
    Col,
    Form,
    Input,
    Navbar,
    Button
 
} from 'reactstrap';
import app from 'app';
import Scroll from 'simplebar-react';
import socket from 'socket.io-client';
import date from 'moment';
import 'react-chat-elements/dist/main.css';
import { ChatItem , MessageBox } from 'react-chat-elements';
import "react-notification-alert/dist/animate.css";
import NotificationAlert from "react-notification-alert";
const io  = socket('http://192.168.40.100:4000');
const idUser = app.dataUser[0].IDLOGIN;

export default class ListChats extends Component {
    constructor(){
        super()
        this.state = {
            users: [],
            filter: '',
            chats : [],
            active:false,
            name:'',
            idname:'',
            msg: '',
            istyping: false,
            typingName:'',
            typingDest:''
        }
        this.getFilter = this.getFilter.bind(this);
        this.setName = this.setName.bind(this);
        this.setMsg = this.setMsg.bind(this);
        this.SendMsg = this.SendMsg.bind(this);
    }

    


    componentWillMount(){
        app.apiGet1('chats/users' , idUser)
            .then(res =>{
                this.setState({ users: res})
            })
    }

    getFilter( e ){
        this.setState({ filter: e.target.value })
    }

    setName(idlogin , name){
        this.setState({ 
            name : name,
            idname: idlogin,
            active: true,
            msg:''
        })

        app.apiGet2('chats/chats' , idUser , idlogin )
            .then(res =>{
                this.setState({ chats: res})
            })
    }

    setMsg(e){
        this.setState({ msg: e.target.value });
        io.emit('istyping' ,{
            fromname: app.dataUser[0].USERNAME,
            toname: this.state.name
        });
    }


    SendMsg(e){

        e.preventDefault();
        let { msg  ,name , idname} = this.state;
        let data = { 
            FROM_ID: idUser,
            TO_ID: idname,
            FROM: app.dataUser[0].USERNAME,
            TO: name,
            MSG: msg,
            DATE: date().format('LLL'),
            ID_USER: idUser
         }
        io.emit('chat' , data );
        this.setState({ msg: ''})
    }

    componentDidMount(){
        io.on('chat' , (msg)=>{
            if ((msg.TO_ID === this.state.idname && msg.FROM_ID === idUser) || (msg.FROM_ID === this.state.idname && msg.TO_ID === idUser) ) {
                let data = [ ...this.state.chats , msg];
                this.setState({ chats : data })

                let scroll = document.getElementById('sc');
                scroll.scrollTop = scroll.scrollHeight;   
            }

            if ((msg.TO_ID === idUser && msg.FROM_ID !== this.state.idname) ) {
                let options = {
                    place: 'br',
                    message: (
                      <div className="alert-text">
                        <span className="alert-title" data-notify="title">
                          {`Pesan Masuk Dari ${msg.FROM}`}
                        </span><br/>
                        <span data-notify="message">
                          {msg.MSG}
                        </span>
                      </div>
                    ),
                    type: "default",
                    autoDismiss: 7
                  };
                  this.refs.notificationAlert.notificationAlert(options);  
            }
        })


        io.on('istyping' ,(name)=>{
            this.setState({ istyping: true , typingName: name.fromname , typingDest: name.toname});

            setTimeout(()=>{ this.setState({ istyping: false}) }, 500);
        })
    }

    bottom(){
        let scroll = document.getElementById('sc');
        scroll.scrollTop = scroll.scrollHeight; 
    }


    render() {
        let { users , filter , chats , active , name , msg , istyping ,typingName , typingDest } = this.state;

        let dataUsers = users.filter( x =>{
            return x.USERNAME.toLowerCase().includes(filter.toLocaleLowerCase())
        });

        return (
            <Page head={'Chats MTG'}>
                <div className="rna-wrapper">
                 <NotificationAlert ref="notificationAlert" />
                </div>
                <Row>
                    <Col md='3'>
                        <Input type='text' className='mb-2' onChange={this.getFilter} placeholder={'Cari User'} />
                        <Scroll style={{ height: '450px' }}>
                            {   
                                dataUsers.map((x , i) => (
                                        <ChatItem
                                            avatar={require('assets/img/theme/man.png')}
                                            alt={'Reactjs'}
                                            title={x.USERNAME}
                                            subtitle={x.DIVISION}
                                            statusColor={'#49E20E'}
                                            date={new Date()}
                                            key={i}
                                            onClick={()=> this.setName(x.IDLOGIN , x.USERNAME)}
                                            unread={0} />  
                                ))
                            }
                        </Scroll>
                    </Col>
                    <Col md='9'>
                        {
                            active ? 
                                <div>
                                        <Navbar className="navbar-vertical bg-primary ">
                                            <h3 className='text-secondary'>
                                            {
                                                istyping && typingName === name && typingDest === app.dataUser[0].USERNAME ? `${name} is Typing.....` : name
                                            }
                                            </h3>
                                        </Navbar>
                                        <hr />
                                            <div  style={{ height: '325px' , overflowY:'scroll' , overflowX:'hidden'  }} id='sc'  >
                                            {
                                                chats.map((x , i) =>(
                                                    x.ID_USER === idUser ?
                                                    <Row className="d-flex flex-row-reverse mb-1" key={i}>
                                                        <Col md='6'> 
                                                            <label className='d-flex flex-row-reverse' style={{ fontSize:'11px'}}>{date(x.DATE).format('LLL')}</label>
                                                            <MessageBox
                                                                position={'right'}
                                                                text={x.MSG}
                                                            />
                                                        </Col>
                                                    </Row>
                                                    :
                                                    <Row className="d-flex flex-row mb-1" key={i}>
                                                        <Col md='6'> 
                                                            <label className='d-flex flex-row' style={{ fontSize:'11px'}}>{date(x.DATE).format('LLL')}</label>
                                                            <MessageBox
                                                                position={'left'}
                                                                text={x.MSG}                                                                
                                                            />
                                                        </Col>
                                                    </Row>
                                                ))
                                            }
                                            </div>
                                        <Row>
                                            <Col md='10'>
                                                <Form onSubmit={this.SendMsg}>
                                                    <Input type='text' onChange={this.setMsg} value={msg}/>
                                                </Form>
                                            </Col>
                                            <Col md='2'>
                                                <Button color='info' onClick={this.bottom}>Bottom</Button>
                                            </Col>
                                        </Row>
                                    </div> : <h1 className='text-center'> Chat MTG</h1>
                        }
                          
                    </Col>
                </Row>
            </Page>
        )
    }
}
