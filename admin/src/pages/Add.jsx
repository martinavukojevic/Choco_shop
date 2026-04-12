import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { backendUrl } from '../App'
import { assets } from '../assets/assets'

const Add = ({ token }) => {
  const [manufacturers, setManufacturers] = useState([])
  const [manufacturer, setManufacturer] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('milk') 
  const [cocoaPercentage, setCocoaPercentage] = useState('')
  const [milkPercentage, setMilkPercentage] = useState('')
  const [sizes, setSizes] = useState([])
  const [newSize, setNewSize] = useState('')
  const [price, setPrice] = useState({})
  const [quantity, setQuantity] = useState({})
  const [images, setImages] = useState([false, false, false, false])

  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/manufacturer/list`, { headers: { token } })
        setManufacturers(res.data.manufacturers)
      } catch (err) {
        toast.error('Failed to fetch manufacturers')
      }
    }
    fetchManufacturers()
  }, [token])

  const addSize = () => {
    const trimmed = newSize.trim()
    if (trimmed && !sizes.includes(trimmed)) {
      setSizes([...sizes, trimmed])
      setNewSize('')
    }
  }

  const handlePriceChange = (size, value) => setPrice(prev => ({ ...prev, [size]: Number(value) }))
  const handleQuantityChange = (size, value) => setQuantity(prev => ({ ...prev, [size]: Number(value) }))
  const handleImageChange = (index, file) => {
    const updated = [...images]
    updated[index] = file
    setImages(updated)
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    for (let size of sizes) {
      if (!price[size]) { alert(`Enter price for ${size}`); return }
      if (!quantity[size] && quantity[size] !== 0) { alert(`Enter quantity for ${size}`); return }
    }
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('type', type)
      formData.append('cocoaPercentage', cocoaPercentage)
      formData.append('milkPercentage', milkPercentage)
      formData.append('manufacturer', manufacturer)
      formData.append('sizes', JSON.stringify(sizes))
      formData.append('price', JSON.stringify(price))
      formData.append('quantity', JSON.stringify(quantity))
      images.forEach((img, i) => { if (img) formData.append(`image${i+1}`, img) })
      const response = await axios.post(`${backendUrl}/api/product/add`, formData, { headers: { token } })
      if (response.data.success) {
        toast.success('Product added successfully!')
        setName(''); setDescription(''); setType('milk'); setCocoaPercentage(''); setMilkPercentage('')
        setManufacturer(''); setSizes([]); setNewSize(''); setPrice({}); setQuantity({}); setImages([false, false, false, false])
      } else {
        toast.error(response.data.message)
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col gap-2">
        <h2 className="font-serif text-xl">Upload Images</h2>
        <div className="flex gap-3">
          {images.map((img, i) => (
            <label key={i} className="w-24 h-24 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:border-[#bfa980] transition">
              {img ? <img className="w-full h-full object-cover rounded-lg" src={URL.createObjectURL(img)} alt="Upload" /> : "+"}
              <input type="file" hidden onChange={e => handleImageChange(i, e.target.files[0])} />
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium">Product Name</label>
        <input type="text" placeholder="Enter product name" value={name} onChange={e => setName(e.target.value)} required className="border p-2 rounded-md" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium">Product Description</label>
        <textarea placeholder="Enter product description" value={description} onChange={e => setDescription(e.target.value)} required className="border p-2 rounded-md" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium">Chocolate Type</label>
        <select value={type} onChange={e => setType(e.target.value)} className="border p-2 rounded-md">
          <option value='milk'>Milk</option>
          <option value='dark'>Dark</option>
          <option value='ruby'>Ruby</option>
          <option value='white'>White</option>
          <option value='filled'>Filled chocolate</option>
          <option value='couverture'>Couverture chocolate</option>
          <option value='organic'>Organic chocolate</option>
          <option value='vegan'>Vegan chocolate</option>
          <option value='add_ons'>Chocolate with add ons</option>
          <option value='box'>Chocolate box</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
        <div className="flex flex-col gap-1 flex-1">
          <label className="font-medium">Cocoa Percentage</label>
          <input type="number" placeholder="Enter cocoa %" value={cocoaPercentage} onChange={e => setCocoaPercentage(e.target.value)} className="border p-2 rounded-md" />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <label className="font-medium">Milk Percentage</label>
          <input type="number" placeholder="Enter milk %" value={milkPercentage} onChange={e => setMilkPercentage(e.target.value)} className="border p-2 rounded-md" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium">Manufacturer</label>
        <select value={manufacturer} onChange={e => setManufacturer(e.target.value)} required className="border p-2 rounded-md">
          <option value=''>Select manufacturer</option>
          {manufacturers.map(m => <option key={m._id} value={m._id}>{m.name}</option>)}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium">Add New Size</label>
        <div className="flex gap-2">
          <input type="text" placeholder="e.g. 50g" value={newSize} onChange={e => setNewSize(e.target.value)} className="border p-2 rounded-md flex-1" />
          <button type="button" onClick={addSize} className="bg-[#bfa980] text-white px-4 rounded-md hover:bg-[#a68b6f] transition">Add Size</button>
        </div>
      </div>

      {sizes.map(size => (
        <div key={size} className="flex gap-2 items-center">
          <p className="w-16 font-medium">{size}</p>
          <input type="number" placeholder="Price" value={price[size] || ''} onChange={e => handlePriceChange(size, e.target.value)} className="border p-2 rounded-md flex-1" />
          <input type="number" placeholder="Quantity" value={quantity[size] || ''} onChange={e => handleQuantityChange(size, e.target.value)} className="border p-2 rounded-md flex-1" />
        </div>
      ))}

      <button type="submit" className="bg-[#bfa980] hover:bg-[#a68b6f] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 mt-4">Add Product</button>
    </form>
  )
}

export default Add
