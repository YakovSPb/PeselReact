

export const getDogsData = (state) => {
    return state.mainReducer.dogsData;
}

export const getPageSize = (state) => {
    return state.mainReducer.pageSize;
}

export const getTotalDogsCount = (state) => {
    return state.mainReducer.totalDogsCount;
}

export const getCurrentPage = (state) => {
    return state.mainReducer.currentPage;
}

export const getTypeImg = (state) => {
    return state.mainReducer.typeImg;
}

export const getIsFetching = (state) => {
    return state.mainReducer.isFetching;
}

export const getDogsFavoriteAll = (state) => {
    return state.mainReducer.dogsFavoriteAll;
}

export const getBreedValue = (state) => {
    return state.mainReducer.breedValue;
}
export const getPortionSize = (state) => {
    return state.mainReducer.portionSize;
}