import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    delivery_fee
  } = useContext(ShopContext);

  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      const updatedCartItems = {};

      for (const productId in cartItems) {
        const productExists = products.some(p => p._id === productId);
        if (!productExists) continue;

        for (const size in cartItems[productId]) {
          const quantityInCart = cartItems[productId][size];
          const product = products.find(p => p._id === productId);
          if (!product) continue;
          const stock = product.quantity[size] || 0;

          if (stock === 0) {
            updateQuantity(productId, size, 0);
            alert('Product removed because there is not enough stock available.');
            continue;
          }

          if (cartItems[productId][size] > 0) {
            tempData.push({
              _id: productId,
              size: size,
              quantity: cartItems[productId][size],
            });

            if (!updatedCartItems[productId]) updatedCartItems[productId] = {};
            updatedCartItems[productId][size] = cartItems[productId][size];
          }
        }
      }

      setCartData(tempData);

      const filteredCartItems = tempData.filter(item => item.quantity > 0);
      const filteredCartObject = {};
      filteredCartItems.forEach(item => {
        if (!filteredCartObject[item._id]) filteredCartObject[item._id] = {};
        filteredCartObject[item._id][item.size] = item.quantity;
      });

      if (JSON.stringify(cartItems) !== JSON.stringify(filteredCartObject)) {
        localStorage.setItem("cartItems", JSON.stringify(filteredCartObject));
      }
    }
  }, [cartItems, products]);

  const subtotal = cartData.reduce((total, item) => {
    const product = products.find(p => p._id === item._id);
    if (!product) return total;
    const price = product.price[item.size] || 0;
    return total + price * item.quantity;
  }, 0);

  const total = subtotal + delivery_fee;

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {cartData.map((item, index) => {
        const productData = products.find(p => p._id === item._id);
        if (!productData) return null;

        return (
          <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
            <div className='flex items-start gap-6'>
              <Link to={`/product/${productData._id}`}>
                <img src={productData.image[0]} className='w-16 sm:w-20' alt="img" />
              </Link>
              <div>
                <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                <div className='flex items-center gap-5 mt-2'>
                  <p>{currency}{productData.price[item.size]}</p>
                  <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                </div>
              </div>
            </div>

            <input
              type="number"
              min={1}
              max={products.find(p => p._id === item._id)?.quantity[item.size] ?? 1}
              value={item.quantity}
              onChange={(e) => {
                const newValue = Number(e.target.value);
                const availableStock = products.find(p => p._id === item._id)?.quantity[item.size] ?? 1;
                if (newValue > availableStock) {
                  alert(`Unfortunately, only ${availableStock} item${availableStock === 1 ? '' : 's'} available in stock.`);
                  return;
                }
                if (newValue >= 1) updateQuantity(item._id, item.size, newValue);
              }}
              className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
            />

            <img
              onClick={() => updateQuantity(item._id, item.size, 0)}
              src={assets.trash_icon}
              className='w-4 mr-4 sm:w-5 cursor-pointer'
              alt="trash can"
            />
          </div>
        );
      })}

      <div className='flex justify-end mt-10'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal total={total} />
          <div className='w-full text-end'>
            <button
              onClick={() => navigate('/place-order')}
              className='bg-black text-white text-sm my-8 px-8 py-3'
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
