import listUpload from "views/list-upload/list-upload.jsx";

var routes = [
  {
    path: "/index",
    name: "List File",
    icon: "ni ni-laptop text-blue",
    component: listUpload,
    layout: "/admin"
  },
  {
    path: "/inbox",
    name: "Inbox",
    icon: "ni ni-email-83 text-orange",
    component: listUpload,
    layout: "/admin"
  },
  {
    path: "/send",
    name: "Send File",
    icon: "ni ni-send text-green",
    component: listUpload,
    layout: "/admin"
  }

];
export default routes;
