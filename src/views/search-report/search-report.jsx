import React, { Component } from 'react';
import Page from 'layouts/page-admin';
import Autosuggest from 'react-autosuggest';
import './src.css';
import { Row , 
         Col , 
         Button,
         ListGroupItem,
         ListGroup,
         Pagination, 
         PaginationItem, 
         PaginationLink
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
          filtervalue:'',
          currentPage: 1,
          todosPerPage: 5
        }
        this.handleClick = this.handleClick.bind(this);
      }

      handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
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

        const { value, suggestions , result , filtervalue  , currentPage, todosPerPage} = this.state;

        const inputProps = {
        placeholder: 'Cari Laporan Anda',
        value,
        onChange: this.onChange
        };

        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = result.slice(indexOfFirstTodo, indexOfLastTodo);


        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(result.length / todosPerPage); i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
          if (number === this.state.currentPage) {
            return (
              <PaginationItem key={number} className='active'>
                <PaginationLink  id={number} onClick={this.handleClick}>
                  { number }
                </PaginationLink>
              </PaginationItem>
            );   
          }else{
            return(
             <PaginationItem key={number}>
                <PaginationLink  id={number} onClick={this.handleClick}>
                  { number }
                </PaginationLink>
              </PaginationItem>
            )
          }
        });

        const data =  currentTodos.filter(x => { 
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
                                className="list-group-item-action align-items-start"
                                onClick={e => e.preventDefault()}
                                style={{ height:'100px'}}
                            >
                                <div className="d-flex w-100 justify-content-between">
                                    <Button size='sm' color='success' onClick={()=> this.Downloadfile(x.ID_FILE , x.ORIGINAL_NAME)}> Download </Button>
                                <small>
                                    {`${x.DIVISION} ${x.PERIODE}`}
                                </small>
                                </div>
                                <h4 className='mt-1'>{x.REPO}</h4>
                                <p className="text-sm mt--2">
                                {`${x.JENIS_REPO} ${x.TEMPLATE_NAME} ${x.DTUPLOAD}`}
                                </p>
                            </ListGroupItem>
                        </ListGroup>))  }  
                        </div>
                }
                <nav aria-label="Page navigation example" className='mt-2' >
                  <Pagination
                    className="pagination justify-content-center"
                    listClassName="justify-content-center"
                  >
                  {renderPageNumbers}
                </Pagination>
              </nav>
           
            </Page>
        )
    }
}
