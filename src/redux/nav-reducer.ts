import {dogsAPI} from "../api/api";
const SET_BREEDS = 'nav/SET_BREEDS';


type BreedsType = {
    name: string
}

let initialState = {
    breeds: null as Array<BreedsType> | null,
}

type InititalStateType = typeof initialState;

const navReducer = (state = initialState, action: any): InititalStateType => {

    switch (action.type) {
        case SET_BREEDS: {
            return {
                ...state, breeds: action.breeds
            }
        }

        default:
            return state;
    }
}


type SetBreedsActionType = {
    type: typeof SET_BREEDS
    breeds: Array<BreedsType>
}

export const setBreeds = (breeds: Array<BreedsType>): SetBreedsActionType => ({type: SET_BREEDS, breeds})

export const getBreeds = () => {
    return async (dispatch: any) => {
        let breedsResponse = await dogsAPI.getBreeds();
        breedsResponse.unshift({name: 'Все собачки'})
        dispatch(setBreeds(breedsResponse));
    }
}


export default navReducer;