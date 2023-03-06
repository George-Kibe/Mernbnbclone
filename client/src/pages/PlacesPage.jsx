import axios from 'axios';
import React, { useState } from 'react'
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom'
import Perks from '../components/Perks';

const PlacesPage = ({toast, ownerId}) => {
  const navigate = useNavigate();
  const {action} = useParams();
  //states
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [addedPhotos, setAddedPhotos] = useState([])
  const [photoLink, setPhotoLink] = useState('')
  const [description, setDescription] = useState('')
  const [perks, setPerks] = useState([])
  const [extraInfo, setExtraInfo] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState("")
  const [maxGuests, setMaxGuests] = useState(1)

  const addPhotoByLink = async(e) => {
    e.preventDefault()
    try {
        const response = await axios.post("/upload-by-link", {link:photoLink})
        console.log(response.status)
        toast.success("adding photo")
        const {data:filename} = response;
        setAddedPhotos(prev => {
            return [...prev, filename]
        });
        toast.success("Photo uploaded successfully")
        setPhotoLink("")
    } catch (error) {
        console.log(error)
        toast.error("File upload failed! Try Again")
    }
  }

  const uploadPhoto = async(e) => {
    const files = e.target.files;
    //console.log(files[0])
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
        data.append("photos", files[i]);        
    }
    try {
        const response = await axios.post('/upload', data, {
            headers: {'Content-Type':'multipart/form-data'}
        })
        const {data:filenames} = response;
        console.log(response.data)
        setAddedPhotos(prev => {
            return [...prev, ...filenames]
        });
        toast.success("Photo uploaded successfully")
    } catch (error) {
        toast.error(error.message)
    }
  }

  const addNewPlace = async(e) => {
    e.preventDefault()
    if (!ownerId || !title || !address || !addedPhotos || !description || !perks || !extraInfo || !checkIn || !checkOut || !maxGuests){
        toast.error("Missing data. Check all your Input Fields!");
        return;
    }
    const data = {owner:ownerId, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests }
    try {
        const response = await axios.post("/places", data)
        console.log(response);
        if (response.status === 201){
            toast.success("Place created successfully!")
            navigate("/profile/places")
            //set all states to null
            setTitle(""); setAddress(""); setAddedPhotos(null); setDescription(""); setPerks(null); setExtraInfo(""); setCheckIn(""); setCheckOut(""); setMaxGuests(1)
        }        
    } catch (error) {
        toast.error(error.message)
    }
  }

  //console.log(addedPhotos)
  
  return (
    <div>        
        {            
          action !== "new" && (
            <div className="text-center">
              <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={"/profile/places/new"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add New Place
              </Link>
            </div>
          )
        }
        {
          action === "new" && (
            <div>
              <form action="">
                <h2 className="text-2xl mt-4">Title</h2>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder='title eg: My Lovely Apartment' />
                <h2 className="text-2xl mt-4">Address</h2>
                <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder='address' />
                <h2 className="text-2xl mt-4">Photos</h2>
                <div className='flex gap-2'> 
                  <input value={photoLink} onChange={e => setPhotoLink(e.target.value)} type="text" placeholder='Add Using a link ...jpg' />
                  <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;Photo</button>
                </div>
                <div className='mt-2 gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
                  {
                    addedPhotos?.length > 0 && addedPhotos.map(link => (
                        <div className='h-80 flex' key={link}>
                            <img className='rounded-2xl w-full object-cover' src={`http://localhost:5000/uploads/${link}`} alt="" />
                        </div>
                    ))
                  }
                  <label className="h-80 cursor-pointer p-4 flex gap-1 justify-center border bg-transparent items-center rounded-2xl text-2xl text-gray-600">
                    <input type="file" multiple className='hidden' onChange={uploadPhoto} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                    </svg>
                    Upload
                  </label>
                </div>
                <h2 className="text-2xl mt-4">Description</h2>
                <textarea value={description} onChange={e => setDescription(e.target.value)} className='' name="description" id="" rows="5" />
                <h2 className="text-2xl mt-4">Perks</h2>
                <Perks selected={perks} onChange={setPerks} />
                <h2 className="text-2xl mt-4">Extra Information</h2>
                <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)} className='' name="description" id="" rows="5" />
                <h2 className="text-2xl mt-4">Check in&out Times</h2>
                <div className="grid gap-2 sm:grid-cols-3">
                  <div>
                    <h3 className="m2-2 -mb-1">Check In Time</h3>
                    <input value={checkIn} onChange={e => setCheckIn(e.target.value)} type="time" placeholder='14:00' />
                  </div>
                  <div>
                    <h3 className="m2-2 -mb-1">Check Out Time</h3>
                    <input value={checkOut} onChange={e => setCheckOut(e.target.value)} type="time" placeholder='14:00' />
                  </div>
                  <div>
                    <h3 className="m2-2 -mb-1">Maximum Number of Guests</h3>
                    <input value={maxGuests} onChange={e => setMaxGuests(e.target.value)} type="number" placeholder='0' />
                  </div>
                </div>
                <button onClick={addNewPlace} className="primary my-4">Save Place</button>
             </form>
            </div>
          )
        }           
    </div>
  )
}

export default PlacesPage