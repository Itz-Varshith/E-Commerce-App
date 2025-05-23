import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity,navigate} = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if(products.length>0){
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
    
  }, [cartItems,products]);

  return (
    <div className='pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'Your'} text2={'cart'} />
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          if (!productData) return null; 

          return (
            <div
              key={index}
              className='py-4 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 bg-gray-100 mb-3'
            >
              <div className='flex items-start gap-6'>
                <img className='w-16 sm:w-20' src={productData.image[0]} alt='' />
                <div>
                  <p className='text-sm sm:text-lg font-medium'>{productData.name}</p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p>{currency}{productData.price}</p>
                    <p className='px-2 sm:px-3 sm:py-1 bg-slate-100'>{item.size}</p>
                  </div>
                </div>
              </div>

              
              <input
                type='number'
                min={1}
                value={item.quantity} 
                onChange={(e) => {
                  const newValue = Number(e.target.value);
                  if (newValue > 0) {
                    updateQuantity(item._id, item.size, newValue);
                  }
                }}
                className='border-[0.5px] border-gray-300 max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
              />

              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                src={assets.bin_icon}
                className='w-4 mr-4 sm:w-5 cursor-pointer'
              />
            </div>
          );
        })}
      </div>
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
        <CartTotal/>
        <div className='w-full text-end'>
          <button className='bg-black text-white text-sm my-8 px-8 py-3' onClick={()=>{navigate('/place-order')}}>
              Proceed to Checkout
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
