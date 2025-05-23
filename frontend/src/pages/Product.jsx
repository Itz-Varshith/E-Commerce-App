import React, { useContext, useEffect ,useState} from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const {id}=useParams();
  const {products,currency,addToCart}=useContext(ShopContext);

  const [productData,setProductData]=useState(false);

const [image,setImage]=useState('');
const [size,setSize]=useState('');


  const fetchProductData= async ()=>{
    products.map((item)=>{
      if(item._id === id){
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    })
  }


  useEffect(()=>{
    fetchProductData();
  },[id,products])

  return productData? (
    <div className='border-t pt-10 transition-opacity ease-in-out duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* {Display of product images} */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
            <div className='flex sm:flex-col overflow-x-auto justify-between sm:justify-normal sm:w-[18.7%] w-full'>
              {
                productData.image.map((item,index)=>{
                  return <img src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' onClick={()=>{setImage(item)}}/>
                })
              }
            </div>
            <div className='w-full sm:w-[80%]'>
              <img  className='w-full h-auto' src={image}/>
            </div>
        </div>
        {/* Product information */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
             <img src={assets.star_icon} alt="" className="w-3 5" /><img src={assets.star_icon} alt="" className="w-3 5" /><img src={assets.star_icon} alt="" className="w-3 5" /><img src={assets.star_icon} alt="" className="w-3 5" /><img src={assets.star_dull_icon} alt="" className="w-3 5" />
             <p className='pl-2'>(122)</p>
          </div>
              <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
              <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
              <div className='flex flex-col gap-4 my-8'>
                <p>Select size</p>
                <div className='flex gap-2'>
                  {productData.sizes.map((item,index)=>{
                  return <button className={`border py-2 px-4 bg-gray-100 ${(item===size)?'border-orange-700' :''}`} onClick={(e)=>{setSize(item)}} key={index}>{item}</button>
                })}</div>
                
              </div>
              <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700' onClick={()=>{addToCart(productData._id,size)}}>Add to Cart</button>
              <hr className='mt-8 sm:w-4/5'/>
              <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                <p>100% original product</p>
                <p>Cash on delivery available</p>
                <p>Return and replacement are completely available</p>
              </div>
        </div>
      </div>
      {/* Description and review section */}
      <div className='mt-20'>
  <div className='flex'>
    <b className='border border-gray-300 px-5 py-3 text-sm'>Description</b>
    <p className='border border-gray-300 px-5 py-3 text-sm'>
      Reviews(122)
    </p>
  </div>
  <div className='flex flex-col gap-4 border-gray-200 px-6 py-6 text-sm text-gray-500'>
  <p>This is the spot for the product description where we can include a very detailed description of the product</p>
  <p>We offer description choices inculcating the revies of users and the seller</p>
  </div>
  <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
</div>
    </div>
  ):<div className='opacity-0'></div>
}

export default Product
