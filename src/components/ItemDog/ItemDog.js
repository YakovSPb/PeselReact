import React from 'react';
import s from "./ItemDog.module.css";
import heard from "../../assets/img/white_heart.png";
import heardFollow from "../../assets/img/orange_heart.png";
import {NavLink} from "react-router-dom";

let ItemDog = ({dog, onSaveFovourite, onDeleteFovourite, favoritePage}) => {

    return <div className={s.dog_item + ' dog_item'}>
            {!dog.favorite
                ?  <div onClick={()=> {onSaveFovourite(dog.id, dog.image_id)}} className={s.dog_item__heard}><img src={heard} alt="alt"/></div>
                :   <div onClick={()=> {onDeleteFovourite(dog.id, dog.image_id)}} className={s.dog_item__heard}><img src={heardFollow} alt="alt"/></div>
            }
            <NavLink to={'/dog/' + dog.image_id}><div className={s.dog_item__img}><img src={favoritePage ? dog.image.url : dog.url} alt="alt"/></div></NavLink>
            <div className={s.dog_item__name}>{dog.name}</div>
        </div>

}

export default ItemDog;