import React from "react";
import { Route } from "react-router-dom";
// reactstrap components
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

// core components
import AuthFooter from "components/Footers/AuthFooter.jsx";


class Auth extends React.Component {
  componentDidMount() {
    document.body.classList.add("bg-default");
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  render() {
    return (
      <>
        <div className="main-content">
          <div className="header bg-gradient-info py-5 py-lg-2">
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
                              <Input placeholder="Username" type="text" />
                            </InputGroup>
                          </FormGroup>
                          <FormGroup>
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-lock-circle-open" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input placeholder="Password" type="password" />
                            </InputGroup>
                          </FormGroup>
                          <div className="text-center">
                            <Button className="my-4" color="primary" type="button">
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
        <AuthFooter />
      </>
    );
  }
}

export default Auth;
