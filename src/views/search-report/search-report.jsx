import React, { Component } from 'react';
import Page from 'layouts/page-admin';
import Autosuggest from 'react-autosuggest';
import './src.css';
import { Row , 
         Col , 
         Button,
         ListGroupItem,
         ListGroup
        } from 'reactstrap';
import app from 'app';
import download from 'downloadjs';
import Loading from 'layouts/loading-modal';
import Select from 'react-select';


export default class SearchReport  extends Component {
    constructor() {
        super();
        this.state = {
          value: '',
          suggestions: [],
          laporan: [],
          result: [],
          modal: false,
          accperiod:[],
          filtervalue:''
        };
      }

      componentWillMount(){
        let user = app.dataUser[0].ACCESS;
        let dpt = app.dataUser[0].IDDPT || 'IDO';

        app.apiGet2('search/repo',user , dpt)
           .then(res=>{
               this.setState({ laporan: res});
           })
        
        app.apiGet('accperiod')
           .then(res =>{
             this.setState({
               accperiod: res
            })

        })
      }

    
      getSuggestions = value => {
        let { laporan } = this.state;
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
      
        return inputLength === 0 ? [] : laporan.filter(x =>
          x.REPOSITORY.toLowerCase().slice(0, inputLength) === inputValue
        );

      };
      
    
      getSuggestionValue = suggestion => suggestion.REPOSITORY;
    
      renderSuggestion = suggestion => (
        <div>
          {suggestion.REPOSITORY}
        </div>
      );
    
      onChange = (event, { newValue }) => {
        this.setState({
          value: newValue
        });
      };
    
      onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
          suggestions: this.getSuggestions(value)
        });

      };
    
      onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: []
        });
      };

      Search =()=>{
          let { value } = this.state;
          app.apiGet1('search/file',value || 'test')
             .then(res =>{
                 this.setState({ result: res})
             })

      }

      mode =()=>{
        this.setState({
            modal: !this.state.modal
        })
     }   

      async Downloadfile(id , name){

        this.mode();
 
        let res = await fetch(app.proxy+'downloadfile/'+id ,{
            method: 'get',
            headers: app.head2
        });
 
        if (res) {
         let blob = await res.blob();
     
         download(blob , name);
         this.mode();
         app.apiGet1('deletefile',id)  
 
        }
     }

     FilterResult = (e)=>{
        this.setState({ filtervalue: e.value});
     }

    
    render() {

        const { value, suggestions , result , filtervalue } = this.state;

        const inputProps = {
        placeholder: 'Cari Laporan Anda',
        value,
        onChange: this.onChange
        };

        const data =  result.filter(x => { 
            return x.ID_PERIOD.toLowerCase().includes(filtervalue.toLowerCase())
        });
          
        return (
            <Page head={'Pencarian Laporan'}>
                <Loading modal={this.state.modal} text={'Proses Download'}/>
                <Row className='mb-3'>
                    <Col md='12'>
                    <Autosuggest 
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={this.getSuggestionValue}
                        renderSuggestion={this.renderSuggestion}
                        inputProps={inputProps}
                    />
                    </Col>
                </Row> 
                <Button color='primary' onClick={this.Search}> Search </Button>
                <hr />
                {  
                    result.length === 0 ? <div className='text-center'><h1> Data Tidak Ada </h1></div> :<div>
                    <div className='row mb-2'>
                        <Select id='period' className='col-3' onChange={this.FilterResult} placeholder={'Filter Periode'}  options={this.state.accperiod.map((x)=>({
                            value: x.VCIDACCPERIOD,
                            label: x.VCDESCRIPTION
                        }))} />
                        <Button color='danger' size='sm' onClick={()=> this.setState({ filtervalue: ''})} className='col-1'>Clear Filter</Button>
                    </div>
                   
                    {
                    data.map(x =>(
                        <ListGroup flush key={x.ID_FILE}>
                            <ListGroupItem
                                className="list-group-item-action flex-column align-items-start py-4 px-4"
                                onClick={e => e.preventDefault()}
                            >
                                <div className="d-flex w-100 justify-content-between">
                                <div>
                                    <div className="d-flex w-100 align-items-center">
                                    <Button size='sm' color='success' onClick={()=> this.Downloadfile(x.ID_FILE , x.ORIGINAL_NAME)}> Download </Button>
                                    </div>
                                </div>
                                <small>
                                    {`${x.DIVISION} ${x.PERIODE}`}
                                </small>
                                </div>
                                <h4 className="mt-3 mb-1">{x.REPO}</h4>
                                <p className="text-sm mb-0">
                                {`${x.JENIS_REPO} ${x.TEMPLATE_NAME} ${x.DTUPLOAD}`}
                                </p>
                            </ListGroupItem>
                        </ListGroup>))  }  
                        </div>
                }
            </Page>
        )
    }
}
