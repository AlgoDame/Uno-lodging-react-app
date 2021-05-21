import React from 'react'
import styles from "./About.module.css";
import schedule from "../../assets/schedule.svg"
import explore from "../../assets/explore.svg"
import search from "../../assets/search.svg"

interface Props {

}

const About = (props: Props) => {
    return (
        <div className={styles.About}>
            <h1>How Unolodging Works</h1>
            <div className={styles.Main}>
                <div className={styles.item}>
                    <div className={styles.image}>
                        <img src={search} alt="" />
                    </div>
                    <div className={styles.desc}>
                        <h2>Browse through our listings</h2>
                        <p>At uno lodging, there is a room to match every guest, every taste and every budget.
                            We offer a diverse listing of rooms and apartments in every major city in Nigeria.
                            {/* Whether you want a single room, or an entire guest house to yourself,
                            you’ll find the right accommodation on uno lodging. Enjoy real hospitality in just 3 steps:
                            <li>Choose a location</li>
                            <li>Select your preferred room or guest house</li>
                            <li>Make a reservation</li> */}
                        </p>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.desc}>
                        <h2>Schedule your visit</h2>
                        <p>Travelling out of town? No need to worry about where to stay. Simply select your check-in date and the duration of your stay and our amiable hosts will have everything  set up for your arrival.</p>
                    </div>
                    <div className={styles.image}>
                        <img src={schedule} alt="" />
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.image}>
                        <img src={explore} alt="" />
                    </div>
                    <div className={styles.desc}>
                        <h2>Explore the world!</h2>
                        <p>Pack a bag, pick a location and filter through our diverse listings of rooms in different parts of Nigeria. Book a room and begin your adventure in any Nigerian city today.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
