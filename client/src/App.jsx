import React from 'react'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import axios from 'axios'
axios.defaults.baseURL = "http://localhost:5000" 
//pages
import IndexPage from "./pages/IndexPage";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PageNotFound from './pages/PageNotFound';

const router = createBrowserRouter([
  { path:"/", element: <IndexPage/> },
  { path:"/login", element: <LoginPage/> },
  { path:"/register", element: <RegisterPage/> },

  { path:"*", element: <PageNotFound/> },
])

const App = () => {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  )
}

export default App