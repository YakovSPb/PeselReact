import s from './Nav.module.css'
import Select from 'react-select';
import cn from "classnames";


const Nav = ({breeds, typeImg, breedValue, onBreedSelect, onDogSort}) => {

    return(
        <div>
            <div className={s.sort_inner}>
                <div className="container">
                    <div className={s.sort_nav}>
                        <div className={s.sort_brends}>
                            {breeds && typeImg &&
                            <Select
                                value={breedValue}
                                placeholder={'Выбрать породу...'}
                                onChange={(name) => {
                                    const selectedIdBreed = name.value;
                                    const findDog = breeds.find(fDog => fDog.name === selectedIdBreed)
                                     onBreedSelect(name.value, findDog.id, selectedIdBreed);
                                }}
                                options={breeds.map(b => ({value: b.name, label: b.name}))}
                            />
                            }
                        </div>
                        <div className={s.sort_abc}>
                            <div className={cn({[s.sort_abc__active]: typeImg})}>Картинки</div>
                            <label className={s.switch}>
                                <input type="checkbox" checked={!typeImg && 'checked'} onChange={()=>{}}/>
                                    <span onClick={onDogSort} className={cn(s.slider, s.round)} />
                            </label>
                            <div className={cn({[s.sort_abc__active]: !typeImg})}>Анимация</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav;