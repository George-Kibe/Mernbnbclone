import React from 'react'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
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