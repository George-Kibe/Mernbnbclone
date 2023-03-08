import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import toast, {Toaster} from "react-hot-toast"
import { useParams } from 'react-router-dom'
import axios from 'axios'

const PlacePage = () => {
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const {id} = useParams()

  const getPlace = async() => {
    try {
        const response = await axios.get(`/places/place/${id}`);
        //console.log(response)
        setPlace(response.data)
    } catch (error) {
        toast.error(error.message)
    }
  }

  useEffect(() => {
    if(!id){return}
    getPlace()
  }, [id])

  if (showAllPhotos) {
    return (
      <div className="absolute inset-1 bg-white m-h-screen">
        <div className="p-8 grid gap-4">
          <div>
            <h2 className="text-center text-3xl">Photos of {place.title}</h2>
            <button onClick={() => setShowAllPhotos(false)} className="fixed shadow-black flex gap-1 py-2 px-4 rounded-2xl right-12 top-8">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Close Photos
            </button>
          </div>
          {
            place?.photos?.length > 0 && place.photos.map (photo => (
              <div key={photo}>
                <img className='rounded-xl' src={`http://localhost:5000/uploads/${photo}`} alt="" />
              </div>
            ))
          }
        </div>
      </div>
    )
  }
  
  return (
    <div className='p-4 flex flex-col min-h-screen'>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <Header />
      {
        place && (
          <div className='mt-8 bg-gray-100 -mx-8 px-8 py-8'>
            <h1 className='text-2-xl'>{place.title}</h1>
            <a className='my-2 block font-semibold underline' href={`https://maps.google.com/?q=${place.address}`} target="_blank">{place.address}</a>
            <div className="grid gap-2 grid-cols-[2fr_1fr] relative">
                <div>
                    {
                      place.photos?.[0] && (
                        <img className='aspect-square object-cover rounded-xl' src={`http://localhost:5000/uploads/${place.photos[0]}`} alt="place photo" />
                      )
                    }
                </div>
                <div className='grid'>
                    <div className=''>
                      {
                        place.photos.length > 1 ? (
                          <img className='aspect-square object-cover rounded-xl' src={`http://localhost:5000/uploads/${place.photos[1]}`} alt="place photo" />
                        )
                        :(
                            <p>No Photo</p>
                        )
                      }
                    </div>
                    <div className='pt-2'>
                      {
                        place.photos.length > 2 ? (
                          <img className='aspect-square object-cover pb-2 rounded-xl' src={`http://localhost:5000/uploads/${place.photos[2]}`} alt="place photo" />
                        )
                        :(
                            <p className='text-center'>No Photo</p>
                        )
                      }
                    </div>
                </div>
                {
                  place.photos.length > 3 && (
                    <button onClick={() => setShowAllPhotos(true)} className='flex gap-1 absolute right-2 py-3 px-4 bottom-2 rounded-2xl bg-white shadow-md'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                      Show More Photos
                    </button>
                  )
                }
            </div>
          </div>
        )
      }

      <Footer />      
    </div>
  )
}

export default PlacePage