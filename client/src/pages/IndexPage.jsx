import { Link } from "react-router-dom";
import toast, {Toaster} from "react-hot-toast"
import Header from "../components/Header";
import Footer from "../components/Footer"

const IndexPage = () => {
  return (
    <div className='p-4 flex flex-col min-h-screen'>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <Header />
      <div className='mt-4 grow flex-col items-center'>
        HomePage
      </div>
      <Footer />
    </div>
  )
}

export default IndexPage;
