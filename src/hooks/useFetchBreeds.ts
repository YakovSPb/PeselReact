import { useQuery } from "react-query"
import { api } from "../api/api";


export const useFetchBreeds = () => {
    const query = useQuery('breeds', api.fetchBreeds);

    return query;
}