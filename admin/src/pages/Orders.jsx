import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAllOrders = async () => {
    if (!token) {
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      const response = await axios.post(`${backendUrl}/api/order/list`, {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) fetchAllOrders()
    else setLoading(false)
  }, [token])

  return (
    <div className="p-6 flex flex-col gap-4">
      {loading && <p className="text-gray-500">Loading orders...</p>}
      {!loading && orders.length === 0 && <p className="text-gray-500">No order data available.</p>}
      {!loading && orders.map((order, index) => (
        <div key={index} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border rounded-lg shadow hover:shadow-md transition">
          <img className="w-12 h-12 object-contain" src={assets.parcel_icon} alt="parcel" />
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex flex-wrap gap-1">
              {order.items.map((item, idx) => (
                <span key={idx} className="text-gray-700 text-sm">
                  {item.name} X {item.quantity} <span className="text-gray-500">{item.size}</span>{idx !== order.items.length - 1 && ','}
                </span>
              ))}
            </div>
            <p className="font-medium text-gray-800">
              {order.address.firstName} {order.address.lastName}
            </p>
            <div className="text-gray-600 text-sm">
              <p>{order.address.street}</p>
              <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
              <p>{order.address.phone}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 text-sm text-gray-700">
            <p>Items: {order.items.length}</p>
            <p>Payment method: {order.paymentMethod}</p>
            <p>Payment: {order.payment ? 'Paid with credit card' : 'Pending'}</p>
            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
          </div>
          <div className="text-lg font-semibold text-gray-800 mt-2 md:mt-0">
            {currency} {order.amount}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Orders
