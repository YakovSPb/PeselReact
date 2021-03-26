import {dogsAPI} from "../api/api";

const SET_DOG = 'dog/SET_DOG';
const FOLLOWSINGE = 'dog/FOLLOWSINGE';

let initialState = {
    dogProfile: [],
    isFetching: true
}

const dogReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_DOG: {
            return {
                ...state, dogProfile: action.dogProfile
            }
        }
        case FOLLOWSINGE: {
         let stateCopy = {...state};
            stateCopy.dogProfile = {...state.dogProfile};
            stateCopy.dogProfile.favorite = !state.dogProfile.favorite
            stateCopy.dogProfile.id = action.id;
            return stateCopy;
        }


        default:
            return state;
    }
}

export const setDog = (dogProfile) => ({type: SET_DOG, dogProfile})


export const follow = (id, imageId) =>  ({type: FOLLOWSINGE, id, imageId})

export const getDog = (dogId) => async (dispatch) => {

      let favoriteResponse =  await dogsAPI.getAllFovourite();
      let singeDogResponse = await dogsAPI.getSingleDog(dogId, favoriteResponse)

      dispatch(setDog(singeDogResponse))

}


export default dogReducer;