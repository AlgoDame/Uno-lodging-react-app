import React from 'react'
import styles from "./Profile.module.css"
import { CgProfile } from "react-icons/cg"
// import { IoMdArrowDropdown } from "react-icons/io"
import { NavLink } from "react-router-dom"
import { DropdownButton, Dropdown } from 'react-bootstrap'

interface Props {
    signIn: () => void
    signUp: () => void,
    loggedIn: boolean,
    logout: () => void,
    route?: string
}

export const MobileProfile = (props: Props) => {
    return (
        <div className={styles.Profile}>
            {/* <div className={styles.Dropdown}> */}
            <DropdownButton className={styles.dropdownBtn} id="dropdown-basic-button" title={<i><CgProfile /></i>}>
                <Dropdown.Item><NavLink to="">Become a Host</NavLink></Dropdown.Item>
                <Dropdown.Item onClick={props.signIn}><NavLink to="" >Login</NavLink></Dropdown.Item>
                <Dropdown.Item onClick={props.signUp}><NavLink to="" >Sign up</NavLink></Dropdown.Item>
            </DropdownButton>

            {/* </div> */}
        </div >
    )
}
export const LoggedInProfile = (props: Props) => {
    let style;
    if (props.route !== "/home") {
        style = {
            "color": "#000"
        }
    }
    return (
        <div className={styles.Profile}>
            {/* <div className={styles.Dropdown}> */}
            <DropdownButton className={styles.dropdownBtn} id="dropdown-basic-button" title={<i style={style}><CgProfile /></i>}>
                <Dropdown.Item><NavLink to="">Profile</NavLink></Dropdown.Item>
                <Dropdown.Item onClick={props.signIn}><NavLink to="">Become a Host</NavLink></Dropdown.Item>
                <Dropdown.Item onClick={props.logout}><NavLink to="" >Logout</NavLink></Dropdown.Item>
            </DropdownButton>

            {/* </div> */}
        </div >
    )
}


