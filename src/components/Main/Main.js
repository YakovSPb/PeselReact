import React from 'react';
import s from "./Main.module.css";
import NavContainer from "../Nav/NavContainer";
import Loader from "../common/Loader/Loader";
import Footer from "../Footer/Footer";
import Paginator from "../common/Paginator/Paginator";
import ItemDog from "../ItemDog/ItemDog";


let Main = ({
                dogsData, totalDogsCount, pageSize,
                currentPage, onPagesChanged, sortDogs,
                typeImg, onDogSort, onBreedSelect,
                onSaveFovourite, onDeleteFovourite, onGetDogsMore,
                portionSize, breedValue
            }) => {

    if (dogsData.length === 0) {
        return <Loader/>
    }

    let pagesCount = Math.ceil(totalDogsCount / pageSize);

    return (
        <div>
            <NavContainer sortDogs={sortDogs} typeImg={typeImg} onDogSort={onDogSort} onBreedSelect={onBreedSelect}/>
            <main className={s.main}>
                <div className="container container_main">
                    <div className={s.dogs_list}>{dogsData.map((dog, index) => <ItemDog key={index}
                                                                                        dog={dog}
                                                                                        onSaveFovourite={onSaveFovourite}
                                                                                        onDeleteFovourite={onDeleteFovourite}/>)}
                    </div>
                     {breedValue === 'Все собачки' &&
                    < Paginator pagesCount={pagesCount} currentPage={currentPage} onPagesChanged={onPagesChanged} portionSize={portionSize} onGetDogsMore={onGetDogsMore}/>
                    }
                </div>
            </main>
            {dogsData.length > 0 && <Footer/>}
        </div>
    )
}

export default Main;