import React from 'react'
import styles from "./Home.module.css";
import { Carousel } from "react-bootstrap"
import bg1 from "../../assets/homeBg1.svg"
import bg2 from "../../assets/homeBg2.svg"
import bg3 from "../../assets/homeBg3.svg"
import bg4 from "../../assets/homeBg4.svg"
import hostBg from "../../assets/hostBg.svg"
interface Props {
    show: boolean
}

const Home = (props: Props) => {
    return (
        <div className={styles.Home}>
            <section>
                <div className={styles.Hero_Text}>
                    <h1>
                        Explore exquisite vacation homes across the world
                    </h1>
                    <button><span></span>Get Started</button>
                </div>
                <div className={styles.Carousel}>
                    <Carousel controls={false} indicators={false}>
                        <Carousel.Item interval={3000}>
                            <img
                                className="car-img"
                                src={bg1}
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item interval={3000}>
                            <img
                                className="car-img"
                                src={bg2}
                                alt="Second slide"
                            />

                        </Carousel.Item>
                        <Carousel.Item interval={3000}>
                            <img
                                className="car-img"
                                src={bg3}
                                alt="Third slide"
                            />

                        </Carousel.Item>
                        <Carousel.Item interval={3000}>
                            <img
                                className="car-img"
                                src={bg4}
                                alt="Third slide"
                            />

                        </Carousel.Item>
                    </Carousel>
                </div>
            </section>
            <section className={styles.hostBg}>
                <img src={hostBg} alt="" />
            </section>
        </div>
    )
}

export default Home
