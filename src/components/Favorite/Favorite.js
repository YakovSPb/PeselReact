import s from "./Favorite.module.css";
import Loader from "../common/Loader/Loader";
import React from "react";
import Footer from "../Footer/Footer";
import ItemDog from "../ItemDog/ItemDog";


const Favorite = ({dogsDataFavorite, visible, onSaveFovourite, onDeleteFovourite, onLoadMore}) => {

    if (dogsDataFavorite.length === 0) {
        return <Loader/>
    }

    return (
        <>
            <div className="container">
                <h1>Favorite Dogs</h1>
                <div className={s.dogs_list}>{dogsDataFavorite.slice(0, visible).map((dog, index) =>
                    <ItemDog
                        key={index}
                        dog={dog}
                        onSaveFovourite={onSaveFovourite}
                        onDeleteFovourite={onDeleteFovourite}
                        favoritePage={true}
                    />)}
                </div>
                {visible < dogsDataFavorite.length &&
                <button className={s.btn + " btn"} onClick={onLoadMore}>Загрузить еще</button>
                }

            </div>
            {dogsDataFavorite.length > 0 && <Footer/>}
        </>
    )
}

export default Favorite;