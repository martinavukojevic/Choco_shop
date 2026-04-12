import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Update from './pages/Update'
import Users from './pages/Users'
import AddManufacturer from './pages/AddManufacturer'
import ListManufacturer from './pages/ListManufacturer'
import UpdateManufacturer from './pages/updateManufacturer'

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '€'

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token') : '' );




  useEffect(()=>{
    localStorage.setItem(('token'),token)
  },[token])

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {token === ""
        ? <Login setToken={setToken} />
        : <>
          <Navbar setToken= {setToken} token={token} />
          <hr />

          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              <Routes>
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token}  />} />
                <Route path='/orders' element={<Orders token={token} />} />
                <Route path="/update/:id" element={<Update token={token} />} />
                <Route path="/users" element={<Users backendUrl={backendUrl} token={token} />} />
                <Route path="/manufacturer/add" element={<AddManufacturer token={token} />} />
                <Route path="/manufacturer/list" element={<ListManufacturer token={token} />} />
                <Route path="/manufacturer/update/:id" element={<UpdateManufacturer token={token} />} />


              </Routes>
            </div>

          </div>
        </>}


    </div>)
}

export default App
