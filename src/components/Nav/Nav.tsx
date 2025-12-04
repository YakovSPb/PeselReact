import s from './Nav.module.css';
import React, { FC, memo, useCallback, useMemo } from 'react';
import Select from 'react-select';

type NavProps = {
  pageSize: number;
  onChangePageSize: (page: number) => void;
};

const Nav: FC<NavProps> = ({ pageSize, onChangePageSize }) => {
  type TOption = {
    value: number;
    label: number;
  };
  const handleChangePageSize = useCallback((option: TOption) => {
    onChangePageSize(option.value);
  }, []);

  const pageSizeOptions: TOption[] = [
    { value: 4, label: 4 },
    { value: 7, label: 7 },
    { value: 10, label: 10 },
  ];

  const currentPageSize = useMemo(
    () => pageSizeOptions.find((o: TOption) => o.value === pageSize) || null,
    [pageSize, pageSizeOptions] // исправлен порядок зависимостей
  );
  return (
    <div>
      <div className="container">
        <div className={s.sort_inner}>
          <div className={s.sort_nav}>
            <Select
              className={s.select}
              isSearchable={false}
              value={currentPageSize}
              onChange={handleChangePageSize}
              options={pageSizeOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Nav);
