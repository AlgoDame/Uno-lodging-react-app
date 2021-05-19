import React, { useContext, Suspense } from 'react';
import { RoomDetails, Home, RoomsList } from "../routes"
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
// import Modal from "./Components/Modal/Modal"
import Signup from "../Components/Signup/Signup"
import SearchResults from "../Components/SearchResults/SearchResults"
import styles from "./Container.module.css"
import { Switch, Route, withRouter, Redirect } from "react-router-dom"
import AuthContext from '../store/AuthContext';
interface Props {
    history: any;

}

const Container = (props: Props) => {
    const ctx = useContext(AuthContext);

    return (
        <div className={styles.Wrapper}>
            <Header />
            <Switch>
                <Route path="/room/:roomId" render={() =>
                    <Suspense fallback={<div>Loading...</div>}>
                        <RoomDetails />
                    </Suspense>} />
                <Route path="/rooms" render={() =>
                    <Suspense fallback={<div>Loading...</div>}>
                        <RoomsList />
                    </Suspense>} />
                {/* <Route path="/signup" render={() => <Signup show={show} toggle={toggleModal} isSignup={isSignup} signIn={signIn} signUp={signUp} />} /> */}
                <Route path="/home" render={() =>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Home show={ctx.show} hostSignUp={ctx.hostSignUp} />
                    </Suspense>
                } />
                <Redirect to="/home" />
            </Switch>
            <Signup />
            {ctx.showResults ? <SearchResults results={ctx.searchResults} /> : null}
            <Footer />
        </div>
    )
}

export default withRouter(Container)
