import axios from 'axios';
import { useQuery} from "react-query";

const instance = axios.create({
    baseURL: 'https://api.thedogapi.com/v1/',
    headers: {
        "Content-Type": "application/json",
        "X-API-Key": 'a65a8739-f0bc-4c2e-8606-7045ff5b9eef'
    }
})

export const useFetchDogs = (isTypeImg:boolean) => useQuery(
    ['dogs'],
    () => instance.get(`images/search?size=small&mime_types=${isTypeImg ? 'jpg,png' : 'gif'}&limit=${10}&page=${1}&order=Desc/`))



export const getDogBreeds = async (currentPage:number, pageSize: number) => {
    const response = await instance.get(`breeds?page=${currentPage}&limit=${pageSize}`);
    return response.data;
};







