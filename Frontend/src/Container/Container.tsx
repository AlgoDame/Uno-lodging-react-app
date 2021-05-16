import React, { useState } from 'react';
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import Home from '../Components/Home/Home';
// import Modal from "./Components/Modal/Modal"
import Signup from "../Components/Signup/Signup"
import styles from "./Container.module.css"
import { Switch, Route, withRouter } from "react-router-dom"
interface Props {
    history: any;

}

const Container = (props: Props) => {
    const [show, setShow] = useState(false);
    const [isSignup, setSignup] = useState(false);
    const [userType, setUserType] = useState("guest");

    const toggleModal = () => {
        setShow(!show);
    }
    const guestSignUp = () => {
        setSignup(true);
        props.history.push("/signup/guest")
        setShow(true);
        setUserType("guest")
    }
    const hostSignUp = () => {
        setSignup(true);
        props.history.push("/signup/guest")
        setShow(true);
        setUserType("host")
    }
    const signIn = () => {
        setSignup(false)
        // toggleModal()
        props.history.push("/signin")
        setShow(true)
    }
    return (
        <div className={styles.Wrapper}>
            <Header toggle={toggleModal} guestSignUp={guestSignUp} hostSignUp={hostSignUp} signIn={signIn} />
            <Switch>
                <Route path="/" render={() => <Home show={show} hostSignUp={hostSignUp} />} />
                {/* <Redirect to="/" /> */}
                {/* <Route path="/signup" render={() => <Signup show={show} toggle={toggleModal} isSignup={isSignup} signIn={signIn} signUp={signUp} />} /> */}
            </Switch>
            <Signup show={show} type={userType} toggle={toggleModal} isSignup={isSignup} signIn={signIn} guestSignUp={guestSignUp} hostSignUp={hostSignUp} />
            <Footer />
        </div>
    )
}

export default withRouter(Container)
