import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {

    const {currency,getCartAmount,deliveryFee}=useContext(ShopContext);

  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={"Cart"} text2={"Total"}/>
        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between px-4 sm:px-6'>
                <p>SubTotal</p>
                <p className='text-right'>{currency}{getCartAmount()}</p>
            </div>
            <hr className='mx-4 sm:mx-6'/>
            <div className='flex justify-between px-4 sm:px-6'>
                <p>Shipping fee</p>
                <p className='text-right'>{currency}{deliveryFee}</p>
            </div>
            <hr className='mx-4 sm:mx-6'/>
            <div className='flex justify-between font-semibold px-4 sm:px-6'>
                <b>Total</b>
                <p className='text-right'>{currency}{getCartAmount()===0?0:getCartAmount()+deliveryFee}</p>
            </div>
        </div>
    </div>
  )
}

export default CartTotal
