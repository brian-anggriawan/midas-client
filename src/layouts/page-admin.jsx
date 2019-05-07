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