import listRepository from "views/list-repository/list-repository.jsx";
import listFile from "views/list-file/list-file";
import listAccRepo from "views/list-access-repo/list-access-repo";
import Auth from 'withAuth';


 let routes;
 let data = JSON.parse(localStorage.getItem('user')) || [{IDLOGIN:'00001'}];
 let user = data[0].IDLOGIN;



  
  if (user === 'TEST003') {
    routes =  [

      {
        path: "/listrepository",
        name: "Master Report",
        icon: "ni ni-laptop text-blue",
        component: Auth(listRepository),
        layout: "/admin"
      },
      {
        path: "/listaccrepo",
        name: "Accsess Repository",
        icon: "ni ni-folder-17 text-orange",
        component: Auth(listAccRepo),
        layout: "/admin"
      }
    
    
    ]
  
  
   }else{
    routes =  [
      {
        path: "/index",
        name: "List File",
        icon: "ni ni-archive-2 text-red",
        component: Auth(listFile),
        layout: "/admin"
      }]
   }
 
  /*


  let routes = [
    {
      path: "/index",
      name: "List File",
      icon: "ni ni-archive-2 text-red",
      component: Auth(listFile),
      layout: "/admin"
    },
    {
      path: "/listrepository",
      name: "Master Report",
      icon: "ni ni-laptop text-blue",
      component: Auth(listRepository),
      layout: "/admin"
    },
    {
      path: "/listaccrepo",
      name: "Accsess Repository",
      icon: "ni ni-folder-17 text-orange",
      component: Auth(listAccRepo),
      layout: "/admin"
    },


  ] */
export default routes;


