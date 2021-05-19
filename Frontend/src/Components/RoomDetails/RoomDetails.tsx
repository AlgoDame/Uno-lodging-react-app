import { useContext, useEffect, useState } from "react"
import img1 from "../../assets/homeBg1.svg"
import img2 from "../../assets/homeBg2.svg"
import styles from "./RoomDetails.module.css"
import { Carousel, Form, Button } from "react-bootstrap"
import AuthContext from "../../store/AuthContext"
import { useParams, Redirect } from "react-router-dom"
import { RoomData } from "../../store/AuthContext"


interface Props {
    title?: "",
    description?: "",
    price?: "",
    location?: "",
    history?: ""
}

const RoomDetails = (props: Props) => {
    const [data, setData] = useState({} as RoomData)
    const { roomId } = useParams() as {
        roomId: string
    }

    console.log(roomId)
    const ctx = useContext(AuthContext);
    useEffect(() => {
        const room = ctx.roomsData.find(room => room.roomId === roomId);
        if (room) setData(room)
        console.log(roomId, "data is", data)
    }, [ctx.roomsData, data, roomId])
    return (
        <div className={styles.Main
        } >
            <div className={styles.Content}>
                <Carousel interval={2000}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={img1}
                            alt=""
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={img2}
                            alt=""
                        />
                    </Carousel.Item>
                </Carousel>
                <h2>{data.title}</h2>
                <div className={styles.info}>
                    <p>
                        {data.location}
                    </p>
                    <span>
                        {data.price}
                    </span>
                </div>
                <p className={styles.desc}>{data.description}</p>
            </div>
            <div className={styles.Form}>
                <h5>
                    Let your host meet you
                </h5>
                <Form noValidate >
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Control required type="text" placeholder="First Name" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Control required type="text" placeholder="Last Name" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Control required type="tel" placeholder="Phone" />
                    </Form.Group>
                    <Button type="submit" variant="dark" block>
                        Book Now
                    </Button>
                    {/* {props.success ? <div className="success-prompt">Message sent successfully!</div> : null} */}
                </Form>
            </div>
        </div >
    )
}

export default RoomDetails
