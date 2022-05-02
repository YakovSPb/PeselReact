import s from './Nav.module.css'
import Select from 'react-select';
import cn from "classnames";

import { useFetchBreeds } from '../../hooks/useFetchBreeds';
import { useState } from 'react';


export const Nav = ({ typeImg, onBreedSelect, onDogSort }) => {

    const breeds = useFetchBreeds().data;
    if (breeds && breeds[0].name !== 'Все собачки') {
        breeds.unshift({ name: 'Все собачки' })
    }

    const [value, setValue] = useState()

    
    const handleChange = (selectedOption) => {
        const findDog = breeds.find(fDog => fDog.name === selectedOption.value)
        onBreedSelect(selectedOption.value, findDog.id, selectedOption.value);
        setValue(selectedOption)
    }

    return (
        <div>
            <div className={s.sort_inner}>
                <div className="container">
                    <div className={s.sort_nav}>
                        <div className={s.sort_brends}>
                            {breeds && typeImg &&
                                <Select
                                    value={value}
                                    placeholder={'Выбрать породу...'}
                                    onChange={handleChange}
                                    options={breeds.map(b => ({ value: b.name, label: b.name }))}
                                />
                            }
                        </div>
                        <div className={s.sort_abc}>
                            <div className={cn({ [s.sort_abc__active]: typeImg })}>Картинки</div>
                            <label className={s.switch}>
                                <input type="checkbox" checked={!typeImg && 'checked'} onChange={() => { }} />
                                <span onClick={onDogSort} className={cn(s.slider, s.round)} />
                            </label>
                            <div className={cn({ [s.sort_abc__active]: !typeImg })}>Анимация</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
