import { useQuery } from "react-query"
import { api } from "../api/api";

export const useFetchDogById = (dogId: any, favoriteDogArr: any) => {
    const query = useQuery(['dog', favoriteDogArr], () => api.fetchDogById(dogId, favoriteDogArr));
    return query;
}
