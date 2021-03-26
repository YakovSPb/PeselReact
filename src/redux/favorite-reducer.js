import {dogsAPI} from "../api/api";

const SET_DOGS_FAVORITE = 'favorite/SET_DOGS_FAVORITE';
const TOGGLE_IS_FETCHING = 'favorite/TOGGLE_IS_FETCHING';
const SET_CURRENT_PAGE = 'favorite/SET_CURRENT_PAGE';
const FOLLOW = 'favorite/FOLLOW';
const LOAD_MORE_FAVORITE = 'favorite/LOAD_MORE_FAVORITE';

let initialState = {
    dogsDataFavorite: [],
    visible: 9,
    isFetching: true
}

const favoriteReducer = (state = initialState, action) => {

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

export const setDogsFavorite = (dogs) => ({type: SET_DOGS_FAVORITE, dogs});

export const setCurrentPage = (currentPageFavorite) => ({type: SET_CURRENT_PAGE, currentPageFavorite})

export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})

export const loadMoreFavorite = () => ({type: LOAD_MORE_FAVORITE})

export const follow = (id, imageId) => ({type: FOLLOW, id, imageId})


export const getFavoriteDogs = () => {
    return async (dispatch) => {
        let favoriteResponse = await dogsAPI.getAllFovourite();
        dispatch(setDogsFavorite(favoriteResponse));
        dispatch(toggleIsFetching(false));
    }
}

export const saveFavoriteDog = (dogId, imageId) => {
    return async (dispatch) => {
       let saveFavoriteResponse = await dogsAPI.saveFovourite(imageId)
        dispatch(follow(saveFavoriteResponse.id, imageId))
    }
}

export const deleteFavoriteDog = (dogId, imageId) => {
    return (dispatch) => {
         dogsAPI.deleteFovourite(dogId);
        dispatch(follow(dogId, imageId))
    }
}


export default favoriteReducer;