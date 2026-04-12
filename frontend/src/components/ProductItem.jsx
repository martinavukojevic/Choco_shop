import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price, quantity }) => {
  const { currency } = useContext(ShopContext);

  const getMinPrice = (priceObj) => {
    if (!priceObj || typeof priceObj !== 'object') return null;

    const prices = Object.values(priceObj)
      .map(p => Number(p))
      .filter(p => !isNaN(p) && p > 0);

    return prices.length ? Math.min(...prices) : null;
  };

  const minPrice = getMinPrice(price);

  return (
    <Link className='text-black cursor-pointer' to={`/product/${id}`}>
      <div className='overflow-hidden'>
        <img src={image[0]} alt="image" className='hover:scale-110 transition ease-in-out' />
      </div>

      <p className='pt-3 pb-1 text-sm'>{name}</p>

      <p className='text-sm font-medium'>
        {minPrice !== null ? `From €${minPrice}` : 'Price unavailable'}
      </p>



    </Link>
  );
};

export default ProductItem;
