import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const CartTotal = ({ total }) => {
  const { currency, delivery_fee } = useContext(ShopContext);

  return (
    <div className='w-full sm:w-[450px] ml-auto'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTAL'} />
      </div>
      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{currency} {(total - delivery_fee).toFixed(2)}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Shipping fee</p>
          <p>{currency} {delivery_fee.toFixed(2)}</p>
        </div>
        <hr />
        <div className='flex justify-between '>
          <p>Total</p>
          <p>{currency} {total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
