import { useState } from 'react';
import { Carousel, Button } from "react-bootstrap"
import styles from './RoomsList.module.css';
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RoomData } from '../../store/AuthContext';
import Modal from "../Modal/Modal";
import { useHistory } from "react-router-dom"
// import { RoomData } from '../../store/AuthContext'
interface Props {
    room: RoomData,
    favorites: string[],
    click: (data) => void,
    favClick: (data) => void,
    delete?: boolean
    deleteHandler?: (id) => {}

}

const RoomList = (props: Props) => {
    const [state, setState] = useState(false)
    const [show, setShow] = useState(false)
    const iconClick = (id) => {
        setState(!state);
        props.favClick(id)
    }
    const history = useHistory()

    const deleteRoom = async (id) => {
        if (props.deleteHandler) {
            let res = await props.deleteHandler(id);
            if (res === "Successful") {
                prompt("room deleted successfully");
                history.push("/home");
                window.location.reload()
            }
        }
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
            <Modal title="Warning" toggle={() => setShow(false)} show={show}>
                <>
                    <h5 style={{ "marginBottom": "20p" }}>Are you sure you want to delect this listing? Action can't be reversed</h5>
                    <Button variant="danger" block onClick={() => deleteRoom(props.room.roomId)}>Delete</Button>
                </>
            </Modal>

            <div className={styles.details}>
                <h3>{props.room.title}
                    {!props.delete ? <i onClick={() => iconClick(props.room.roomId)}>{state || props.favorites.includes(props.room.roomId) ? <FcLike /> : <FcLikePlaceholder />}</i>
                        : <i onClick={() => setShow(true)}><RiDeleteBin6Line /> </i>
                    }
                </h3>
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
