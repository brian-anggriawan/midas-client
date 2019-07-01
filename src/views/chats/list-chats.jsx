import React, { Component } from 'react';
import Page from 'layouts/page-admin';
import {
    Row,
    Col,
    Form,
    Input,
    Navbar,
    Button,
    ButtonGroup
 
} from 'reactstrap';
import app from 'app';
import Scroll from 'simplebar-react';
import socket from 'socket.io-client';
import date from 'moment';
import 'react-chat-elements/dist/main.css';
import { ChatItem , MessageBox } from 'react-chat-elements';
import "react-notification-alert/dist/animate.css";
import NotificationAlert from "react-notification-alert";
import Modal from './list-contact';


const io  = socket('http://192.168.40.100:4000');
const idUser = app.dataUser[0].IDLOGIN;

export default class ListChats extends Component {
    _isMounted = false;

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
            typingDest:'',
            modal: false,
            userChat:[],
            deleteMode: false
        }
        this.getFilter = this.getFilter.bind(this);
        this.setName = this.setName.bind(this);
        this.setMsg = this.setMsg.bind(this);
        this.SendMsg = this.SendMsg.bind(this);
        this.mode = this.mode.bind(this);
        this.addUser = this.addUser.bind(this);
        this.deleteMode = this.deleteMode.bind(this);
    }


    deleteMode(){
        this.setState({ deleteMode: !this.state.deleteMode})
    }

    
    componentWillMount(){
        this._isMounted = true;

        app.apiGet1('chats/users' , idUser)
            .then(res =>{
                this.setState({ users: res})
            });

        app.apiGet1('chats/userchat' , idUser)
            .then(res =>{
                this.setState({ userChat: res})
        })
    }

    getFilter( e ){
        this.setState({ filter: e.target.value })
    }

    mode(){
        this.setState({ modal: !this.state.modal})
    }

    setName(idlogin , name , idfrom , read){
        this.setState({ 
            name : name,
            idname: idlogin,
            active: true,
            msg:''
        })

        if (read > 0) {
            app.apiUpdate('chats/updateread' ,{
                fromid: idUser,
                toid: idlogin
            }).then(()=>{
                app.apiGet1('chats/userchat' , idUser)
                    .then(res =>{
                        this.setState({ userChat: res})
                })
            });   
        }

        app.apiGet2('chats/chats' , idUser , idlogin )
            .then(res =>{
                this.setState({ chats: res});

                let scroll = document.getElementById('sc');
                scroll.scrollTop = scroll.scrollHeight; 
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

        app.apiGet('getip')
        .then(res =>{
            let data = { 
                FROM_ID: idUser,
                TO_ID: idname,
                FROM: app.dataUser[0].USERNAME,
                TO: name,
                MSG: app.Enkripsi(msg),
                DATE: new Date(),
                ID_USER: idUser,
                IP: res
             }

            io.emit('chat' , data );
            this.setState({ msg: ''})
        });

    }

    componentDidMount(){
        this._isMounted = true;
        let activePath = window.location.href.replace('http://192.168.40.100:3000/admin/' ,'');

        io.on('chat' , (msg)=>{
            if ((msg.TO_ID === this.state.idname && msg.FROM_ID === idUser) || (msg.FROM_ID === this.state.idname && msg.TO_ID === idUser) ) {
                let data = [ ...this.state.chats , msg];
                this.setState({ chats : data });

                if (activePath.toLowerCase() === 'chats' && msg.FROM_ID === idUser) {
                    let scroll = document.getElementById('sc');
                    scroll.scrollTop = scroll.scrollHeight;     
                }
                
                if (msg.FROM_ID !== idUser) {
                    app.apiUpdate('chats/updateread' ,{
                        fromid: msg.TO_ID,
                        toid: msg.FROM_ID 
                    });
                }
            }

            if ((msg.TO_ID === idUser && msg.FROM_ID !== this.state.idname) ) {
                let options = {
                    place: 'br',
                    message: (
                      <div className="alert-text" style={{ cursor: 'pointer'}} onClick={()=> this.setName(msg.FROM_ID ,msg.FROM , '' , 1)}>
                        <span className="alert-title" data-notify="title">
                          {`Pesan Masuk Dari ${msg.FROM}`}
                        </span><br/>
                        <span data-notify="message">
                          {app.Deskripsi(msg.MSG)}
                        </span>
                      </div>
                    ),
                    type: "primary",
                    autoDismiss: 721
                  };
                  this.refs.notificationAlert.notificationAlert(options);  
            }

            setTimeout(()=>{
                app.apiGet1('chats/userchat' , idUser)
                .then(res =>{
                    this.setState({ userChat: res})

                });
                
            }, 1000);

    
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

    addUser(to , toid , todivision){
        let data = {
            TO: to,
            TO_ID: toid,
            TO_DIVISION: todivision
        }

        app.apiGet2('chats/chats' , idUser , toid )
        .then(res =>{
            let { userChat } = this.state;

            let cek = userChat.filter(x =>{
                return x.TO_ID.toLocaleLowerCase().includes(toid.toLocaleLowerCase());
            });

            if (cek.length > 0) {
                this.setState({  active: true , name: to , idname: toid, chats:res });
              let scroll = document.getElementById('sc');
              scroll.scrollTop = scroll.scrollHeight; 
            }else{
                let copy = [...this.state.userChat , data];
                this.setState({ userChat: copy , active: true , name: to , idname: toid, chats:[] });
            }
            this.mode();
        })
    }


    render() {
        let { users , filter , chats , active , name , msg , istyping ,typingName , typingDest , modal , userChat , deleteMode} = this.state;

        let dataUsers = userChat.filter( x =>{
            return x.TO.toLowerCase().includes(filter.toLocaleLowerCase())
        });

        return (
            <Page head={'Chats MTG'}>
                <Modal modal={modal} mode={this.mode} title={'Contact'} users={users} post={this.addUser} />
                <div className="rna-wrapper">
                 <NotificationAlert ref="notificationAlert" />
                </div>
                <Row>
                    <Col md='3'>
                        {
                            deleteMode ? 
                            <Row className='mb-2'>
                                <Col md='6'>
                                    <Button color='danger' size='sm' type='button' style={{ width:'100%'}}>Delete</Button>
                                </Col>
                                <Col md='6'>
                                    <Button color='primary' size='sm' type='button' style={{width:'100%'}} onClick={this.deleteMode}>Cancel</Button>
                                </Col>
                            </Row>
                            :
                            <Row className='mb-1'>
                                <Col md='6'>
                                    <Input type='text' onChange={this.getFilter} placeholder={'Cari User'} />
                                </Col>
                                <Col md='6'>
                                    <ButtonGroup>
                                        <Button className="btn-icon btn-2" color="primary" onClick={this.mode} type="button">
                                            <span className="btn-inner--icon">
                                                <i className="ni ni-single-02" />
                                            </span>
                                        </Button>
                                        <Button className="btn-icon btn-2" color="danger" onClick={this.deleteMode} type="button">
                                            <span className="btn-inner--icon">
                                                <i className="ni ni-fat-delete" />
                                            </span>
                                        </Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>

                        }
                        <Scroll style={{ height: '450px' , border: '2px solid lightblue' }}>
                            <Form id='userlist'>
                            {   
                                dataUsers.map((x , i) => (
                                        <ChatItem
                                            avatar={require('assets/img/theme/man.png')}
                                            alt={'Reactjs'}
                                            title={x.TO}
                                            subtitle={app.Deskripsi(x.LAST_CHAT)}
                                            statusColor={'#49E20E'}
                                            date={new Date()}
                                            key={i}
                                            onClick={()=> this.setName(x.TO_ID , x.TO , x.fromid , x.READ)}
                                            unread={x.READ} />  
                                ))
                            }
                            </Form>
                        </Scroll>
                    </Col>
                    <Col md='9'>
                      
                                <div>   {
                                            active ? <div>
                                            <Navbar className="navbar-vertical bg-primary ">
                                                <h3 className='text-secondary'>
                                                {
                                                    istyping && typingName === name && typingDest === app.dataUser[0].USERNAME ? `${name} is Typing.....` : name
                                                }
                                                </h3>
                                            </Navbar> </div> : ''
                                        }
                                            <div  style={{ height: '392px' , overflowY:'scroll' , overflowX:'hidden' , border: '2px solid lightblue'}} id='sc'  >
                                            {
                                                active ? 
                                                chats.map((x , i) =>(
                                                    x.ID_USER === idUser ?

                                                    
                                                    <Row className="d-flex flex-row-reverse mb-1" key={i}>
                                                        <Col md='6'> 
                                                            <label className='d-flex flex-row-reverse' style={{ fontSize:'11px'}}>{date(x.DATE).format('LLL')}</label>
                                                            <MessageBox
                                                                position={'right'}
                                                                text={app.Deskripsi(x.MSG)}
                                                                date={new Date(x.DATE)}
                                                            />
                                                        </Col>
                                                    </Row>
                                                    :
                                                    <Row className="d-flex flex-row mb-1" key={i}>
                                                        <Col md='6'> 
                                                            <label className='d-flex flex-row' style={{ fontSize:'11px'}}>{date(x.DATE).format('LLL')}</label>
                                                            <MessageBox
                                                                position={'left'}
                                                                text={app.Deskripsi(x.MSG)}   
                                                                date={new Date(x.DATE)}                                                             
                                                            />
                                                        </Col>
                                                    </Row>
                                                )) : <h1 className='text-center mt-6'>Chat MTG</h1>
                                            }
                                            </div>
                                            {
                                                active ? 
                                              
                                                        <Form onSubmit={this.SendMsg}>
                                                            <Input type='text' onChange={this.setMsg} value={msg}/>
                                                        </Form>
                                                  :''
                                            }
                                
                                    </div> 
                          
                    </Col>
                </Row>
            </Page>
        )
    }
}
