import { Carousel, Button } from "react-bootstrap"
import img1 from '../../assets/homeBg3.svg'
import styles from './RoomsList.module.css';
import { RoomData } from '../../store/AuthContext'
interface Props {
    title: string,
    location: string,
    price: string,
    hostName: string

}

const RoomList = (props: Props) => {
    // const data: RoomData;

    return (
        <div className={styles.ListItem}>
            <Carousel className={styles.Carousel} interval={2000}>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={img1}
                        alt=""
                    />
                </Carousel.Item>
            </Carousel>
            <div className={styles.details}>
                <h3>{props.title}</h3>
                <span>{props.location}</span>
                <h5>Hosted by: {props.hostName}</h5>
                <div>
                    <span>{props.price}</span>
                    <Button type="submit" variant="dark">
                        Book Now
                    </Button>
                </div>
            </div>
        </div >
    )
}

export default RoomList
