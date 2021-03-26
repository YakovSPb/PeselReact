import {dogsAPI} from "../api/api";
const SET_BREEDS = 'nav/SET_BREEDS';

let initialState = {
    breeds: null,

}

const navReducer = (state = initialState, action) => {

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

export const setBreeds = (breeds) => ({type: SET_BREEDS, breeds})

export const getBreeds = () => {
    return async (dispatch) => {
        let breedsResponse = await dogsAPI.getBreeds();
        breedsResponse.unshift({name: 'Все собачки'})
        dispatch(setBreeds(breedsResponse));
    }
}


export default navReducer;