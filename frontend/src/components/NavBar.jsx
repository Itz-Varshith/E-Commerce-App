import React,{useContext, useEffect, useState} from 'react'
import {assets} from '../assets/assets';
import {NavLink,Link, useLocation, useNavigate} from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';



const NavBar = () => {
  const [visible,setVisible]=useState(false);
  const {setShowSearch,getCartLength,token,setToken,setCartItems,navigate}=useContext(ShopContext);
const location=useLocation();
// const navigate=useNavigate();

const logout=()=>{
  localStorage.removeItem("token");
  setToken('');
  setCartItems({});
  navigate('/login');
}


let count=getCartLength();
  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to='/'><img src={assets.logo} alt='' className='w-36'/></Link>
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'><p>Home</p>
        <hr className='w-10 border-none h-[1.5px] bg-gray-700 hidden'></hr>
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'><p>Collection</p>
        <hr className='w-10 border-none h-[1.5px] bg-gray-700 hidden'></hr>
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'><p>About</p>
        <hr className='w-10 border-none h-[1.5px] bg-gray-700 hidden'></hr>
        </NavLink><NavLink to='/contact' className='flex flex-col items-center gap-1'><p>Contact</p>
        <hr className='w-10 border-none h-[1.5px] bg-gray-700 hidden'></hr>
        </NavLink>
      </ul>
      <div className='flex item-center gap-6'>
        <img onClick={()=>{
          if(location.pathname.includes('collection')){
            setShowSearch(true);
          }
          else{
            navigate('/collection');
          }
        }} src={assets.search_icon} className='w-5 cursor-pointer'></img>
        <div className='group relative'>
          <img src={assets.profile_icon} className='w-5 cursor-pointer' onClick={()=>token? null : navigate('/login')}></img>
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
           {
            token &&  <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
            <p className='cursor-pointer hover:text-black'>My profile</p>
            <p className='cursor-pointer hover:text-black' onClick={()=>navigate('/orders')}>Orders</p>
            <p className='cursor-pointer hover:text-black' onClick={logout}>Logout</p>
          </div>
           }

          </div>
        </div>
        <Link to='/cart' className='relative'>
        <img src={assets.cart_icon} alt='Cart' className='w-5 min-w-5'/>
        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{count}</p>
        </Link>
        <img src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' onClick={()=>{
          setVisible(true);
        }}></img>
      </div>
{/* side bar menu for smaller screens */}
<div className={`absolute top-0 bottom-0 overflow-hidden bg-white transition-all ${visible? 'w-full':'w-0'}`}>
  <div className='flex flex-col text-gray-600'>
    <div className='flex item-center gap-4 p-3 cursor-pointer' onClick={()=>{
      setVisible(false);
    }}>
      <img className='h-4 rotate-180' src={assets.dropdown_icon}></img>
      <p>Back</p>
    </div>
    <NavLink onClick={()=>setVisible(false)}className='py-2 pl-6 border-none'to='/'>Home</NavLink>
    <NavLink onClick={()=>setVisible(false)}className='py-2 pl-6 border-none'to='/collection'>Collection</NavLink>
    <NavLink onClick={()=>setVisible(false)}className='py-2 pl-6 border-none'to='/about'>About</NavLink>
    <NavLink onClick={()=>setVisible(false)}className='py-2 pl-6 border-none'to='/contact'>Contact</NavLink>

  </div>
</div>

    </div>
  )
}

export default NavBar
