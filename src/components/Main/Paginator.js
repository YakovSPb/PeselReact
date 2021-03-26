import React, {useState} from 'react';
import s from "./Paginator.module.css";
import arrow from '../../assets/img/back.png';

let Paginator = ({pagesCount, currentPage, onPagesChanged, portionSize, onGetDogsMore}) => {


    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;


    return <div className="container">
        <div className={s.paginator}>
            {portionNumber > 1 &&
            <span className={s.prev} onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}><img src={arrow} /></span>
            }
            {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p, index) => {
                    return <span key={index} className={currentPage === p ? s.selectedPage : undefined}
                                 onClick={(eee) => {
                                     onPagesChanged(p)
                                 }}>{p}</span>
                })}

            {portionCount > portionNumber &&
            <span className={s.next} onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}><img src={arrow} /></span>
            }
        </div>
        {portionCount === portionNumber &&
        <button className="btn" onClick={onGetDogsMore}>Загрузить еще</button>}
    </div>
}

export default Paginator;