import React, {useEffect} from 'react';
import Dog from "./Dog";
import {connect} from "react-redux";
import {follow, getDog, setDog} from "../../redux/dog-reducer";
import {withRouter} from "react-router";
import {dogsAPI} from "../../api/api";
import {compose} from "redux";

import { useFetchFavorite,  useFetchDogById} from '../../hooks';

const DogsContainer = ({match, getDog, setDog, follow, dogProfile}) => {

    const dogId = match.params.dogId;
    const {favoriteDogs} = useFetchFavorite();
    const dogById = useFetchDogById(dogId,favoriteDogs)


    const onSaveFovourite = (id, imageId) => {
        dogsAPI.saveFovourite(imageId).then(response => {
            follow(response.id, imageId);
        })

    }

   const onDeleteFovourite = (id) => {
       dogsAPI.deleteFovourite(id);
       follow(id);
    }
        return <Dog isFetching={dogById.isFetching} dogProfile={dogById?.data} onSaveFovourite={onSaveFovourite} follow={follow} onDeleteFovourite={onDeleteFovourite} />
    }


let mapStateToProps = (state) => {
    return {dogProfile: state.dogReducer.dogProfile}
}

export default compose(
    connect(mapStateToProps, {follow, setDog, getDog}),
    withRouter
)(DogsContainer);


