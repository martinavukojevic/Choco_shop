import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { useEffect } from 'react';
import axios, { all } from 'axios';
import { Link } from 'react-router-dom';

const Orders = () => {

  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([])


  const getMinPrice = (price) => {
    if (price == null) return null;

    if (typeof price === 'number') return price;

    if (typeof price === 'string') {
      const num = Number(price);
      return isNaN(num) ? null : num;
    }

    if (typeof price === 'object') {
      const prices = Object.values(price)
        .map(p => Number(p))
        .filter(p => !isNaN(p) && p > 0);
      return prices.length ? Math.min(...prices) : null;
    }

    return null;
  };




  const loadOrderData = async () => {
    try {

      if (!token) {
        return null;
      }

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
      if (response.data.success) {

        let allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date

            allOrdersItem.push(item)


          })
        })
        setOrderData(allOrdersItem.reverse())
      }

    } catch (error) {

    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div className='border-t pt-16'>

      <div className='text-2xl'>

        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div>
        {

          orderData.map((item, index) => (
            <div key={index} className='py border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 '>
              <div className='flex items-start gap-6 text-sm'>
                <Link to={`/product/${item._id}`}>
                  <img src={item.image[0]} className='w-16 sm:w-20' alt="img" />
                </Link>
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                    <p>{currency}{getMinPrice(item.price) ?? 'N/A'}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>


              <div className='md:w-1/2'>
                <p className='text-sm md:text-base text-cocoa font-medium'>
                  Thank you for your order!
                </p>
              </div>
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default Orders
