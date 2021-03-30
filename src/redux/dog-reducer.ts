import {dogsAPI} from "../api/api";
import {DogType} from "../types/types";
const SET_DOG = 'dog/SET_DOG';
const FOLLOWSINGE = 'dog/FOLLOWSINGE';



let initialState = {
    dogProfile: {
        id: 0,
        image_id: '',
        name: '',
        url: '',
        temperament: '',
        weight: 0,
        height: 0,
        favorite: false
    },
    isFetching: true,
}

type InititalStatetype = typeof initialState;

const dogReducer = (state = initialState, action: any): InititalStatetype => {

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

type DogProfileActionType = {
    type: typeof SET_DOG
    dogProfile: DogType
}

export const setDog = (dogProfile: DogType):DogProfileActionType => ({type: SET_DOG, dogProfile})

type FollowActionType = {
    type: typeof FOLLOWSINGE
    id: number
    imageId: string
}

export const follow = (id:number, imageId:string):FollowActionType =>  ({type: FOLLOWSINGE, id, imageId})


export const getDog = (dogId: number) => async (dispatch: any) => {

      let favoriteResponse =  await dogsAPI.getAllFovourite();
      let singeDogResponse = await dogsAPI.getSingleDog(dogId, favoriteResponse)

      dispatch(setDog(singeDogResponse))

}


export default dogReducer;