import React, { FC, useEffect, useState } from 'react';
import s from './Paginator.module.css';

type PaginatorProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: FC<PaginatorProps> = ({ currentPage, totalPages, onPageChange }) => {
  const visiblePageNumbers = [];
  const maxVisibleButtons = 5; // Максимальное количество отображаемых кнопок

  // Определяем диапазон отображаемых кнопок пагинации
  let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

  if (totalPages <= maxVisibleButtons) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (endPage - startPage < maxVisibleButtons - 1) {
      startPage = endPage - maxVisibleButtons + 1;
    }
  }

  // Создаем массив отображаемых кнопок
  for (let i = startPage; i <= endPage; i++) {
    visiblePageNumbers.push(i);
  }

  return (
    <div className={s.pagination}>
      {currentPage > 1 && (
        <div className="prev" onClick={() => onPageChange(currentPage - 1)}>
          &laquo; Previous
        </div>
      )}

      {visiblePageNumbers.map((number) => (
        <div
          key={number}
          className={number === currentPage ? s.current : s.pageNumber}
          onClick={() => onPageChange(number)}
        >
          {number}
        </div>
      ))}

      {currentPage < totalPages && (
        <div className="next" onClick={() => onPageChange(currentPage + 1)}>
          Next &raquo;
        </div>
      )}
    </div>
  );
};

export default Pagination;
