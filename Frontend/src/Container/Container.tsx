import React, { useContext } from 'react';
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import Home from '../Components/Home/Home';
// import Modal from "./Components/Modal/Modal"
import Signup from "../Components/Signup/Signup"
import styles from "./Container.module.css"
import { Switch, Route, withRouter } from "react-router-dom"
import AuthContext from '../store/AuthContext';
interface Props {
    history: any;

}

const Container = (props: Props) => {
    const ctx = useContext(AuthContext);

    return (
        <div className={styles.Wrapper}>
            <Header toggle={ctx.toggleModal} guestSignUp={ctx.guestSignUp} hostSignUp={ctx.hostSignUp} signIn={ctx.signIn} />
            <Switch>
                <Route path="/" render={() => <Home show={ctx.show} hostSignUp={ctx.hostSignUp} />} />
                {/* <Redirect to="/" /> */}
                {/* <Route path="/signup" render={() => <Signup show={show} toggle={toggleModal} isSignup={isSignup} signIn={signIn} signUp={signUp} />} /> */}
            </Switch>
            <Signup />
            <Footer />
        </div>
    )
}

export default withRouter(Container)
