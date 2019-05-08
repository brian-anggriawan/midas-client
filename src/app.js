import sw from 'sweetalert2';
import Decode from 'jwt-decode';
const redux  =  require('redux');

/* Variable Global */
    let optionTable = {
            sizePerPage: 10,
            hideSizePerPage: true,
            prePage: 'Back',
            nextPage: 'Next',
        };



/* Variable Global */
let encode = (file)=>{

var reader = new FileReader();
reader.onloadend = ()=>{
    return reader.result;
}

return reader.readAsDataURL(file)

    
}

/* API */

    let proxy = 'http://192.168.40.88:4000/api/';
    let proxylogin = 'http://192.168.40.88:4000/login';
    let browserStorage = JSON.parse(localStorage.getItem('user')) || [{IDLOGIN:'00001'}];
    let dataUser = browserStorage; 

    let token = 'Bearer ' + localStorage.getItem('token');
    let head1 = {
        'Content-Type': 'application/json',
        'Authorization': token
    };

    let head2 = {
        'Authorization': token
    }

    let apiGet = (url)=>{
        return fetch(proxy+url , {
            method: 'get',
            headers: head1
        })
        .then(res => res.json())
        .then(data =>{
            return data
        })     
    }

    let apiGet1 = (url , params1)=>{
        return fetch(proxy+url+'/'+params1 , {
            method: 'get',
            headers: head1

        })
        .then(res => res.json())
        .then(data =>{
            return data
        })
    }

    let apiGet2 = (url , params1 , params2)=>{
        return fetch(proxy+url+'/'+params1+'/'+params2 , {
            method: 'get',
            headers: head1
        })
        .then(res => res.json())
        .then(data =>{
            return data
        })
    }


    let apiPostFormdata = (url , data)=>{
        return fetch(proxy+url,{
            method: 'post',
            headers: head2,
            body: data
        })
        .then(res => res.json())
        .then(data =>{
            return data;
        })
    }


    let apiPostJson = (url , data)=>{
        return fetch(proxy+url,{
            method: 'post',
            headers: head1,
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data =>{
            return data;
        })
    }

    let apiUpdate = (url , data) =>{
        return fetch(proxy+url ,{
            method: 'put',
            headers: head1,
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data =>{
            return data;
        })
    }

    let apiLogin = (data)=>{
        return fetch(proxylogin,{
            method: 'post',
            headers: { 'Content-Type':'application/json'},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data =>{
            return data;
        })
    }

    let apiDelete = (url , data) =>{
        return fetch(proxy + url ,{
            method: 'delete',
            headers: head1,
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data =>{
            return data
        })
    }

/* API */

/* SWET ALERT */
    let msgerror = (msg) =>{
        sw.fire({
        type: 'error',
        title: 'Oops...',
        text: msg
        })
    }

    let msgok =(msg , url)=>{
        sw.fire({
            type: "success",
            title: "Berhasil",
            text: msg  
        }).then(()=>{
            window.location.href = url
        })
    }
/* SWET ALERT */

/* REDUX */

let createStore = redux.createStore;
let reduxState = {
    user: [],
    modal: false
}

let rootReducer = (state = reduxState , action)=>{
    switch(action.type){
        case 'MODAL':
            return{
                ...state,
                modal: !state.modal
            }
       
        default:
            return state
    }

}

let store = createStore(rootReducer);




/* REDUX */

/* Auth */

    let login = (user , pass)=>{
        let data = {
            name: user,
            pass: pass
        }
        return apiLogin(data)
                .then(res =>{
                    if (res.sucess) {
                        localStorage.setItem('token',res.token)
                        localStorage.setItem('user', JSON.stringify(res.data))
                        msgok('Berhasil Login','/') 
                    }else{
                        msgerror('Username Dan Password Salah')
                    }
                })
    }

    let loggedin = ()=>{
        let token = localStorage.getItem('token');
        return !!token && !isTokenExpired(token)
    

    }

    let isTokenExpired = (token)=>{
        try{
            let decode = Decode(token);

            if (decode.exp < Date.now() / 1000){
                return true
            }else{
                return false
            }
        }

        catch(err){
            return false;
        }
    }


    let logout = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        msgok('Berhasil Logout','/login');
        
      
    }


/* Auth */


export default { encode , 
                 proxy , 
                 apiGet , 
                 apiGet1 , 
                 apiGet2 ,
                 apiPostJson ,
                 apiPostFormdata , 
                 msgerror , 
                 msgok ,
                 login , 
                 loggedin ,
                 logout,
                 head1,
                 store,
                 dataUser,
                 optionTable,
                 apiDelete,
                 apiUpdate,
                 head2}