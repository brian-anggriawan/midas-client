import React from 'react';
import Pageadmin from 'layouts/page-admin';
import Scroll from 'simplebar-react';
import { Row , Col , CardTitle , Button , Card , Input , Progress , CardBody} from 'reactstrap';
import Detail from './list_laporan_detail';
import app from 'app';
import Select from 'react-select';
import Tabel from 'layouts/tabel';
import './analisa.css';


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
            iddpt:'',
            flagmodal:'',
            detail:[],
            modal: false
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
                   let data =[];

                   res.map(x =>
                        data.push({
                            ID_REPO: x.ID_REPO,
                            ID_REPO1: x.ID_REPO,
                            ID_REPO2: x.ID_REPO,
                            REPOSITORY: x.REPOSITORY,
                            LAST_UPLOAD: x.LAST_UPLOAD,
                            SUDAH_UPLOAD: x.SUDAH_UPLOAD,
                            BELUM_UPLOAD: x.BELUM_UPLOAD,
                            PRESENTASE: x.PRESENTASE,
                            JENIS_REPO: x.JENIS_REPO
                        })
                    
                    )
                   this.setState({
                       data: data
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
        app.apiGet1('dpt',e.value)
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
                let data =[];

                res.map(x =>
                     data.push({
                         ID_REPO: x.ID_REPO,
                         ID_REPO1: x.ID_REPO,
                         ID_REPO2: x.ID_REPO,
                         REPOSITORY: x.REPOSITORY,
                         LAST_UPLOAD: x.LAST_UPLOAD,
                         SUDAH_UPLOAD: x.SUDAH_UPLOAD,
                         BELUM_UPLOAD: x.BELUM_UPLOAD,
                         PRESENTASE: x.PRESENTASE,
                         JENIS_REPO: x.JENIS_REPO
                     })
                 )
                 this.setState({
                    data: data
                })
               })
        }else{
            if (iddpt !== '') {
                app.apiGet5('laporananalis' ,'sdsds' , idperiod , flag , period, iddpt )
                .then(res =>{
                    let data =[];

                    res.map(x =>
                         data.push({
                             ID_REPO: x.ID_REPO,
                             ID_REPO1: x.ID_REPO,
                             ID_REPO2: x.ID_REPO,
                             REPOSITORY: x.REPOSITORY,
                             LAST_UPLOAD: x.LAST_UPLOAD,
                             SUDAH_UPLOAD: x.SUDAH_UPLOAD,
                             BELUM_UPLOAD: x.BELUM_UPLOAD,
                             PRESENTASE: x.PRESENTASE,
                             JENIS_REPO: x.JENIS_REPO
                         })
                     )
                     this.setState({
                        data: data
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
                    <span>{persen || 0}%</span>
                    </div>
                </div>
                <Progress max="100" value={persen || 0} color="success" />
            </div>
        )
    }

    dptChange = (e) =>{

        let { idperiod , flag } =  this.state;

        this.setState({
            iddpt: e.value
        })

        app.apiGet5('laporananalis' ,'sdsds' , idperiod , flag , 'Harian', e.value )
               .then(res =>{
                let data =[];

                res.map(x =>
                     data.push({
                         ID_REPO: x.ID_REPO,
                         ID_REPO1: x.ID_REPO,
                         ID_REPO2: x.ID_REPO,
                         REPOSITORY: x.REPOSITORY,
                         LAST_UPLOAD: x.LAST_UPLOAD,
                         SUDAH_UPLOAD: x.SUDAH_UPLOAD,
                         BELUM_UPLOAD: x.BELUM_UPLOAD,
                         PRESENTASE: x.PRESENTASE,
                         JENIS_REPO: x.JENIS_REPO
                     })
                 )
                 this.setState({
                    data: data
                })
               })
    }

    mode = () =>{
        this.setState({
            modal: !this.state.modal
        })
    }

    Showdetail = (flag ,idrepo)=>{
        if (flag === 3) {
            app.apiGet1('repository/user',idrepo)
            .then(res =>{
                this.setState({
                    detail: res,
                    flagmodal: flag
                })
                this.mode()
            })
        }else{
            app.apiGet3('laporananalis',flag,idrepo,this.state.idperiod)
            .then(res =>{
                this.setState({
                    detail: res,
                    flagmodal:flag
                })
                this.mode()
            })
        }
        
    }
 
    sudahupload=(nilai)=>{
        let data =  this.state.data.filter(data => data.ID_REPO === nilai)[0]
        return <Button type='button' size='sm' onClick={()=> this.Showdetail(1 , nilai)} color='success' style={{width: '70px'}}>{data.SUDAH_UPLOAD}</Button>
    }

    belumupload=(nilai)=>{
        let data =  this.state.data.filter(data => data.ID_REPO === nilai)[0]
        let cek  = data.BELUM_UPLOAD;
        
        if (cek !== null) {
            return <Button type='button' size='sm' onClick={()=> this.Showdetail(2 , nilai)} color='danger' style={{width: '70px'}}>{data.BELUM_UPLOAD || 0}</Button>
        }else{
            if (data.JENIS_REPO ==='Harian' || data.JENIS_REPO ==='Insidentil' ) {
                return <Button type='button' size='sm' onClick={()=> this.Showdetail(2 , nilai)} color='danger' style={{width: '70px'}}>{25}</Button>
            }else if(data.JENIS_REPO ==='Mingguan'){
                return <Button type='button' size='sm' onClick={()=> this.Showdetail(2 , nilai)} color='danger' style={{width: '70px'}}>{4}</Button>
            }else if(data.JENIS_REPO === 'Bulanan'){
                return <Button type='button' size='sm' onClick={()=> this.Showdetail(2 , nilai)} color='danger' style={{width: '70px'}}>{1}</Button>
            }else if(data.JENIS_REPO === 'Tahunan'){
                return <Button type='button' size='sm' onClick={()=> this.Showdetail(2 , nilai)} color='danger' style={{width: '70px'}}>{1}</Button>
            }
        }
        
    }

    Showpic =(nilai)=>{
        return <Button type='button' size='sm' onClick={()=> this.Showdetail(3 , nilai)} color='info' style={{width: '70px'}}>List PIC</Button>  
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
                <Detail modal ={this.state.modal} mode={this.mode} data={this.state.detail} flag={this.state.flagmodal} />
                <Row style={{marginBottom:'20px'}}>
                    {
                        this.state.flag !== 2 ?
                         
                           <>
                                <Col sm='3'>
                                    <Input type="select" id="period" style={{ height: '39px'}} onChange={this.selectPeriod} value={this.state.idperiod}>
                                        {
                                            this.state.accperiod.map(data =>
                                            <option key={data.VCIDACCPERIOD} value ={data.VCIDACCPERIOD}>{data.VCDESCRIPTION}</option> 
                                            )
                                        }
                                    </Input>
                                </Col>
                                <Col sm='3'>
                                    <Select placeholder={'Pilih SBU'} onChange={this.dpt} options={this.state.sbu.map((x)=>({
                                        value: x.SYSTEM_ID,
                                        label: x.SBU
                                    }))} />
                                </Col>
                                <Col sm='3'>
                                    <Select placeholder={'Pilih Division'} onChange={this.dptChange} options={this.state.dpt.map((x)=>({
                                        value: x.SYSTEM_ID,
                                        label: x.DIVISION
                                    }))} />
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
                <Row>
                    <Col sm='2'>
                   
                    {
                        periode.map( data =>
                            <Card id='card' key={data.name} className='mb-3' onClick={()=> this.selectCard(data.prefix)} style={{ width: '100%' , border:'3px solid lightblue' , cursor:'pointer'}}>
                                <CardBody>
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
                                </CardBody>
                                
                            </Card> 
                        )
                    }
                    
                    </Col>
                    <Col sm='10'>
                        <Scroll>
                        <Tabel
                            data={this.state.data}
                            keyField={'ID_REPO'}
                            columns ={[
                                {
                                    dataField: 'REPOSITORY',
                                    text: 'Nama Laporan'
                                },
                                {
                                    dataField:'LAST_UPLOAD',
                                    text:'Last Upload'
                                },
                                {
                                    dataField: 'ID_REPO',
                                    text: 'Sudah Upload',
                                    formatter: this.sudahupload
                                },
                                {
                                    dataField: 'ID_REPO1',
                                    text: 'Belum Upload',
                                    formatter: this.belumupload
                                },
                                {
                                    dataField: 'ID_REPO2',
                                    text: 'PIC',
                                    formatter: this.Showpic
                                },
                                {
                                    dataField: 'PRESENTASE',
                                    text: 'Persen',
                                    formatter: this.persen
                                }
                            ]}

                            width={{ width:'300px'}}
                        
                        />
                        </Scroll>
                    </Col>
                </Row>
            </Pageadmin>
        )
    }
}


export default ListLaporanAnalisa;