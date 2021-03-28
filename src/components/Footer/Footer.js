import React, {useState} from 'react';
import emailjs from 'emailjs-com';
import s from './Footer.module.css';
import {Formik} from 'formik';
import * as yup from 'yup';


const Footer = React.memo(() => {

   let [message, setMessage] =  useState('');

   const setSuccessMessage = () => setMessage('Ваше сообщение доставлено!');
   const setErrorMessage =() => setMessage('Ошибка в доставке сообщения');

        return (
            <div className={s.footer}>
                <div className="container">
                    <h4>Обратная связь</h4>
                    <FormFooter message={message} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage}/>
                </div>
            </div>
        )
    }
)

const FormFooter = ({setSuccessMessage, setErrorMessage, message}) => {

    const validationSchema = yup.object().shape({
        name: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
        email: yup.string().email("Введите верный email").required('Обязательное поле'),
        phone: yup.string(),
        message: yup.string(),
    })


    return <>
        <Formik
            initialValues={{
                name: '', email: '', phone: '', comment: '',
            }}
            validateOnBlur
            onSubmit={((values, {resetForm}) => {
                emailjs.sendForm('service_punoryr', 'template_c4fe7tp', '.form', 'user_OCEnhMw4DdERFt3SysZcD')
                    .then((result) => {
                        setSuccessMessage()
                    }, (error) => {
                        setErrorMessage();
                    });
                resetForm();
            })}
            validationSchema={validationSchema}
        >
            {({
                  values, errors, touched,
                  handleChange, handleBlur, isValid,
                  handleSubmit, dirty
              }) => {
                return <form className={s.form + ' form'}>
                    <div className={s.form_input}>
                        <div>
                            <input type={"text"} name={"name"} onChange={handleChange} onBlur={handleBlur}
                                   placeholder={"Имя"} value={values.name}/>
                            {touched.name && errors.name && <p className={s.error}>{errors.name}</p>}
                        </div>
                        <div>
                            <input type={"email"} name={"email"} onChange={handleChange} onBlur={handleBlur}
                                   placeholder={"Почта"} value={values.email}/>
                            {touched.email && errors.email && <p className={s.error}>{errors.email}</p>}
                        </div>
                        <div>
                            <input type={"tel"} name={"phone"} onChange={handleChange} onBlur={handleBlur}
                                   placeholder={"Телефон"} value={values.phone}/>
                            {touched.phone && errors.phone && <p className={s.error}>{errors.phone}</p>}
                        </div>
                    </div>
                    <div>
                        <div>
                            <textarea name={"comment"} onChange={handleChange} onBlur={handleBlur}
                                                           placeholder={"Сообщение"} value={values.comment}/>
                            {touched.comment && errors.comment && <p className={s.error}>{errors.comment}</p>}
                        </div>
                    </div>
                    {(message === 'Ваше сообщение доставлено!')
                        ? <span className={s.message_success}>{message}</span>
                        : <span className={s.message_error}>{message}</span>
                    }
                    <button disabled={!isValid && !dirty} onClick={handleSubmit} type={'submit'}>Отправить</button>
                </form>
            }}
        </Formik>
        <p>© By Yakov Kondratev 2021 info@prospekt.pro</p>
    </>

}

export default Footer;