import React from 'react'
import styles from "./Home.module.css";
import { Carousel } from "react-bootstrap"
import bg1 from "../../assets/homeBg1.svg"
import bg2 from "../../assets/homeBg2.svg"
import bg3 from "../../assets/homeBg3.svg"
import img3 from "../../assets/img3.svg"
import img2 from "../../assets/img2.svg"
import bg4 from "../../assets/homeBg4.svg"
import hostBg from "../../assets/hostBg.svg";
import Item from "../Item/Item"
import About from "../About/About"
interface Props {
    show: boolean;
    hostSignUp: () => void
}

const Home = (props: Props) => {
    return (
        <div className={styles.Home}>
            <section className={styles.Hero}>
                <div className={styles.Hero_Text}>
                    <h1>
                        Explore exquisite vacation homes across the world
                    </h1>
                    <button><span></span>Get Started</button>
                </div>
                <div className={styles.Carousel}>
                    <Carousel controls={false} indicators={false}>
                        <Carousel.Item interval={6000}>
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
                <div>
                    <h1>Looking to turn your extra space to extra income?<br></br>
                        {/* <p>Join our list of amazing hosts now</p> */}
                    </h1>
                    <button onClick={props.hostSignUp}>Become a host</button>
                </div>
                <img src={hostBg} alt="" />
            </section>
            <section>
                <About />
            </section>
            <section className={styles.Explore}>
                <h2>Explore Popular Locations</h2>
                <div className={styles.Items}>
                    <Item title="Lagos" image={bg2} hover={true} />
                    <Item title="Abuja" image={bg3} hover={true} />
                    <Item title="Portharcourt" image={img3} hover={true} />
                    <Item title="Kaduna" image={img2} hover={true} />
                </div>
            </section>
        </div>
    )
}

export default Home
