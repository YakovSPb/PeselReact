import { useQuery } from "react-query"
import { api } from "../api/api";


export const useFetchDogs = (typeImg: any, pageSize: any, currentPage: any, favoriteDogArr: any = []) => {
    const query = useQuery(['dogs', favoriteDogArr], () => api.fetchDogs(typeImg, pageSize, currentPage, favoriteDogArr));
    return query;
}
