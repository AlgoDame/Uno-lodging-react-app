import React from 'react'
import styles from "./Footer.module.css";
import logo from "../../assets/logo.svg";
import twitter from "../../assets/twitter.svg";
import linkedin from "../../assets/linkedin.svg";
import instagram from "../../assets/instagram.svg";
import facebook from "../../assets/facebook.svg";
import send from "../../assets/send.svg";
interface Props {

}

const Footer = (props: Props) => {
    return (
        <div className={styles.Wrapper}>
            <div className={styles.Line}></div>
            {/* <img src={logo} alt="" /> */}
            {/* <h2>UNOLODGING</h2> */}
            <div className={styles.Footer}>
                <div className={styles.Section}>
                    <h2>JOIN</h2>
                    <div>
                        <h3>
                            Become a host
                        </h3>
                        <h3>Sign up</h3>
                        <h3>Login</h3>
                    </div>
                </div>
                <div className={styles.Section}>
                    <h2>EXPLORE</h2>
                    <div>
                        <h3>Lagos</h3>
                        <h3>Abuja</h3>
                        <h3>Portharcourt</h3>
                        <h3>Kaduna</h3>
                        <h3>Ibadan</h3>
                    </div>
                </div>
                <div className={styles.Socials}>
                    <h2>Stay Updated</h2>
                    <form>
                        <input type="email" placeholder="Enter your email" />
                        <button><img src={send} alt="" /></button>
                    </form>
                </div>
            </div>
            <footer><div className={styles.text}>&copy; COPYRIGHT 2021 - UNOLODGING Inc. ALL RIGHTS RESERVED</div>
                <div className={styles.icons}>
                    <img src={facebook} alt="" />
                    <img src={instagram} alt="" />
                    <img src={twitter} alt="" />
                    <img src={linkedin} alt="" />
                    {/* <img src={youtube} alt="" /> */}
                </div>
            </footer>
        </div>
    )
}
export default Footer
