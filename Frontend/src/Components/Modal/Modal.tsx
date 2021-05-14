import React from 'react'
import styles from "./Modal.module.css"
import { AiOutlineClose } from "react-icons/ai"

interface Props {
    children: JSX.Element,
    show: boolean;
    toggle: () => void;
    title?: string

}


const Modal = (props: Props) => {

    return (
        <div className={props.show ? [styles.Modal, styles.Show].join(" ") : styles.Modal}>
            <div className={styles.Children}>
                <h1>{props.title}</h1>
                <span onClick={props.toggle}><AiOutlineClose /></span>
                {props.children}
            </div>
        </div >
    )
}

export default Modal
