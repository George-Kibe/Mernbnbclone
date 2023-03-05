import React, { useContext } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import toast, {Toaster} from "react-hot-toast"
import Footer from '../components/Footer'
import Header from '../components/Header'
import { UserContext } from '../UserContext'

const ProfilePage = () => {
  const {user, ready, setUser} = useContext(UserContext);
  const navigate = useNavigate()
  let {subpage} =useParams();
  if (subpage === undefined) {
    subpage = "profile"
  }
  //console.log(subpage)
  
  const linkClasses = (type=null) => {
    let classes = "py-2 px-6"
    if (type === subpage) {
        classes += " bg-primary text-white rounded-full"
    }
    return classes;
  }

  const logoutUser = () => {
    setUser(null)
    localStorage.clear()
    navigate('/') 
    toast.success("Logged out successfully")
  }

  if(!ready){
    return "Loading..."
  }

  if (ready && !user) {
    toast.error("You need to Login First!")
    return <Navigate to={"/login"} />
  }
  return (
    <div className='p-4 flex flex-col min-h-screen'>
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <Header />
        <div className='mt-4 grow flex-col items-center'>
            <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
            <Link className={linkClasses("profile")} to={"/profile"}>My Profile</Link>
            <Link className={linkClasses("bookings")} to={"/profile/bookings"}>My Bookings</Link>
            <Link className={linkClasses("places")} to={"/profile/places"}>My Accomondations</Link>
            </nav>
            {
                subpage === "profile" && (
                    <div className="text-center flex-col max-w-lg mx-auto">
                        Logged in as {user.name} ({user.email})
                        <button onClick={logoutUser} className="primary max-w-sm mt-2">Logout</button>
                    </div>
                )
            }
        </div>
        <Footer />
    </div>
  )
}

export default ProfilePage