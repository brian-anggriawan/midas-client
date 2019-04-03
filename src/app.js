import sw from 'sweetalert2';
import Decode from 'jwt-decode';


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
    /*let header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }*/

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

    let getProfile = ()=>{
        return Decode(localStorage.getItem('token'));
    }

    let logout = ()=>{
        msgok('Berhasil Logout','/login')
        localStorage.removeItem('token')
      
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
                 getProfile ,
                 logout,
                 head1,
                 head2}