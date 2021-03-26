import {dogsAPI} from "../api/api";

const ADD_DOG = 'main/ADD_DOG';
const FOLLOW = 'main/FOLLOW';
const SET_DOGS = 'main/SET_DOGS';
const SET_CURRENT_PAGE = 'main/SET_CURRENT_PAGE';
const GET_DOGS_MORE = 'main/GET_DOGS_MORE';
const SORT_DOGS = 'main/SORT_DOGS';
const TOGGLE_IS_FETCHING = 'main/TOGGLE_IS_FETCHING';
const SET_ALL_FAVORITE_DOGS = 'main/SET_ALL_FAVORITE_DOGS';
const SET_BREED_VALUE = 'main/SET_BREED_VALUE';

let initialState = {
    dogsData: [],
    dogsFavoriteAll: [],
    pageSize: 10,
    totalDogsCount: 200,
    portionSize: 5,
    currentPage: 1,
    typeImg: true,
    isFetching: true,
    follow: false,
    breedValue: 'Все собачки'

}

const mainReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                dogsData: state.dogsData.map(dog => {
                    if (dog.image_id === action.imageId) {
                        return {...dog, favorite: !dog.favorite, id: action.id}
                    }
                    return dog;
                })
            }
        }
        case ADD_DOG: {
            return {
                ...state,
                dogsData: [...state.dogsData, {id: 8, name: state.newDogBreadText}],
                newDogBreadText: ''
            };
        }
        case SET_DOGS: {
            return { ...state, dogsData: action.dogs}
        }
        case SET_ALL_FAVORITE_DOGS: {
            return { ...state, dogsFavoriteAll: action.dogsFavoriteAll}
        }

        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case GET_DOGS_MORE: {
            return {...state, totalDogsCount: state.totalDogsCount +=state.totalDogsCount}
        }
        case SORT_DOGS: {
            return {...state, typeImg: !state.typeImg}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case SET_BREED_VALUE: {
            return {...state, breedValue: action.name}
        }

        default:
            return state;
    }
}

export const follow = (id, imageId) => ({type: FOLLOW, id, imageId})

export const setDogs = (dogs) => ({type: SET_DOGS, dogs})

export const setAllFavoriteDogs = (dogsFavoriteAll) => ({type: SET_ALL_FAVORITE_DOGS, dogsFavoriteAll})

export const addDog = () => ({type: ADD_DOG});

export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})

export const getDogsMore = () => ({type: GET_DOGS_MORE})

export const sortDogs = () => ({type: SORT_DOGS})

export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})

export const setBreedValue = (name) => ({type: SET_BREED_VALUE, name})



export const getDogs = (typeImg, pageSize, currentPage) => {
    return async (dispatch) => {

       dispatch(toggleIsFetching(true));

       let allFavoriteResponse = await dogsAPI.getAllFovourite();
       dispatch(setAllFavoriteDogs(allFavoriteResponse));

       let getDogsResponse = await dogsAPI.getDogs(typeImg, pageSize, currentPage, allFavoriteResponse)
       dispatch(setDogs(getDogsResponse));
       dispatch(toggleIsFetching(false));
    }
}

export const saveFavoriteDog = (dogId, imageId) => {
    return async (dispatch) => {
        let saveFavoriteResponse = await dogsAPI.saveFovourite(imageId)
        dispatch(follow(saveFavoriteResponse.id, imageId))
    }
}

export const deleteDog = (dogId, imageId) => {
    return (dispatch) => {
        dogsAPI.deleteFovourite(dogId);
        dispatch(follow(dogId, imageId));
    }
}

export const getDogsByBreed = (breedId, name) => {
     return async (dispatch) => {

        let allFavoriteResponse = await dogsAPI.getAllFovourite();
        dispatch(setAllFavoriteDogs(allFavoriteResponse));

        let dogsResponse = await dogsAPI.getDogsByBreed(breedId, allFavoriteResponse);

        dispatch(setDogs(dogsResponse))
        dispatch(setBreedValue(name))

    }
}

export const setAllBreedName = (name) => {
    return (dispatch) => {
        dispatch(setBreedValue(name))
    }
}

export default mainReducer;
