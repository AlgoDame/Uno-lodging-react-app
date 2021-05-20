import { Carousel, Button } from "react-bootstrap"
import img1 from '../../assets/homeBg3.svg'
import styles from './RoomsList.module.css';
// import { RoomData } from '../../store/AuthContext'
interface Props {
    title: string,
    location: string,
    price: string,
    hostName: string;
    features: string,
    imageUrl: string[],
    click: (data) => void

}

const RoomList = (props: Props) => {
    // const data: RoomData;

    return (
        <div className={styles.ListItem}>
            <Carousel className={styles.Carousel} interval={2000}>
                {props.imageUrl && props.imageUrl.length > 0 && props.imageUrl.map(url => <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={url}
                        alt=""
                    />
                </Carousel.Item>)
                }
            </Carousel>
            <div className={styles.details}>
                <h3>{props.title}</h3>
                <span>{props.location}</span>
                <h5>{props.features}</h5>
                <div>
                    <span>{props.price}</span>
                    <Button type="submit" variant="dark" onClick={() => props.click(props.title)}>
                        View
                    </Button>
                </div>
            </div>
        </div >
    )
}

export default RoomList
