import React, { useState } from 'react';
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Home from './Components/Home/Home';
// import Modal from "./Components/Modal/Modal"
import Signup from "./Components/Signup/Signup"
import { Switch, Route, withRouter } from "react-router-dom"
interface Props {
    history: any;

}

const Container = (props: Props) => {
    const [show, setShow] = useState(false);
    const [isSignup, setSignup] = useState(false);

    const toggleModal = () => {
        setShow(!show);
    }
    const signUp = () => {
        setSignup(true);
        props.history.push("/signup")
        setShow(true)
    }
    const signIn = () => {
        setSignup(false)
        toggleModal()
        props.history.push("/signin")
        setShow(true)
    }
    return (
        <div>
            <Header toggle={toggleModal} signUp={signUp} signIn={signIn} />
            <Switch>
                <Route path="/" render={() => <Home show={show} />} />
                {/* <Redirect to="/" /> */}
                {/* <Route path="/signup" render={() => <Signup show={show} toggle={toggleModal} isSignup={isSignup} signIn={signIn} signUp={signUp} />} /> */}
            </Switch>
            <Signup show={show} toggle={toggleModal} isSignup={isSignup} signIn={signIn} signUp={signUp} />
            <Footer />
        </div>
    )
}

export default withRouter(Container)
