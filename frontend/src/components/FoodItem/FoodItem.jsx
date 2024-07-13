import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
const FoodItem = ({ id, name, description, price, image }) => {

  // const [itemCount, setItemCount] = useState(0);
  const{cartItems,addToCart,removeFromCart,url}=useContext(StoreContext);

  // Debugging: log the image URL to the console
  console.log(url + "/images" + image);

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className="food-item-image" src={url+"/images/"+image} alt="" />
        {
            !cartItems[id] ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt='' /> :
            <div className='food-item-counter'>
              <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
              <div>{cartItems[id]}</div>
              <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
            </div>
        }

        <div className="food-item-info">
          <div className="food-item-name-rating">
            <div>{name}</div>
            <img src={assets.rating_starts} alt="" />
            
          </div>
          <div className="food-item-desc">{description}</div>
          <div className="food-item-price">${price}</div>



        </div>
      </div>
    </div>
  )
}

export default FoodItem