import React, { useState, useEffect } from 'react';
import Title from '../components/Title';
import axios from 'axios';
import { backendUrl } from '../App'
import { useNavigate } from 'react-router-dom';

const Manufacturers = ({ token }) => {
  const [manufacturers, setManufacturers] = useState([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState(null);
  const [manufacturerProducts, setManufacturerProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/manufacturer/list`);
        if (!res.ok) throw new Error('Greška kod dohvaćanja proizvođača');
        const data = await res.json();
        setManufacturers(data.manufacturers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchManufacturers();
  }, []);


  const fetchProductsByManufacturer = async (manufacturerId) => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/product/by-manufacturer/${manufacturerId}`,
        { headers: { token } }
      );

      if (response.data.success) {
        return response.data.products;
      } else {
        console.error(response.data.message);
        return [];
      }
    } catch (err) {
      console.error(err.message);
      return [];
    }
  };


  const handleManufacturerClick = async (manufacturer) => {
    setSelectedManufacturer(manufacturer);
    const products = await fetchProductsByManufacturer(manufacturer._id);
    setManufacturerProducts(products);
  };

  return (
    <div className='container mx-auto px-4'>
      <div className='pt-10 border-t'>
        <Title text1={'OUR'} text2={'MANUFACTURERS'} />
      </div>

      {loading && <p className='text-center py-10'>Loading...</p>}
      {error && <p className='text-center text-red-500 py-10'>{error}</p>}

      {!loading && !error && (
        <div className='my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-28'>
          {manufacturers.map((item) => (
            <div
              key={item._id}
              className='border p-4 rounded-lg shadow hover:shadow-lg cursor-pointer transition'
              onClick={() => handleManufacturerClick(item)}
            >
              <div className='w-full aspect-[4/3]'>
                <img
                  src={item.logoUrl}
                  alt={item.name}
                  className='w-full h-full object-contain rounded bg-grey-100'
                />
              </div>

              <h3 className='mt-4 font-serif text-xl text-[#bfa980]'>{item.name}</h3>
              <p className='text-gray-600 text-sm'>
                {item.country} • Since {item.yearFounded}
              </p>
            </div>
          ))}
        </div>
      )}


      {selectedManufacturer && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white p-8 rounded shadow-lg w-[90%] max-w-2xl relative max-h-[90vh] overflow-y-auto'>
            <button
              className='absolute top-3 right-3 text-gray-500 hover:text-black text-xl'
              onClick={() => {
                setSelectedManufacturer(null);
                setManufacturerProducts([]);
              }}
            >
              ✕
            </button>
            <img
              src={selectedManufacturer.logoUrl}
              alt={selectedManufacturer.name}
              className='w-full h-48 object-contain rounded mb-4'
            />
            <h2 className='text-2xl font-serif text-[#bfa980] mb-2'>
              {selectedManufacturer.name}
            </h2>
            <p className='text-gray-700 mb-2'>
              {selectedManufacturer.country} • Since {selectedManufacturer.yearFounded}
            </p>
            <p className='text-gray-600 mb-4'>{selectedManufacturer.description}</p>

            <h3 className='text-xl font-semibold mb-2'>Available Products:</h3>
            {manufacturerProducts.length > 0 ? (
              <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                {manufacturerProducts.map((product) => (
                  <div key={product._id} className='border p-2 rounded cursor-pointer'
                    onClick={() => navigate(`/product/${product._id}`)}>
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className='w-full h-32 object-cover mb-1'
                    />
                    <p className='text-sm font-medium'>{product.name}</p>
                    <p className='text-xs text-gray-500'>
                      €{product.price ? Object.values(product.price)[0] : 'N/A'}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No products available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Manufacturers;
