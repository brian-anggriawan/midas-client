import React from "react";
import classnames from "classnames";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col ,
  Container,
  TabPane,
  TabContent,
  NavLink,
  NavItem,
  Nav
} from "reactstrap";
import app from 'app';
import Select from 'react-select';
import Serialize from 'form-serialize';
const proxy = 'http://apimidas.mustikatama.com/';

class Auth extends React.Component {
  constructor(){
    super()
    this.state = {
      name:'',
      pass: '',
      tabs: 1,
      sbu:[],
      dpt:[]
    }

    this.daftar = this.daftar.bind(this);
  }

  componentDidMount() {
    document.body.classList.add("bg-default");
  }

  componentWillMount(){
    fetch(`${proxy}sbu` ,{
      method: 'get'
    }).then(res => res.json())
      .then(data =>{
        this.setState({ sbu : data})
      })
  }

  componentWillUnmount() {
    document.body.classList.remove("bg-default");
   
  }

  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index
    });
  };

  dpt = (e)=>{
    fetch(`${proxy}dpt/${e.value}`,{
      method:'get'
    }).then(res => res.json())
      .then(data =>{
        this.setState({ dpt: data })
      })
}

daftar(){
  let form = document.getElementById('daftar');
  let hasil = Serialize( form , { hash: true });
  let count = Object.keys(hasil).length

  if (count !== 4) {
    app.msgerror('Masih Ada Yang Kosong')
  }else{
    fetch(`${proxy}cekuser/${hasil.name}`,{
      method:'get'
    }).then(res => res.json())
      .then(data =>{
        if (data) {
          app.msgerror('Username Sudah Ada')
        }else{
          fetch(`${proxy}daftar`,{
            method:'post',
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify(hasil)
          }).then(res => res.json)
            .then(data=>{
              this.setState({ tabs : 1 });
              form.reset();
            })
        }
      })
   
  }
}



  render() {
    
    let name =  (e)=>{
      this.setState({
        name: e.target.value
      })
    }

    let pass = (e)=>{
      this.setState({
        pass: e.target.value
      })
    }


    let login = ()=>{
        let name = this.state.name,
            pass = this.state.pass;
        app.login(name , pass)
    }

    

    return (
      <>
        <div className="main-content">
          <div className="header bg-gradient-info py-5 py-lg-3">
            <Container>
              <div className="header-body text-center mb-4">
                <Row className="justify-content-center">
                  <Col lg="5" md="6">
                    <h1 className="text-white">Selamat Datang</h1>
                    <p className="text-lead text-light">
                      Mustikatama Document<br/>
                      Archive System
                    </p>
                    <div className="nav-wrapper">
          <Nav
            className="nav-fill flex-column flex-md-row"
            id="tabs-icons-text"
            pills
            role="tablist"
          >
            <NavItem>
              <NavLink
                aria-selected={this.state.tabs === 1}
                className={classnames("mb-sm-3 mb-md-0", {
                  active: this.state.tabs === 1
                })}
                onClick={e => this.toggleNavs(e, "tabs", 1)}
                href="#"
                role="tab"
              >
                <i className="ni ni-single-02 mr-2" />
                
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                aria-selected={this.state.tabs === 2}
                className={classnames("mb-sm-3 mb-md-0", {
                  active: this.state.tabs === 2
                })}
                onClick={e => this.toggleNavs(e, "tabs", 2)}
                href="#"
                role="tab"
              >
                <i className="ni ni-collection mr-2" />
                Daftar
              </NavLink>
            </NavItem>
          </Nav>
        </div>
        <Card className="shadow">
          <CardBody>
            <TabContent activeTab={"tabs" + this.state.tabs}>
              <TabPane tabId="tabs1">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-transparent pb-3">
                    <div className="text-muted text-center">
                      <h1>LOGIN</h1>
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <Form role="form">
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-email-83" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Username" type="text" onChange={name}/>
                        </InputGroup>
                      </FormGroup>                 
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Password" type="password" onChange = {pass} />
                        </InputGroup>
                      </FormGroup>                                      
                      <div className="text-center">
                        <Button className="my-4 btn-block" color="primary" type="button" onClick={login}>
                          Login
                        </Button>
                      </div>
                      </Form>                                   
                    </CardBody>
                  </Card>
                </TabPane>
                <TabPane tabId="tabs2">
                  <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-transparent pb-3">
                      <div className="text-muted text-center">
                        <h1>DAFTAR</h1>
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <Form role="form" id='daftar'>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-email-83" />
                                  </InputGroupText>
                              </InputGroupAddon>
                              <Input placeholder="Username" type="text" name='name' />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-lock-circle-open" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Password" type="password" name='pas' />
                          </InputGroup>
                        </FormGroup>          
                        <FormGroup>
                        <Select placeholder={'Pilih SBU'} onChange={this.dpt} name='sbu' options={this.state.sbu.map((x)=>({
                                        value: x.SYSTEM_ID,
                                        label: x.SBU
                                    }))} />
                 
                        </FormGroup>
                        <FormGroup>
                        <Select placeholder={'Pilih Division'} name='dpt'  options={this.state.dpt.map((x)=>({
                                        value: x.SYSTEM_ID,
                                        label: x.DIVISION
                                    }))} />
                 
                        </FormGroup>                                    
                        <div className="text-center">
                          <Button className="my-4 btn-block" color="primary" type="button"onClick={this.daftar}>
                            Daftar
                          </Button>
                        </div>
                        </Form>                                   
                      </CardBody>
                    </Card>
                          </TabPane>
                        </TabContent>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Container>
          </div>
        </div> 
      </>
    );
  }
}

export default Auth;
