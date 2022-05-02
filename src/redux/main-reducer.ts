import {dogsAPI} from "../api/api";
import {DogType} from "../types/types";

const FOLLOW = 'main/FOLLOW';
const SET_DOGS = 'main/SET_DOGS';
const SET_CURRENT_PAGE = 'main/SET_CURRENT_PAGE';
const GET_DOGS_MORE = 'main/GET_DOGS_MORE';
const SORT_DOGS = 'main/SORT_DOGS';
const TOGGLE_IS_FETCHING = 'main/TOGGLE_IS_FETCHING';
const SET_ALL_FAVORITE_DOGS = 'main/SET_ALL_FAVORITE_DOGS';
const SET_BREED_VALUE = 'main/SET_BREED_VALUE';

let initialState = {
    dogsData: [] as Array<DogType>,
    dogsFavoriteAll: [] as Array<DogType>,
    pageSize: 10,
    totalDogsCount: 200,
    portionSize: 5,
    currentPage: 1,
    typeImg: true,
    isFetching: true,
    follow: false,
}

type InitialStateType = typeof initialState;


const mainReducer = (state = initialState, action: any): InitialStateType => {

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
        default:
            return state;
    }
}

type FollowActionType = {
    type: typeof FOLLOW
    id: number
    imageId: string
}

export const follow = (id: number, imageId: string): FollowActionType => ({type: FOLLOW, id, imageId})

type SetDogsActionType = {
    type: typeof SET_DOGS
    dogs: Array<DogType>
}

export const setDogs = (dogs: Array<DogType>):SetDogsActionType => ({type: SET_DOGS, dogs})

type DogsFavoriteAllActionType = {
    type: typeof SET_ALL_FAVORITE_DOGS
    dogsFavoriteAll: Array<DogType>
}

export const setAllFavoriteDogs = (dogsFavoriteAll: Array<DogType>):DogsFavoriteAllActionType => ({type: SET_ALL_FAVORITE_DOGS, dogsFavoriteAll})

type CurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}

export const setCurrentPage = (currentPage: number): CurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage})

type GetDogsMoreActionType = {
    type: typeof GET_DOGS_MORE
}

export const getDogsMore = ():GetDogsMoreActionType => ({type: GET_DOGS_MORE})

type SortDogsActionType = {
    type: typeof SORT_DOGS
}

export const sortDogs = ():SortDogsActionType => ({type: SORT_DOGS})

type IsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}

export const toggleIsFetching = (isFetching: boolean): IsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching})

type SetBreedValueActionType = {
    type: typeof SET_BREED_VALUE
    name: string
}


export const getDogs = (typeImg: string, pageSize: string, currentPage: string) => {
    return async (dispatch: any) => {

       dispatch(toggleIsFetching(true));

       let allFavoriteResponse = await dogsAPI.getAllFovourite();
       dispatch(setAllFavoriteDogs(allFavoriteResponse));

       let getDogsResponse = await dogsAPI.getDogs(typeImg, pageSize, currentPage, allFavoriteResponse)
       dispatch(setDogs(getDogsResponse));
       dispatch(toggleIsFetching(false));
    }
}

export const saveFavoriteDog = (dogId: number, imageId: string) => {
    return async (dispatch: any) => {
        let saveFavoriteResponse = await dogsAPI.saveFovourite(imageId)
        dispatch(follow(saveFavoriteResponse.id, imageId))
    }
}

export const deleteDog = (dogId: number, imageId: string) => {
    return (dispatch: any) => {
        dogsAPI.deleteFovourite(dogId);
        dispatch(follow(dogId, imageId));
    }
}

export const getDogsByBreed = (breedId: number, name: string) => {
     return async (dispatch: any) => {

        let allFavoriteResponse = await dogsAPI.getAllFovourite();
        dispatch(setAllFavoriteDogs(allFavoriteResponse));

        let dogsResponse = await dogsAPI.getDogsByBreed(breedId, allFavoriteResponse);

        dispatch(setDogs(dogsResponse))

    }
}


export default mainReducer;
