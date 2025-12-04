import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import s from './Footer.module.css';
import { Formik } from 'formik';
import * as yup from 'yup';

const Footer = () => {
  return (
    <div className={s.footer}>
      <div className="container">
        <h4>Обратная связь</h4>
        <p>© By Yakov Kondratev 2021 itmeetm@gmail.com</p>
      </div>
    </div>
  );
};

export default Footer;
