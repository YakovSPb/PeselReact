import s from './Nav.module.css'
import Select from 'react-select';


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
                            <div className={typeImg ? s.sort_abc__active : undefined}>Картинки</div>
                            <label className={s.switch}>
                                <input type="checkbox" checked={!typeImg && 'checked'} onChange={()=>{}}/>
                                    <span onClick={onDogSort} className={`${s.slider} ${s.round}`} />
                            </label>
                            <div className={!typeImg ? s.sort_abc__active : undefined}>Анимация</div>
                        </div>
                    </div>
                    <div className={s.breads}>
                        <div className={`${s.breads__all} ${s.breads_btn}`}>npВсе пёсели</div>
                        <div className={s.breads_inner}>
                            <div className={s.breads_btn}>Affenpinscher</div>
                            <div className={s.breads_btn}>Briard</div>
                            <div className={s.breads_btn}>Bulldog</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav;