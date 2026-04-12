import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const List = ({ token }) => {
  const [list, setList] = useState([])
  const navigate = useNavigate()

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`)
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(`${backendUrl}/api/product/remove`, { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-serif mb-4">All Products</h2>
      {list.map((item) => (
        <div key={item._id} className="flex flex-col md:flex-row items-center gap-4 p-4 border rounded-lg shadow hover:shadow-md transition">
          <img className="w-24 h-24 object-cover rounded-md" src={item.image[0]} alt="Product" />
          <div className="flex-1 flex flex-col gap-1">
            <p className="font-medium text-lg">{item.name}</p>
            <p className="text-gray-600">{item.category}</p>
            <p className="text-gray-800 mt-1">
              {Object.entries(item.price).map(([size, value]) => (
                <span key={size} className="mr-3">{size}: {currency}{value}</span>
              ))}
            </p>
          </div>
          <div className="flex gap-2 mt-2 md:mt-0">
            <button
              onClick={() => navigate(`/update/${item._id}`)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Edit
            </button>
            <button
              onClick={() => removeProduct(item._id)}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      {list.length === 0 && <p className="text-gray-500 text-center mt-10">No products available.</p>}
    </div>
  )
}

export default List
