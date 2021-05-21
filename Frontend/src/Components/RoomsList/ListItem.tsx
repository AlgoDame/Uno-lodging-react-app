import { useEffect, useState } from 'react';
import { Carousel, Button } from "react-bootstrap"
import img1 from '../../assets/homeBg3.svg'
import styles from './RoomsList.module.css';
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { RoomData } from '../../store/AuthContext'
// import { RoomData } from '../../store/AuthContext'
interface Props {
    room: RoomData,
    favorites: string[],
    click: (data) => void,
    favClick: (data) => void

}

const RoomList = (props: Props) => {
    const [state, setState] = useState(false)
    const iconClick = (id) => {
        setState(!state);
        props.favClick(id)
    }
    // const data: RoomData;
    return (
        <div className={styles.ListItem}>
            <Carousel className={styles.Carousel} interval={2000}>
                {props.room.imageUrl && props.room.imageUrl.length > 0 && props.room.imageUrl.map(url => <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={url}
                        alt=""
                    />
                </Carousel.Item>)
                }
            </Carousel>
            <div className={styles.details}>
                <h3>{props.room.title}<i onClick={() => iconClick(props.room.roomId)}>{state || props.favorites.includes(props.room.roomId) ? <FcLike /> : <FcLikePlaceholder />}</i></h3>
                <span>{props.room.location}</span>
                <h5>{props.room.features}</h5>
                <div>
                    <span>{props.room.price}</span>
                    <Button type="submit" variant="dark" onClick={() => props.click(props.room.title)}>
                        View
                    </Button>
                </div>
            </div>
        </div >
    )
}

export default RoomList
