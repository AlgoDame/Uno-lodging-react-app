import React, { useState } from 'react';
import Profile from '../Profile/Profile';
import SearchBar from "../SearchBar/SearchBar";
import styles from './Header.module.css';
interface Props {
    toggle: () => void
    signIn: () => void
    signUp: () => void
}

const Header = (props: Props) => {

    const [scroll, setScroll] = useState(false);

    const toggleNav = () => {
        if (window.scrollY >= 80) {
            setScroll(true);
        } else setScroll(false);
    };
    window.addEventListener("scroll", toggleNav);

    const signedIn = false
    return (
        <nav className={!scroll ? [styles.Header, styles.Top].join(" ") : [styles.Header, styles.Scroll].join(" ")}>
            <div className={styles.Brand}>
                <svg width="124" height="45" viewBox="0 0 154 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M27.6169 31.8662H26.1169V33.3662V45.945H16.8073V28.6732V27.1732H15.3073H11.974L32.5408 9.53118L53.1076 27.1732H49.7744H48.2744V28.6732V45.945H38.9647V33.3662V31.8662H37.4647H27.6169Z" stroke-width="3" />
                    <path d="M79.8297 28.5156V40.6904C79.8297 42.7132 79.1949 44.3128 77.9254 45.4893C76.6643 46.6657 74.9378 47.2539 72.7457 47.2539C70.5875 47.2539 68.8736 46.6826 67.6041 45.54C66.3346 44.3975 65.6871 42.8275 65.6617 40.8301V28.5156H69.4703V40.7158C69.4703 41.9261 69.7581 42.8105 70.3336 43.3691C70.9176 43.9193 71.7216 44.1943 72.7457 44.1943C74.887 44.1943 75.9745 43.0687 76.0084 40.8174V28.5156H79.8297ZM100.584 47H96.7754L89.3613 34.8379V47H85.5527V28.5156H89.3613L96.7881 40.7031V28.5156H100.584V47ZM121.694 38.1768C121.694 39.9964 121.372 41.5918 120.729 42.9629C120.086 44.334 119.163 45.3919 117.961 46.1367C116.768 46.8815 115.397 47.2539 113.848 47.2539C112.316 47.2539 110.949 46.8857 109.747 46.1494C108.546 45.4131 107.615 44.3636 106.954 43.001C106.294 41.6299 105.96 40.0557 105.952 38.2783V37.3643C105.952 35.5446 106.277 33.945 106.929 32.5654C107.589 31.1774 108.516 30.1152 109.709 29.3789C110.911 28.6341 112.282 28.2617 113.823 28.2617C115.363 28.2617 116.73 28.6341 117.923 29.3789C119.125 30.1152 120.052 31.1774 120.704 32.5654C121.364 33.945 121.694 35.5404 121.694 37.3516V38.1768ZM117.834 37.3389C117.834 35.4007 117.487 33.9281 116.793 32.9209C116.099 31.9137 115.109 31.4102 113.823 31.4102C112.545 31.4102 111.559 31.9095 110.865 32.9082C110.171 33.8984 109.819 35.3542 109.811 37.2754V38.1768C109.811 40.0641 110.158 41.5283 110.852 42.5693C111.546 43.6104 112.545 44.1309 113.848 44.1309C115.126 44.1309 116.108 43.6315 116.793 42.6328C117.479 41.6257 117.826 40.1615 117.834 38.2402V37.3389Z" />
                </svg>
            </div>
            <SearchBar placeholder="Find a room" />
            <div className={styles.Links}>
                <button>Become a host</button>
                <button onClick={props.signUp}>Sign up</button>
                <button onClick={props.signIn}>{signedIn ? "I'm in" : "Login"}</button>
            </div>
            <div className={styles.Dropdown}>
                <Profile signIn={props.signIn} signUp={props.signUp} />
            </div>

        </nav>
    )
}

export default Header
