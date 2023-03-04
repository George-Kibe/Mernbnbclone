import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <div className='p-4 flex flex-col min-h-screen'>
      <Header />
        <div className='mt-4 grow flex items-center justify-around'>
          <div className="mb-64">
            <h2 className='text-2xl text-center mb-4'>Login</h2>
            <form className='max-w-md mx-auto'>
              <input type="email" placeholder="youremail@email.com" />
              <input type="password" placeholder='password' />
              <button className='primary'>Login</button>
              <div className="text-center py-2 text-gray-500">
                Don't have an account yet? <Link className='text-black' to={"/register"}>Register Now</Link>
              </div>
            </form>
          </div>
        </div>
      <Footer />
    </div>
  )
}

export default LoginPage