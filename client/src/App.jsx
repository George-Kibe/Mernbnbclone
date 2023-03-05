import React from 'react'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import { UserContextProvider } from './UserContext'
import axios from 'axios'
axios.defaults.baseURL = "http://127.0.0.1:5000" 
//axios.defaults.withCredentials = true;
//pages
import IndexPage from "./pages/IndexPage";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PageNotFound from './pages/PageNotFound';
import ProfilePage from './pages/ProfilePage'

const router = createBrowserRouter([
  { path:"/", element: <IndexPage/> },
  { path:"/login", element: <LoginPage/> },
  { path:"/register", element: <RegisterPage/> },
  { path:"/profile/:subpage?", element: <ProfilePage/> },

  { path:"*", element: <PageNotFound/> },
])

const App = () => {
  return (
    <UserContextProvider>
      <main>
        <RouterProvider router={router}></RouterProvider>
      </main>
    </UserContextProvider>
  )
}

export default App