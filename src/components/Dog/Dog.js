import s from "./Dog.module.css";
import Loader from "../common/Loader/Loader";
import React from "react";
import Footer from "../Footer/Footer";

const Dog = ({ dogProfile, onSaveFovourite, onDeleteFovourite, isFetching }) => {
    if (isFetching) {
        return <Loader />
    }
    return (
        <>
            <main className={s.main}>
                <div className="container container_main">
                    <div className={s.dogs_wrap}>
                        <div className={s.dog_item + ' dog_item'}>
                            <div className={s.dog_item__img}><img src={dogProfile.url} alt="alt" /></div>
                        </div>
                        <div className={s.dog_info}>
                            {dogProfile.name &&
                                <div>
                                    <div><span><b>Name</b></span> <span>{dogProfile.name}</span></div>
                                    <div><span><b>Temperament:</b></span> <span>{dogProfile.temperament}</span></div>
                                    <div><span><b>Weight:</b></span> <span>{dogProfile.weight}</span> kg</div>
                                    <div><span><b>Height:</b></span> <span>{dogProfile.height}</span> m</div>
                                </div>
                            }
                            {!dogProfile.favorite
                                ? <button onClick={() => { onSaveFovourite(dogProfile.id, dogProfile.image_id) }} className={s.btn_dog + ' btn'}>Добавить в избранное</button>
                                : <button onClick={() => { onDeleteFovourite(dogProfile.id, dogProfile.image_id) }} className={s.btn_dog_gold + ' btn'}>Удалить из избранного</button>
                            }
                        </div>
                    </div>
                </div>
            </main>
            {dogProfile && <Footer />}
        </>
    )
}

export default Dog;