import React from 'react'
import { useRouteError } from 'react-router-dom'


const Error = () => {
  const error = useRouteError()
  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center bg-black text-white text-5xl'>
    
    <p>{error?.statusText}</p>
    <p>{error?.status}</p>
    <p>{error?.data}</p>
    </div>
  )
}

export default Error