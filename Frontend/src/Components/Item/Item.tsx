import React from 'react'
import styles from "./Item.module.css";
import { Link } from "react-router-dom"
interface Props {
    image: string;
    // rating: number;
    title: string;
    price?: string | undefined;
    hover: boolean
}

const Item = (props: Props) => {
    return (
        <div className={styles.Item}>
            <div className={styles.imgWrapper}>
                <img src={props.image} alt="" />
                {props.hover ? <div className={styles.Overlay}>
                    {/* <p>Best for businesses that need Office apps across devices plus professional email, cloud file storage, and online meetings</p> */}
                    <button><Link to={`/rooms/${props.title}`}>Explore</Link></button>
                    {/* <div>
                            <div><img src={share} alt="" /><span>Share</span></div>
                            <div><img src={likeButton} alt="" /><span>Like</span></div>
                        </div> */}
                </div> : null}
            </div>
            {/* <div className={styles.Ratings}>
                    {ratings.map((rating, idx) => {
                        return <img key={idx} src={rating} alt="" />
                    })}
                </div> */}
            <h3>{props.title}</h3>
            {props.price ? <p className={styles.Price}>{props.price}</p> : null}
        </div>
    )
}

export default Item
