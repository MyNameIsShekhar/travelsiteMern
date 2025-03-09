import React from 'react'
import SearchAppBar from "../navbar/esponsiveAppBar"
import { createBrowserRouter, Form, RouterProvider } from "react-router-dom";
import "./Body.css"
import Listing from '../listing';
import Footer from '../footer';
import Show from '../Show';
import ListingForm from '../ListingForm';
import NotFound from '../../NtFound';
import SignUP from '../Signup';
import Login from '../Login';
const Body = () => {

  const appRout = createBrowserRouter([
    {
      path: "/listings",
      element: <Listing/>,
    },
    {
      path: "/show/:id", 
      element: <Show/>,
    },
    {
      path: "/form", 
      element: <ListingForm/>,
    },
    {
      path: "/signup", 
      element: <SignUP/>,
    },
    {
      path: "/login", 
      element: <Login/>,
    },
    {
      path: "*", 
      element: <NotFound/>,
    }
  ]);
  return (
    <div>
      <SearchAppBar classname="nabbar"/>
      <RouterProvider router={appRout}/>
      <Footer/>
    </div>
  )
}

export default Body
