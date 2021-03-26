import React, {useEffect} from 'react';
import Nav from "./Nav";
import {getBreeds, setBreeds} from "../../redux/nav-reducer";
import {connect} from "react-redux";


const NavContainer = ({getBreeds, breedValue, breeds, typeImg, onDogSort, onBreedSelect}) => {

    useEffect(() => {
        getBreeds();
    }, [])

        return (
            <>
                <Nav breedValue={breedValue} breeds={breeds}
                    typeImg={typeImg} onDogSort={onDogSort}
                    onBreedSelect={onBreedSelect} />
            </>
        )
    }

let mapStateToProps = (state) => {
    return {
        breeds: state.navReducer.breeds,
        breedValue: state.navReducer.breedValue
    }
}

export default connect(mapStateToProps, {setBreeds, getBreeds})(NavContainer);