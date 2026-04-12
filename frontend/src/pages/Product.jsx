import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, addToWishlist, removeFromWishlist, isInWishlist, token } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const selected = products.find((item) => item._id === productId);
    if (selected) {
      setProductData(selected);
      setImage(selected.image[0]);
    }
  }, [productId, products]);

  useEffect(() => {
    if (productData && productData.sizes.length > 0) {
      setSize(productData.sizes[0]);
    }
  }, [productData]);

  const formatDescription = (text) => {
    if (!text) return null;
    const paragraphs = text.split('\n\n');
    return paragraphs.map((paragraph, i) => (
      <p key={i} className="text-gray-600 leading-relaxed mb-3 font-light">{paragraph}</p>
    ));
  };

  if (!productData) return <div className="opacity-0"></div>;

  return (
    <div className="pt-10 pb-16 border-t relative">
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col md:flex-row gap-16">
        <div className="md:w-1/2 flex flex-col items-center relative">
          {productData.quantity[size] === 0 && (
            <div className="absolute top-4 left-[-10px] bg-red-500 text-white px-4 py-1 text-sm font-bold transform rotate-12 shadow-md z-10">
              SOLD OUT
            </div>
          )}
          <div className="relative w-full">
            <img
              src={image}
              alt="product"
              className="w-full h-[420px] object-contain rounded-xl shadow-sm"
            />
            <div
              className="absolute top-4 right-4 text-2xl cursor-pointer text-[#bfa980]"
              onClick={() => {
                if (isInWishlist(productData._id)) {
                  removeFromWishlist(productData._id);
                } else {
                  addToWishlist(productData._id);
                }
              }}
            >
              {isInWishlist(productData._id) ? <FaHeart /> : <FaRegHeart />}
            </div>
          </div>
          <div className="flex gap-3 mt-4 justify-center flex-wrap">
            {productData.image.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="thumbnail"
                onClick={() => setImage(img)}
                className={`w-20 h-20 object-cover cursor-pointer rounded-md border transition-all duration-200 hover:scale-105 hover:rotate-1 ${img === image ? 'border-[#bfa980]' : 'border-gray-200'}`}
              />
            ))}
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <h1 className="text-4xl md:text-5xl font-serif text-[#4b3a2f] tracking-wide">{productData.name}</h1>
          <p className="text-2xl text-[#bfa980] font-semibold mt-2">{size ? `${currency}${productData.price[size]}` : 'Select size'}</p>
          <div className="mt-6">{formatDescription(productData.description)}</div>
          <div className="mt-8">
            <p className="text-lg text-gray-700 mb-2 font-medium">Select size:</p>
            <div className="flex gap-3 flex-wrap">
              {productData.sizes.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSize(item)}
                  className={`border px-5 py-2 rounded-md text-sm font-medium tracking-wide shadow-sm transition-all duration-200 
                    ${item === size
                      ? 'bg-[#bfa980] text-white border-[#bfa980]'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-[#bfa980] hover:text-[#bfa980]'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-col items-center md:flex-row md:items-center gap-4">
            <span
              className={`inline-block px-4 py-1 rounded-full text-sm font-semibold shadow-md
                ${productData.quantity[size] === 0
                  ? 'bg-red-500 text-white border border-red-600'
                  : 'bg-[#bfa980]/20 text-[#bfa980] border border-[#bfa980] animate-pulse'}
              `}
            >
              {productData.quantity[size] === 0
                ? 'Sold Out'
                : `In Stock: ${productData.quantity[size]}`}
            </span>
            {token ? (
              productData.quantity[size] > 0 ? (
                <button
                  onClick={() => addToCart(productData._id, size)}
                  className="bg-[#bfa980] text-white px-6 py-3 rounded-full shadow-md hover:bg-[#a1734a] transition-all duration-300 md:ml-6"
                >
                  Add to Cart
                </button>
              ) : null
            ) : (
              <p className="text-red-600 font-medium mt-2 md:mt-0">Log in to add to cart!</p>
            )}
          </div>
          <hr className="mt-10 border-gray-200" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p
              className="text-[#bfa980] font-medium cursor-pointer"
              onClick={() => navigate('/manufacturers')}
            >
              See more about our manufacturers →
            </p>
            <p>100% Handmade Product</p>
            <p>Cash on delivery available</p>
          </div>
        </div>
      </div>
      <RelatedProducts type={productData.type} />
      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.85; }
          }
          .animate-pulse {
            animation: pulse 1.5s infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Product;
