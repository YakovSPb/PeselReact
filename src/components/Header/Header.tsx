import logo from '../../assets/img/logo.png';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';
import React from 'react';

const Header = () => {
  return (
    <div className={s.header}>
      <div className="container">
        <div className={s.header_inner}>
          <div className={s.logo}>
            <NavLink to="/">
              <img src={logo} alt="logo" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
