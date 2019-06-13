import listRepository from "views/list-repository/list-repository";
import listFile from "views/list-file/list-file";
import listAccRepo from "views/list-access-repo/list-access-repo";
import formatFile from 'views/format-file/list-format-file';
import LaporanAnalis from 'views/laporan-analisa/list-laporan-analisa';
import Importrepo from 'views/import-repo/import-repo';
import ListUsers from './views/data-users/list-users';
import Index from 'views/index';
import Auth from 'withAuth';


 let routes;
 let data = JSON.parse(localStorage.getItem('user')) || [{ACCESS:3}];
 let user = data[0].ACCESS;



  
  if (user === 0) {
    routes =  [
      {
        path: "/index",
        name: "Home",
        icon: "ni ni-world-2 text-red",
        component: Auth(Index),
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
      {
        path: "/laporan-analisa",
        name: "Laporan Analisa",
        icon: "ni ni-single-copy-04 text-green",
        component: Auth(LaporanAnalis),
        layout: "/admin"
      },
      {
        path: "/Import-repo",
        name: "Import Repository",
        icon: "ni ni-cloud-download-95 text-gray",
        component: Auth(Importrepo),
        layout: "/admin"
      },
      {
        path: "/datausers",
        name: "Data Users",
        icon: "ni ni-circle-08 text-yellow",
        component: Auth(ListUsers),
        layout: "/admin"
      }
    ]
   }
   else if( user === 1){
    routes =  [
      {
        path: "/index",
        name: "Home",
        icon: "ni ni-world-2 text-red",
        component: Auth(Index),
        layout: "/admin"
      },
      {
        path: "/laporan-analisa",
        name: "Laporan Analisa",
        icon: "ni ni-single-copy-04 text-green",
        component: Auth(LaporanAnalis),
        layout: "/admin"
      }
     
    ]
   }
   else if( user === 2){
    routes =  [
      {
        path: "/index",
        name: "List File",
        icon: "ni ni-archive-2 text-red",
        component: Auth(listFile),
        layout: "/admin"
      },
      {
        path: "/format-file",
        name: "Format File",
        icon: "ni ni-books text-yellow",
        component: Auth(formatFile),
        layout: "/admin"
        
      },
      {
        path: "/laporan-analisa",
        name: "Laporan Analisa",
        icon: "ni ni-single-copy-04 text-green",
        component: Auth(LaporanAnalis),
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
   }
   else if( user === 3){
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


