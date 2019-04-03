import React from "react";
import {  } from "reactstrap";
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
  Container
} from "reactstrap";
import app from 'app';


class Auth extends React.Component {
  constructor(){
    super()
    this.state = {
      name:'',
      pass: ''
    }
  }

  componentDidMount() {
    document.body.classList.add("bg-default");
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-default");
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
              <div className="header-body text-center mb-7">
                <Row className="justify-content-center">
                  <Col lg="5" md="6">
                    <h1 className="text-white">Selamat Datang</h1>
                    <p className="text-lead text-light">
                      Mustikatama Document<br/>
                      Archive System
                    </p>
                      <Card className="bg-secondary shadow border-0">
                      <CardHeader className="bg-transparent pb-3">
                        <div className="text-muted text-center mt-2 mb-2">
                          <h1>LOGIN</h1>
                        </div>
                      </CardHeader>
                      <CardBody className="px-lg-5 py-lg-5">
                        <Form role="form">
                          <FormGroup className="mb-3">
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-email-83" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input placeholder="Username" type="text"  onChange={name}/>
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
                            <Button className="my-4" color="primary" type="button" onClick={login}>
                              Login
                            </Button>
                          </div>
                        </Form>
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
