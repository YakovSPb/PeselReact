import s from './Modal.module.css'

const Modal = ({title, message}) => {
    return(
        <>
            <div className={s.modal}>
                <div className={s.modal_dialog}>
                    <div className={s.modal_content}>
                        <div className={s.modal_header}>
                            <h3 className={s.modal_title}>{title}</h3>
                        </div>
                        <div className={s.modal_body}>
                            <p>{message}</p>
                            <p>Это сообщение самоуничтожится в течение 5 секунд.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;