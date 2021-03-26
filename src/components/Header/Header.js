import logo from '../../assets/img/logo.png';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <header className={s.header}>
            <div className="container">
                <div className={s.header_inner}>

                    <div className={s.logo}><NavLink to="/"><img src={logo} alt="logo"/></NavLink></div>
                    <NavLink className={s.favorite_link} to="/favorite" activeClassName={s.active}>Избранные пёсели
                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M7.59056 13.8381L1.44808 8.00922C-0.482693 6.17704 -0.482693 3.20132 1.44808 1.36913C3.24062 -0.331881 6.06651 -0.447887 8 1.02111C9.93349 -0.447887 12.7594 -0.331881 14.5519 1.36913C16.4827 3.20132 16.4827 6.17704 14.5519 8.00922L8.40944 13.8381C8.1819 14.054 7.8181 14.054 7.59056 13.8381ZM2.26705 2.18038C0.805427 3.56738 0.805427 5.81097 2.26705 7.19796L8.0001 12.6383L13.7332 7.19796C15.1948 5.81097 15.1948 3.56738 13.7332 2.18038C12.2645 0.786714 9.8782 0.786714 8.40954 2.18038C8.182 2.3963 7.8182 2.3963 7.59067 2.18038C6.122 0.786714 3.73572 0.786714 2.26705 2.18038Z" fill="#626262"/></svg>
                    </NavLink>

                </div>
            </div>
        </header>
    )
}

export default Header;