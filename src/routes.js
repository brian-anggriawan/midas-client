import listRepository from "views/list-repository/list-repository.jsx";
import listFile from "views/list-file/list-file";



var routes = [
  {
    path: "/index",
    name: "Master Report",
    icon: "ni ni-laptop text-blue",
    component: listRepository,
    layout: "/admin"
  },
  {
    path: "/listfile",
    name: "List File",
    icon: "ni ni-archive-2 text-red",
    component: listFile,
    layout: "/admin"
  },
  {
    path: "/inbox",
    name: "Inbox",
    icon: "ni ni-email-83 text-orange",
    component: listRepository,
    layout: "/admin"
  },
  {
    path: "/send",
    name: "Send File",
    icon: "ni ni-send text-green",
    component: listRepository,
    layout: "/admin"
  }

];
export default routes;
