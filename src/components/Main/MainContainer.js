import React, { useEffect } from 'react';
import {
    follow, getDogsMore, getDogs,
    setAllFavoriteDogs, setDogs,
    sortDogs, toggleIsFetching, saveFavoriteDog,
    deleteDog, getDogsByBreed, setCurrentPage,
} from "../../redux/main-reducer";
import { connect } from "react-redux";
import Main from "./Main";
import {
    getCurrentPage, getDogsFavoriteAll, getIsFetching, getPageSize, getPortionSize,
    getTotalDogsCount, getTypeImg
} from "../../redux/main-selector";

import { useFetchDogs, useFetchFavorite } from '../../hooks';


const MainContainer = ({ getDogs, typeImg, pageSize, currentPage, ...props }) => {
    const {favoriteDogs, isFetching} = useFetchFavorite();
    const fetchDogs = useFetchDogs(typeImg, pageSize, currentPage, favoriteDogs);

    const onDogSort = () => {
        props.sortDogs();
        getDogs(!typeImg, pageSize, currentPage);
    }

    const onBreedSelect = (name, idBreed) => {
        if (idBreed === undefined) {
            getDogs(typeImg, pageSize, currentPage);
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
            dogsData={fetchDogs.data}
            sortDogs={sortDogs}
            typeImg={typeImg}
            follow={props.follow}
            onDogSort={onDogSort}
            onSaveFovourite={onSaveFovourite}
            dogsFavoriteAll={favoriteDogs}
            onDeleteFovourite={onDeleteFovourite}
            onBreedSelect={onBreedSelect}
            isFetching={fetchDogs.isFetching || isFetching}
        />
    </>
}



let mapStateToProps = (state) => {
    return {
        pageSize: getPageSize(state),
        totalDogsCount: getTotalDogsCount(state),
        currentPage: getCurrentPage(state),
        typeImg: getTypeImg(state),
        isFetching: getIsFetching(state),
        dogsFavoriteAll: getDogsFavoriteAll(state),
        portionSize: getPortionSize(state)
    }
}

export default connect(mapStateToProps, {
    follow, setDogs,
    setCurrentPage, getDogsMore, sortDogs,
    toggleIsFetching, setAllFavoriteDogs,
    getDogs, saveFavoriteDog, deleteDog, getDogsByBreed
})(MainContainer);




