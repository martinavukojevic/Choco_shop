import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';
import { assets } from '../assets/assets';
import Title from './Title';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  const categoryImages = [
    { type: 'all', img: assets.all },        
    { type: 'milk', img: assets.milk },
    { type: 'dark', img: assets.dark },
    { type: 'white', img: assets.white },
    { type: 'ruby', img: assets.ruby },
    { type: 'filled', img: assets.filled },
    { type: 'couverture', img: assets.couverture },
    { type: 'organic', img: assets.organic },
    { type: 'vegan', img: assets.vegan },
    { type: 'add_ons', img: assets.add_ons },
    { type: 'box', img: assets.box },
  ];

  useEffect(() => {
    setLatestProducts(products.slice(-10));
  }, [products]);

  let filteredProducts;
  if (selectedType === 'all') {
    filteredProducts = [...products].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else if (selectedType) {
    filteredProducts = products.filter(item => item.type === selectedType);
  } else {
    filteredProducts = latestProducts;
  }

  const getMinPrice = (priceObj) => {
    if (!priceObj || typeof priceObj !== 'object') return null;
    const prices = Object.values(priceObj)
      .map(p => Number(p))
      .filter(p => !isNaN(p) && p > 0);
    return prices.length ? Math.min(...prices) : null;
  };

  return (
    <div className='my-10'>
      <div className='flex flex-wrap justify-start gap-6 mb-10 mt-40'>
        {categoryImages.map((cat, index) => (
          <div
            key={index}
            className={`w-56 h-56 cursor-pointer rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 shadow-md ${
              selectedType === cat.type ? 'ring-4 ring-brown-500' : ''
            }`}
            onClick={() =>
              setSelectedType(selectedType === cat.type ? null : cat.type)
            }
          >
            <img
              src={cat.img}
              alt={cat.type}
              className='w-full h-full object-cover'
            />
          </div>
        ))}
      </div>

     
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {filteredProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
          />
        ))}
      </div>

    
      <div className='text-center py-8 text-3xl '>
        <Title text1={'NEW'} text2={'ARRIVALS'} />
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
