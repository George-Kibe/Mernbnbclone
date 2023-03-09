import React from 'react'

const ImageComponent = ({place, index=0, className=null}) => {
  if (!place.photos.length){
    return <p className="text-center">No Photo</p>
  }

  if (!className){
    className = "object-cover";
  }
  return (
    <img className={className} src={`http://localhost:5000/uploads/${place.photos[index]}`} alt="place Photo" />
  )
}

export default ImageComponent