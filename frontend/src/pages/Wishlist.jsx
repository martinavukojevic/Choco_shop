import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist, products } = useContext(ShopContext);

  const favProducts = products.filter((product) => wishlist.includes(product._id));

  return (
    <div className='p-6 bg-white min-h-screen text-gray-800 font-serif'>


      <div className="flex flex-col items-center mb-10 animate-fadeInScale">
        <h2 className="text-[2.5rem] sm:text-[2.75rem] font-serif italic playfair-italic tracking-wide text-center text-[#7e2325]">
          MY FAVOURITES
        </h2>
        <div className="mt-2 w-20 h-[2px] bg-gradient-to-r from-[#bfa980] to-transparent"></div>
      </div>

      {favProducts.length === 0 ? (
        <p className='text-center text-gray-600'>No products in wishlist.</p>
      ) : (
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {favProducts.map(product => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className='block border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-lg hover:border-gold transition-all duration-300 ease-in-out'
            >
              <img
                src={product.image[0]}
                alt={product.name}
                className='w-full h-90 object-cover mb-4 rounded-md'
              />
              <p className='font-semibold text-lg text-gray-800 hover:text-dark-red transition-colors duration-200'>
                {product.name}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
