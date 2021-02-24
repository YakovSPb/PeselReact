function Nav() {
    return(
        <div>
            <div className="sort_inner">
                <div className="container">
                    <div className="sort_nav">
                        <div className="sort_brends">Породы</div>
                        <div className="sort_abc">
                            <div className="sort_abc__text">Сортировка по алфавиту</div>
                            <label className="switch">
                                <input type="checkbox" />
                                    <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                    <div className="breads">
                        <div className="breads__all breads_btn">Все пёсели</div>
                        <div className="breads_inner">
                            <div className="breads_btn">Affenpinscher</div>
                            <div className="breads_btn">Briard</div>
                            <div className="breads_btn">Bulldog</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav;