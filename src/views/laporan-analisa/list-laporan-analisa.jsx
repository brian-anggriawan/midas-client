import React from 'react';
import Pageadmin from 'layouts/page-admin';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Scroll from 'simplebar-react';
import { Row , Col , CardTitle , Button , Input , Progress} from 'reactstrap';
import app from 'app';


class ListLaporanAnalisa extends React.Component{
    constructor(){
        super()
        this.state={
            accperiod:[],
            idperiod: app.dataUser[0].ID_PERIOD,
            flag: app.dataUser[0].ACCESS,
            iduser: app.dataUser[0].IDLOGIN,
            data:[],
            sbu:[],
            dpt:[],
            iddpt:''
        }
    }


    componentWillMount(){
        let { idperiod , iduser , flag} =  this.state;

        app.apiGet('accperiod')
           .then(res =>{
             this.setState({
               accperiod: res
             })
           })

        if (flag === 2) {
            app.apiGet5('laporananalis' ,iduser , idperiod , flag , 'Harian','sss' )
               .then(res =>{
                   this.setState({
                       data: res
                   })
               })
        }else{
            app.apiGet('sbu')
                .then(res =>{
                    this.setState({
                        sbu: res
                    })
                })
        }
    }

    dpt = (e)=>{
        app.apiGet1('dpt',e.target.value)
           .then(res =>{
               this.setState({
                   dpt: res
               })
           })  
    }

    selectPeriod =(e)=>{
        this.setState({
              idperiod: e.target.value
        })
    }

    selectCard = (period) => {
        let { idperiod , iduser , flag ,iddpt} =  this.state;

        if (flag === 2) {
            app.apiGet5('laporananalis' ,iduser , idperiod , flag , period,'45454' )
               .then(res =>{
                   this.setState({
                       data: res
                   })
               })
        }else{
            if (iddpt !== '') {
                app.apiGet5('laporananalis' ,'sdsds' , idperiod , flag , period, iddpt )
                .then(res =>{
                    this.setState({
                        data: res
                    })
                })   
            }else{
                app.msgerror('Pilih SBU Dan Division')
            }
            
        }  
    }

    persen = (persen)=>{
        return (
            <div id='persen' className=''>
                <div className="progress-info">
                    <div className="progress-percentage">
                    <span>{persen}%</span>
                    </div>
                </div>
                <Progress max="100" value={persen} color="success" />
            </div>
        )
    }

    dptChange = (e) =>{

        let { idperiod , flag } =  this.state;

        this.setState({
            iddpt: e.target.value
        })

        app.apiGet5('laporananalis' ,'sdsds' , idperiod , flag , 'Harian', e.target.value )
               .then(res =>{
                   this.setState({
                       data: res
                   })
               })
    }
    
    render(){
        let periode = [
            {
                name: 'Laporan Harian',
                prefix: 'Harian'
            },
            {
                name: 'Laporan Mingguan',
                prefix: 'Mingguan'
            },
            {
                name: 'Laporan Bulanan',
                prefix: 'Bulanan'
            },
            {
                name: 'Laporan Tahunan',
                prefix: 'Tahunan'
            },
            {
                name: 'Laporan Insidentil',
                prefix: 'Insidentil'
            }
        ]

        return(
            <Pageadmin head={'Laporan Analisa'}>
                <Row style={{marginBottom:'20px'}}>
                    {
                        this.state.flag !== 2 ?
                         
                           <>
                                <Col sm='3'>
                                    <Input type="select" id="period" onChange={this.selectPeriod} value={this.state.idperiod}>
                                        {
                                            this.state.accperiod.map(data =>
                                            <option key={data.VCIDACCPERIOD} value ={data.VCIDACCPERIOD}>{data.VCDESCRIPTION}</option> 
                                            )
                                        }
                                    </Input>
                                </Col>
                                <Col sm='3'>
                                    <Input type='select' onChange={this.dpt} id="sbu">
                                        <option value="0">Pilih SBU</option>
                                            {
                                                this.state.sbu.map(data =>
                                                <option key={data.SYSTEM_ID} value={data.SYSTEM_ID}>{data.SBU}</option>   
                                                )
                                            }
                                    </Input>
                                </Col>
                                <Col sm='3'>
                                    <Input type='select' onChange={this.dptChange} id="dpt">
                                        <option value="0">Pilih Division</option>
                                        {
                                            this.state.dpt.map(data =>
                                                <option key={data.SYSTEM_ID} value={data.SYSTEM_ID}>{data.DIVISION}</option>    
                                            )
                                        }
                                    </Input>
                                </Col>
                            </>
                        : <Col md='3'>
                            <Input type="select" id="period"  style={{marginBottom: '10px'}}  onChange={this.selectPeriod} value={this.state.idperiod}>
                            {
                                this.state.accperiod.map(data =>
                                <option key={data.VCIDACCPERIOD} value ={data.VCIDACCPERIOD}>{data.VCDESCRIPTION}</option> 
                                )
                            }
                            </Input>
                        </Col>
                    }
                </Row>
                <Row >
                    <Col sm='2'>
                    {
                        periode.map( data =>
                            <Button  key={data.name} className='mb-3' onClick={()=> this.selectCard(data.prefix)}  color="default" outline type='button' style={{ width: '100%'}}>
                                <Row>
                                    <div className="col">
                                        <CardTitle className="font-weight-bold" style={{marginTop:'10px'}}>
                                            {data.name}
                                        </CardTitle>
                                    </div>
                                    <div className="col">
                                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                            <i className="fas fa-chart-bar" />
                                        </div>
                                    </div>
                                </Row>
                            </Button> 
                        )
                    }
                    </Col>
                    <Col sm='10'>
                        <Scroll>
                        <BootstrapTable
                                data={this.state.data}
                                bordered={false}
                                striped
                                pagination={true}
                                options={app.optionTable}>
                                <TableHeaderColumn
                                    dataField='REPOSITORY'
                                    width='30%'
                                    isKey = {true}
                                    dataSort>
                                    Nama Laporan
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField='LAST_UPLOAD'
                                    width='20%'
                                    dataSort>
                                    Last Upload
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField='SUDAH_UPLOAD'
                                    width='16%'
                                    dataSort>
                                    Sudah Upload
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField='BELUM_UPLOAD'
                                    width='16%'
                                    dataSort>
                                    Belum Upload
                                </TableHeaderColumn>      
                                <TableHeaderColumn
                                    dataField='PRESENTASE'
                                    dataFormat={this.persen}
                                    width='16%'
                                    dataSort>
                                    Persen
                                </TableHeaderColumn>
                            </BootstrapTable>
                        </Scroll>
                    </Col>
                </Row>
            </Pageadmin>
        )
    }
}


export default ListLaporanAnalisa;