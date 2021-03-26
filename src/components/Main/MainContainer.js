import React, {useEffect} from 'react';
import {
    addDog, follow, getDogsMore,
    getDogs, setAllFavoriteDogs, setDogs,
    sortDogs, toggleIsFetching, saveFavoriteDog,
    deleteDog, getDogsByBreed, setCurrentPage, setAllBreedName
} from "../../redux/main-reducer";
import {connect} from "react-redux";
import Main from "./Main";
import {
    getBreedValue, getCurrentPage, getDogsData,
    getDogsFavoriteAll, getIsFetching, getPageSize, getPortionSize,
    getTotalDogsCount, getTypeImg
} from "../../redux/main-selector";


const MainContainer = ({getDogs, typeImg, pageSize, currentPage, ...props}) => {
    useEffect(() => {

        getDogs(typeImg, pageSize, currentPage);

        return function cleanup() {
            props.setDogs([]);
        }
    },[])


    const onDogSort = () => {
        props.sortDogs();
        getDogs(!typeImg, pageSize, currentPage);
    }

   const onBreedSelect = (name, idBreed) => {

         if(idBreed === undefined) {
             props.setAllBreedName('Все собачки')
            getDogs(typeImg,pageSize, currentPage);
        } else {
            props.getDogsByBreed(idBreed, name)
        }
    }


   const onGetDogsMore = () => props.getDogsMore();

    const onSaveFovourite = (imageId, dogId) => props.saveFavoriteDog(imageId, dogId);

   const onDeleteFovourite = (imageId, id) => props.deleteDog(imageId, id);

    const onPagesChanged = (pageNumber) => {
        props.setCurrentPage(pageNumber)
        getDogs(typeImg, pageSize, currentPage);
    }

        return <>
            <Main totalDogsCount={
                     props.totalDogsCount}
                     pageSize={pageSize}
                     portionSize={props.portionSize}
                     currentPage={currentPage}
                     onPagesChanged={onPagesChanged}
                     onGetDogsMore={onGetDogsMore}
                     dogsData={props.dogsData}
                     sortDogs={sortDogs}
                     typeImg={typeImg}
                     follow={props.follow}
                     onDogSort={onDogSort}
                     onSaveFovourite={onSaveFovourite}
                     dogsFavoriteAll={props.dogsFavoriteAll}
                     onDeleteFovourite={onDeleteFovourite}
                     onBreedSelect={onBreedSelect}
                     breedValue={props.breedValue}
        />
        </>
    }



let mapStateToProps = (state) => {
    return {
        dogsData: getDogsData(state),
        pageSize: getPageSize(state),
        totalDogsCount: getTotalDogsCount(state),
        currentPage: getCurrentPage(state),
        typeImg: getTypeImg(state),
        isFetching: getIsFetching(state),
        dogsFavoriteAll: getDogsFavoriteAll(state),
        breedValue: getBreedValue(state),
        portionSize: getPortionSize(state)
    }
}




export default connect(mapStateToProps, {
    follow, addDog, setDogs,
    setCurrentPage, getDogsMore, sortDogs,
    toggleIsFetching, setAllFavoriteDogs,
    getDogs, saveFavoriteDog, deleteDog, getDogsByBreed, setAllBreedName
})(MainContainer);




