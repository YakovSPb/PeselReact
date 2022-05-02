import { useQuery } from "react-query"
import { api } from "../api/api";


export const useFetchFavorite = () => {
    const query = useQuery('favourites', api.fetchFavorite);
    const isFetching = query.isFetching
    const dogData = query.data
    const favoriteDogs = dogData?.data.map((dog:any) => ({ ...dog, favorite: true }));
    return {favoriteDogs, isFetching}
}