import sw from 'sweetalert2';


let encode = (file)=>{

var reader = new FileReader();
reader.onloadend = ()=>{
    return reader.result;
}

return reader.readAsDataURL(file)

    
}

let proxy = 'http://192.168.40.88:4000/';

let apiGet = (url)=>{
    return fetch(proxy+url , {
        method: 'get'
    })
    .then(res => res.json())
    .then(data =>{
        return data
    })
}

let apiGet1 = (url , params1)=>{
    return fetch(proxy+url+'/'+params1 , {
        method: 'get'
    })
    .then(res => res.json())
    .then(data =>{
        return data
    })
}

let apiGet2 = (url , params1 , params2)=>{
    return fetch(proxy+url+'/'+params1+'/'+params2 , {
        method: 'get'
    })
    .then(res => res.json())
    .then(data =>{
        return data
    })
}


let apiPostFormdata = (url , data)=>{
    return fetch(proxy+url,{
        method: 'post',
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
        headers: { 'Content-Type':'application/json'},
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data =>{
        return data;
    })
}

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


export default { encode , proxy , apiGet , apiGet1 , apiGet2 ,apiPostJson ,apiPostFormdata , msgerror , msgok}