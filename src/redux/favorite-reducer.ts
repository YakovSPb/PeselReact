import {dogsAPI} from "../api/api";
import {DogType} from "../types/types";

const SET_DOGS_FAVORITE = 'favorite/SET_DOGS_FAVORITE';
const TOGGLE_IS_FETCHING = 'favorite/TOGGLE_IS_FETCHING';
const SET_CURRENT_PAGE = 'favorite/SET_CURRENT_PAGE';
const FOLLOW = 'favorite/FOLLOW';
const LOAD_MORE_FAVORITE = 'favorite/LOAD_MORE_FAVORITE';

let initialState = {
    dogsDataFavorite: [] as Array<DogType>,
    visible: 9,
    isFetching: true
}

type IntitalStateType = typeof initialState;

const favoriteReducer = (state = initialState, action: any):IntitalStateType => {

        switch(action.type) {
            case FOLLOW: {
                return {
                    ...state,
                    dogsDataFavorite: state.dogsDataFavorite.map(dog => {

                        if (dog.image_id === action.imageId) {
                            return {...dog, favorite: !dog.favorite, id: action.id}
                        }
                        return dog;
                    })
                }
            }
            case SET_DOGS_FAVORITE: {
                return { ...state, dogsDataFavorite: action.dogs}
            }
            case TOGGLE_IS_FETCHING: {
                return {...state, isFetching: action.isFetching}
            }
            case LOAD_MORE_FAVORITE: {
                return {...state, visible: state.visible + 9}
            }
            default:
                return state;
        }
}

type SetDogsFavoriteAction = {
    type: typeof SET_DOGS_FAVORITE
    dogs: Array<DogType>
}

export const setDogsFavorite = (dogs: Array<DogType>): SetDogsFavoriteAction => ({type: SET_DOGS_FAVORITE, dogs});

type typeSetCurrentPageAction = {
    type: typeof SET_CURRENT_PAGE
    currentPageFavorite: number
}

export const setCurrentPage = (currentPageFavorite: number): typeSetCurrentPageAction => ({type: SET_CURRENT_PAGE, currentPageFavorite})

type typeToggleIsFetchingAction = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}

export const toggleIsFetching = (isFetching:boolean): typeToggleIsFetchingAction => ({type: TOGGLE_IS_FETCHING, isFetching})

type LoadMoreFavoriteAction = {
    type: typeof LOAD_MORE_FAVORITE
}

export const loadMoreFavorite = (): LoadMoreFavoriteAction => ({type: LOAD_MORE_FAVORITE})

type typeFollowAction = {
    type: typeof FOLLOW
    id: number
    imageId: string
}

export const follow = (id: number, imageId: string): typeFollowAction => ({type: FOLLOW, id, imageId})


export const getFavoriteDogs = () => {
    return async (dispatch: any) => {
        let favoriteResponse = await dogsAPI.getAllFovourite();
        dispatch(setDogsFavorite(favoriteResponse));
        dispatch(toggleIsFetching(false));
    }
}

export const saveFavoriteDog = (dogId: number, imageId: string) => {
    return async (dispatch: any) => {
       let saveFavoriteResponse = await dogsAPI.saveFovourite(imageId)
        dispatch(follow(saveFavoriteResponse.id, imageId))
    }
}

export const deleteFavoriteDog = (dogId: number, imageId: string) => {
    return (dispatch: any) => {
         dogsAPI.deleteFovourite(dogId);
        dispatch(follow(dogId, imageId))
    }
}


export default favoriteReducer;