import React from 'react';
import {
    Card,
    CardHeader,
    Container,
    Row,
    Col
  } from "reactstrap";
  import Header from "components/Headers/Header";
  import app from 'app';


class Pageadmin extends React.Component{
    constructor(props){
        super(props)

        this.state ={
            
        }
    }

    render(){
        return(
            <>
                <Header />
                <Container className=" mt--9" fluid>
                <Row>
                    <div className=" col">
                        <Card className='mb-1 float-right' style={{width:'200px'}}>
                            <Row>
                                <Col className="col-auto ml-4 mt-2">
                                    <a
                                        className="avatar avatar-xl rounded-circle"
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                    >
                                    <img
                                        alt="..."
                                        src={require("assets/img/theme/man.png")}
                                    />
                                    </a>
                                </Col>
                                    <div className="col ml--2 mt-2">
                                        <h4 className="mb-0">{app.dataUser[0].USERNAME}</h4>
                                        <span className="text-success">●</span>
                                        <small>Active</small>
                                    </div>  
                            </Row>
                        </Card>
                    </div>
                </Row>
                
                    <Row>
                        <div className=" col">

                            <Card className=" bg-gradient-secondary">
                                <CardHeader style={{ marginBottom: '20px'}}> 
                                    <h3 className=" mb-0">{this.props.head}</h3>
                                </CardHeader>
                                <div className="container-fluid" style={{marginBottom: '20px'}}>
                                    {this.props.children}
                                </div>
                            </Card>
                        </div>
                    </Row>
                </Container>
            </>
        )
    }

}

export default Pageadmin;