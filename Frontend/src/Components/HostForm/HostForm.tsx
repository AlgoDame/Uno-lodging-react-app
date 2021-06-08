import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Col, Button } from "react-bootstrap";
import AuthContext from "../../store/AuthContext"
import axios from "axios";
import styles from "./HostForm.module.css";
import Modal from "../Modal/Modal"

interface Props {

}

const HostForm = (props: Props) => {
    const [files, setFiles] = useState("")
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [features, setFeatures] = useState("")
    const [price, setPrice] = useState("")
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState("");
    const [show, setShow] = useState(true)

    const ctx = useContext(AuthContext);
    const history = useHistory();

    const handleFileUpload = (e) => {
        setFiles(e.target.files);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        // formData.append("files", files)
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i])
        }
        formData.append("title", title);
        formData.append("description", desc);
        formData.append("features", features);
        formData.append("location", `${city}, ${state}`);
        formData.append("price", price);
        formData.append("hostid", ctx.userData.email);
        uploadListing(formData);
        console.log("i was clicked", formData)

    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleDescChange = (e) => {
        setDesc(e.target.value)
    }
    const handleFeaturesChange = (e) => {
        setFeatures(e.target.value)
    }
    const handleCityChange = (e) => {
        setCity(e.target.value)
    }
    const handleStateChange = (e) => {
        setState(e.target.value)
    }
    const handlePriceChange = (e) => {
        setPrice(e.target.value)
    }




    const uploadListing = async (body) => {
        setLoading(true)
        try {
            const { data } = await axios.post("https://fierce-plains-40745.herokuapp.com/api/host/listing", body, { headers: { 'Content-Type': "multipart/form-data" } });
            console.log('I posted!', data);
            const res = await ctx.guestBecomeHost()
            if (res === "Successful") {
                setResponse("Upload Successful")
                setTimeout(() => history.push("/home"), 1000)
            }
            else setResponse("Upload failed")
            return data;
        }
        catch (e) {
            console.log(e, e.message)
        }
        setLoading(false)

    }
    return (
        <>
            <div className={styles.Main}>
                <Modal title={`Hi, ${ctx.userData.firstName}`} show={show} toggle={() => setShow(false)}>
                    <div>
                        <h3>Hosting is fun, but getting amazing ROI while at it is even more fun.
                            Hundreds of guest can't wait to see your apartment. </h3>
                        <Button variant="dark" block onClick={() => setShow(false)} >LET'S GO!</Button>
                    </div>

                </Modal>
                {/* <div className={styles.side}> <h1>Put your room up for listing</h1></div> */}
                {/* <div className={styles.hero}>
                    <h3>There's always a slot for your property with us.</h3>
                    <img src={img} alt="" />
                </div> */}
                <Form encType="multipart/form-data" className={styles.Form}>
                    <Form.Group controlId="formGridEmail">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Type of apartment you are hosting" value={title} onChange={handleTitleChange} />
                    </Form.Group>

                    <Form.Group controlId="formGridPassword">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="textarea" as="textarea" placeholder="Make the guests know what your listing is like" rows={4} value={desc} onChange={handleDescChange} />
                    </Form.Group>


                    <Form.Group controlId="formGridEmail">
                        <Form.Label>Features</Form.Label>
                        <Form.Control type="textarea" placeholder="e.g King-sized bed for 2, free WiFi, etc..." as="textarea" rows={3} value={features} onChange={handleFeaturesChange} />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridPassword1">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" placeholder="e.g Ikeja" value={city} onChange={handleCityChange} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPassword1">
                            <Form.Label>State</Form.Label>
                            <Form.Control placeholder="e.g Lagos state" type="text" value={state} onChange={handleStateChange} />
                        </Form.Group>

                    </Form.Row>

                    <Form.Group controlId="formGridPassword1">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" value={price} placeholder="e.g N20,000/night" onChange={handlePriceChange} />
                    </Form.Group>
                    <Form.Group >
                        <Form.File onChange={handleFileUpload} id="exampleFormControlFile1" label="Upload Images" name="image" multiple />
                    </Form.Group>

                    <Button disabled={title === "" || desc === "" || price === "" || state === "" || files.length === 0} onClick={handleSubmit} block variant="dark">
                        {loading ? "Uploading..." : "Upload Listing"}
                    </Button>
                    {response === "Upload Successful" ? <h4 style={{ color: "green" }}>{response}</h4> : <h4 style={{ color: "red" }}>{response}</h4>}
                </Form>
            </div>
        </>
    )
}

export default HostForm
