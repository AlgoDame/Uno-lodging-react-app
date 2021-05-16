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
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam animi officia earum asperiores sequi veritatis voluptates tenetur commodi possimus sint. </p>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.desc}>
                        <h2>Schedule your visit</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam animi officia earum asperiores sequi veritatis voluptates tenetur commodi possimus sint.</p>
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
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam animi officia earum asperiores sequi veritatis voluptates tenetur commodi possimus sint.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
