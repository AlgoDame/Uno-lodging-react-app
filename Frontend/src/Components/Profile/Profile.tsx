import React from 'react'
import styles from "./Profile.module.css"
import { CgProfile } from "react-icons/cg"
// import { IoMdArrowDropdown } from "react-icons/io"
import { useHistory } from "react-router-dom"
import { DropdownButton, Dropdown } from 'react-bootstrap'

interface Props {
    signIn?: () => void
    signUp?: () => void,
    loggedIn: boolean,
    logout: () => void,
    route?: string,
    type?: string;
    name: string;
}

export const MobileProfile = (props: Props) => {


    return (
        <div className={styles.Profile}>
            {/* <div className={styles.Dropdown}> */}
            <DropdownButton className={styles.dropdownBtn} id="dropdown-basic-button" title={<i><CgProfile /></i>}>
                <Dropdown.Item>Become a Host</Dropdown.Item>
                <Dropdown.Item onClick={props.signIn}>Login</Dropdown.Item>
                <Dropdown.Item onClick={props.signUp}>Sign up</Dropdown.Item>
            </DropdownButton>

            {/* </div> */}
        </div >
    )
}
export const LoggedInProfile = (props: Props) => {
    const history = useHistory();
    const showFavorites = () => {
        history.push(`/${props.name}/favorites`)
    }
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
                <Dropdown.Item className={styles.username}>{props.name}</Dropdown.Item>
                <Dropdown.Divider />
                {props.type === "guest" && <><Dropdown.Item onClick={showFavorites}>Favorites</Dropdown.Item>
                    <Dropdown.Item onClick={() => history.push("/host/listroom")}>Become a Host</Dropdown.Item></>}
                {props.type === "host" && <>
                    <Dropdown.Item onClick={() => history.push("/host/listroom")}>Add a listing</Dropdown.Item>
                    <Dropdown.Item onClick={showFavorites}>My Listings</Dropdown.Item>
                    <Dropdown.Item onClick={props.signUp}>Bookings</Dropdown.Item></>}

                <Dropdown.Item style={{ color: "red" }}
                    onClick={props.logout}>Logout</Dropdown.Item>
            </DropdownButton>

            {/* </div> */}
        </div >
    )
}


