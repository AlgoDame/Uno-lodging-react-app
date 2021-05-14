import React from 'react'
import styles from "./Profile.module.css"
import { CgProfile } from "react-icons/cg"
// import { IoMdArrowDropdown } from "react-icons/io"
import { DropdownButton, Dropdown } from 'react-bootstrap'

interface Props {
    signIn: () => void
    signUp: () => void
}

const Profile = (props: Props) => {
    return (
        <div className={styles.Profile}>
            {/* <div className={styles.Dropdown}> */}
            <DropdownButton className={styles.dropdownBtn} id="dropdown-basic-button" title={<i><CgProfile /></i>}>
                <Dropdown.Item href="#/action-1">Become a Host</Dropdown.Item>
                <Dropdown.Item href="#/action-2" onClick={props.signIn}>Login</Dropdown.Item>
                <Dropdown.Item href="#/action-3" onClick={props.signUp}>Sign up</Dropdown.Item>
            </DropdownButton>

            {/* </div> */}
        </div >
    )
}

export default Profile
