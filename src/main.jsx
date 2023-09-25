import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Signup } from './pages/singup.jsx'
import { Login } from './pages/login.jsx'
import {RouterProvider, createBrowserRouter} from "react-router-dom";
const router = createBrowserRouter([{


  path: "/WARGERS/",
element: <App/>,
    children: [{
    path: "/pages/",
      element: <Signup />},
      {
        path: "/pages/l",
      element: <Login />
      },
],
},])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router}/>
  </React.StrictMode>,
)
