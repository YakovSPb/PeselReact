import React, { FC } from 'react';
import s from './ItemDog.module.css';
import { IBreed } from '../../types';

type ItemDogProps = {
  breed: IBreed;
};

const ItemDog: FC<ItemDogProps> = ({ breed }) => {
  return (
    <div key={breed.id} className={s.dog_item}>
      <div className={s.dog_item__img}>
        <img src={breed.image.url} alt="alt" />
      </div>
      <div className={s.dog_item__name}>{breed.name}</div>
    </div>
  );
};

export default ItemDog;
