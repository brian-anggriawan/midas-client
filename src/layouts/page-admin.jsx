import React from 'react';
import {
    Card,
    CardHeader,
    Container,
    Row
  } from "reactstrap";
  import Header from "components/Headers/Header.jsx";


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
                <Container className=" mt--7" fluid>
                    <Row>
                        <div className=" col">
                            <Card className=" bg-gradient-secondary">
                                <CardHeader>
                                    <h3 className=" mb-0">{this.props.head}</h3>
                                </CardHeader><br/>
                                <div className="container-fluid">
                                    {this.props.children}
                                </div><br/>
                            </Card>
                        </div>
                    </Row>
                </Container>
            </>
        )
    }

}

export default Pageadmin;