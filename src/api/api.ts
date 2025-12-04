import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const instance = axios.create({
  baseURL: 'https://api.thedogapi.com/v1/',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'a65a8739-f0bc-4c2e-8606-7045ff5b9eef',
  },
});

export const useFetchDogs = (isTypeImg: boolean, limit = 10, page = 1) =>
  useQuery({
    queryKey: ['dogs', isTypeImg, limit, page], // Ключ уникален для каждого набора параметров
    queryFn: () =>
      instance.get(
        `images/search?size=small&mime_types=${isTypeImg ? 'jpg,png' : 'gif'}&limit=${limit}&page=${page}&order=Desc`
      ),
    // Опционально: можно добавить настройки кеша, например:
    // staleTime: 5 * 60 * 1000, // Данные считаются "свежими" 5 минут
  });

export const getDogBreeds = async (currentPage: number, pageSize: number) => {
  const response = await instance.get(`breeds?page=${currentPage}&limit=${pageSize}`);
  return response.data;
};
