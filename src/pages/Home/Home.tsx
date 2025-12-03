import React, {useEffect, useState} from 'react';
import { getDogBreeds, useFetchDogs} from "../../api/api";
import {useQuery} from "@tanstack/react-query";

import s from "./Home.module.css";
import ItemDog from "../../components/ItemDog/ItemDog";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/common/Loader/Loader";
import {IBreed} from "../../types";
import Paginator from "../../components/common/Paginator/Paginator";

let Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const {
        data,
        isLoading,
    } = useQuery({
        queryKey: ['dogBreeds', currentPage, pageSize], // 1. Ключ зависит от страницы и размера
        queryFn: () => getDogBreeds(currentPage, pageSize), // 2. Функция использует актуальные значения
        staleTime: 24 * 60 * 60 * 1000,
    });

     const breeds: IBreed[] = (data || []) as IBreed[];

    const onPageChange = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    if (isLoading) {
        return <Loader />
    }

    return (
        <div>
            <Nav
                pageSize={pageSize}
                setPageSize={setPageSize}
            />
            <main className={s.main}>
                <div className="container">
                    <div className={s.dogs_list}>{breeds?.map((breed:any) => <ItemDog breed={breed}/>)}</div>
                        <Paginator currentPage={currentPage} totalPages={171} onPageChange={onPageChange} />
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Home;