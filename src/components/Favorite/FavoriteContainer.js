import React, {useEffect} from 'react';
import {
    deleteFavoriteDog, getFavoriteDogs, loadMoreFavorite,
    saveFavoriteDog, setDogsFavorite, follow,
    setCurrentPage, toggleIsFetching
} from "../../redux/favorite-reducer";
import Favorite from "./Favorite";
import {connect} from "react-redux";


const FavoriteContainer = (props) => {

    useEffect( () => {
        props.getFavoriteDogs();

        return function cleanup() {
            props.setDogsFavorite([])
        }

    }, [])


   const onLoadMore = () => props.loadMoreFavorite();

    const onSaveFovourite = (dogId, imageId) => props.saveFavoriteDog(dogId, imageId);

    const onDeleteFovourite = (dogId, imageId) => props.deleteFavoriteDog(dogId, imageId);

        return <>
            <Favorite totalDogsCountFavorite={props.totalDogsCountFavorite}
                  pageSizeFavorite={props.pageSizeFavorite}
                  currentPageFavorite={props.currentPageFavorite}
                  dogsDataFavorite={props.dogsDataFavorite}
                  onLoadMore={onLoadMore}
                  onSaveFovourite={onSaveFovourite}
                  onDeleteFovourite={onDeleteFovourite}
                  visible={props.visible}
            />
        </>
    }



let mapStateToProps = (state) => {
    return {
        dogsDataFavorite: state.favoriteReducer.dogsDataFavorite,
        pageSizeFavorite:  state.favoriteReducer.pageSizeFavorite,
        totalDogsCountFavorite: state.favoriteReducer.totalDogsCountFavorite,
        currentPageFavorite: state.favoriteReducer.currentPageFavorite,
        isFetching: state.favoriteReducer.isFetching,
        visible: state.favoriteReducer.visible
    }
}


export default connect(mapStateToProps, {follow, setDogsFavorite, toggleIsFetching, setCurrentPage, loadMoreFavorite, getFavoriteDogs, saveFavoriteDog, deleteFavoriteDog})(FavoriteContainer);
