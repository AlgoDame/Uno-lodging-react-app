import { useContext, useEffect, useState } from "react"
import img1 from "../../assets/homeBg1.svg"
import img2 from "../../assets/homeBg2.svg"
import { FcLike, FcLikePlaceholder } from "react-icons/fc"
import styles from "./RoomDetails.module.css"
import { Carousel, Form, Button } from "react-bootstrap"
import AuthContext from "../../store/AuthContext"
import { useParams } from "react-router-dom"
import { RoomData } from "../../store/AuthContext";
import Modal from "../Modal/Modal"


interface Props {
    title?: "",
    description?: "",
    price?: "",
    location?: "",
    history?: "";
}

const RoomDetails = (props: Props) => {
    const ctx = useContext(AuthContext);

    const [data, setData] = useState({} as RoomData);
    // const [loading, setLoading]
    const [state, setState] = useState(false);
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [response, setResponse] = useState("" as any);
    const [showModal, setShowModal] = useState(false)


    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value)
    }
    const handleLastNameChange = (e) => {
        setLastName(e.target.value)
    }
    const handlePhoneChange = (e) => {
        setPhone(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            name: `${firstName} ${lastName}`,
            phone,
            hostid: data.hostid,
            roomId: data.roomId
        }
        const res = await ctx.submitBooking(body);
        if (res && res.status === "Successful") setShowModal(true);
        else setResponse(res.message)
        setTimeout(() => setResponse(""), 2000)

    }
    const iconClick = (id) => {
        setState(!state);
        ctx.handleFavorites(id)
    }
    const { roomId } = useParams() as {
        roomId: string
    }
    const toggle = () => {
        setShowModal(!showModal);
        window.location.reload();
        return false
    }

    console.log(roomId, ctx.userData)
    useEffect(() => {
        const room = ctx.roomsData.find(room => +room.roomId === +roomId);
        if (room) setData(room)
        console.log(roomId, "data is", data)
    }, [ctx.roomsData, data, roomId])
    return (
        <div className={styles.Main}>
            <div className={styles.Content}>
                <Carousel interval={2000} indicators={false}>
                    {data.imageUrl && data.imageUrl.length > 0 && data.imageUrl.map(url => <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={url}
                            alt=""
                        />
                    </Carousel.Item>)
                    }
                </Carousel>
                <h2>{data.title} {ctx.favorites && ctx.favorites.includes(data.roomId) ? <FcLike onClick={() => iconClick(data.roomId)} /> : <FcLikePlaceholder onClick={() => iconClick(data.roomId)} style={{ "fontSize": "1.5rem" }} />}</h2>
                {/* <div className={styles.likeIcon}><FcLikePlaceholder /></div> */}
                <div className={styles.info}>
                    <p>
                        {data.location}
                    </p>
                    <span>
                        <p>{data.price}</p>
                        {data.booked ? <span style={{ "color": "red" }}>Not available</span> : "Available"}
                    </span>
                </div>
                <p className={styles.desc}>{data.description}</p>
                <p className={styles.fts}>{data.features}</p>
            </div>
            <div className={styles.Form}>
                <h5>
                    Let your host meet you
                </h5>
                <Form noValidate >
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Control required type="text" onChange={handleFirstNameChange} value={firstName} placeholder="First Name" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Control required type="text" onChange={handleLastNameChange} value={lastName} placeholder="Last Name" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Control onChange={handlePhoneChange} value={phone} required type="tel" placeholder="Phone" />
                    </Form.Group>
                    <Button onClick={handleSubmit} disabled={data.booked || firstName === "" || lastName === "" || phone === ""} type="submit" variant="dark" block>
                        {ctx.loading ? "Booking..." : data.booked ? "Booked" : "Book Now"}
                    </Button>
                    {response !== undefined && <h5 style={{ "textAlign": "center", "color": "red" }}>{response}</h5>}
                    <Modal title={"Booking Successful"} toggle={toggle} show={showModal}>
                        <h5 style={{ "letterSpacing": "1px", "textAlign": "center", "lineHeight": "1.7" }}>{data.title} has been booked successfully! Your host will reach out to you shortly</h5>
                    </Modal>
                    {/* {props.success ? <div className="success-prompt">Message sent successfully!</div> : null} */}
                </Form>
            </div>
        </div >
    )
}

export default RoomDetails
