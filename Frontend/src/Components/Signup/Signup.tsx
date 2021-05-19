import React, { useContext, useState, MouseEvent } from "react";
import Modal from "../Modal/Modal";
import styles from "./Signup.module.css";
import { Form, Button, Col, Spinner } from "react-bootstrap";
import AuthContext from "../../store/AuthContext"
import axios from 'axios';


// import { readFileSync } from "fs";
// import FileBase64 from "react-file-base64";

interface Props {

}
const getBase64 = (file: File, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        let buf = reader.result;
        if (buf) {
            cb(buf.toString())
        }
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}


const Signup = (props: Props) => {

    const [file, setfile] = useState("")

    const handleChange = (e) => {
        setfile(e.target.files)
        console.log(file)
    }


    const ctx = useContext(AuthContext);
    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        console.log('i was clicked');
        
        e.preventDefault();

        const formData = new FormData();
            formData.append("image", file)
            formData.append("title", "test image")

        const config ={
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        const url ='http://localhost:5000/api/host/listing';
        axios.post(url, formData, config)
        .then((res) => {
            console.log('Image was uploaded successfully!!!');
            console.log(res.data)
        }).catch((err) => {
            console.log('from me:', err);
            
        })
    }
        // if (fileUploads.current) {
        //     let formData = new FormData()
        //     const uploadedFiles = fileUploads.current.files;
        //     if (formData && uploadedFiles) {
        //         let filess: (string | Buffer)[] = [];
        //         for (const file of uploadedFiles) {
        //             getBase64(file, (res: string) => {
        //                 let newRes = res.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        //                 const buff = Buffer.from(newRes, "base64");

        //                 const data = buff.toString("utf8");
        //                 console.log("i am a ", typeof data)
        //                 filess.push(data)

        //             })
        //         }
    //             console.log("base64 files ", filess, files, typeof filess[0]);
    //             // const body = {
    //             //     "name": "emmanuel",
    //             //     "age": 20
    //             // }
    //             // fetch("http://localhost:5000/api/signup", {
    //             //     method: "post",
    //             //     mode: "cors",
    //             //     body: JSON.stringify(body),
                    // headers: {
                    //     'Content-Type': 'application/json',
                    //     "Accept": "application/json"
                    // }
    //             // }).then(res => res.json()).then(data => console.log(data)).catch(e => console.log(e))
            //     axios.request({
            //         method: 'POST',
            //         url: `http://localhost:5000/api/signup`,
            //         headers: {
            //             'content-type': 'application/x-www-form-urlencoded'
            //         },
            //         data: { files },

            //     }).then(res => console.log(res)).catch(e => console.log(e))
            //     console.log("upF", uploadedFiles[0])
            // }
    //     }
    //     else {
    //         console.log("type", props.type);
    //     }

    // }
    let signup;
    signup = ctx.isSignup ? (
        <>
            <Form encType="multipart/form-data">
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" value={ctx.data.firstName} onChange={ctx.handleFirstNameInput} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" value={ctx.data.lastName} onChange={ctx.handleLastNameInput} />
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={ctx.data.email} onChange={ctx.handleEmailInputChange} />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridPassword1">
                        <Form.Label>Enter Password</Form.Label>
                        <Form.Control type="password" value={ctx.data.password} onChange={ctx.handlePasswordInputChange} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword1">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" value={ctx.passwordConfirmation} onChange={ctx.handlePasswordConfirmationChange} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Telephone</Form.Label>
                        <Form.Control type="tel" value={ctx.data.phone} onChange={ctx.handlePhoneInput} />
                    </Form.Group>
                </Form.Row>
                {/* <Form.Group>
                    <Form.Check
                        type="radio"
                        id="autoSizingCheck"
                        className="mb-2"
                        label="Sign up as guest"
                        inline
                        name="type"
                        checked
                    />
                    <Form.Check
                        type="radio"
                        name="type"
                        id="autoSizingCheck"
                        className="mb-2"
                        label="Sign up as host"
                        inline
                    />
                </Form.Group> */}
                <Form.Group>
                    <Form.File id="exampleFormControlFile1" label="Example file input" name="image"  multiple onChange={handleChange} />
                </Form.Group>
                <Button className={styles.Submit} value={ctx.userType} type="submit" onClick={handleSubmit}>
                    {ctx.loading ? <p style={{ "display": "flex", "alignItems": "center", "justifyContent": "space-around", "padding": "0 10px" }}>Signing you up...  <Spinner animation="border" variant="primary" /> </p> : "Sign Up"}
                </Button>
            </Form>

            <div className={styles.CTA}>
                <p>
                    Existing user? <span onClick={ctx.signIn}>Sign in</span>
                </p>
            </div>
        </>
    ) : (
        <>
            <Form>
                <Form.Group controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={ctx.data.email} onChange={ctx.handleEmailInputChange} />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridPassword1">
                        <Form.Label>Enter Password</Form.Label>
                        <Form.Control type="password" onChange={ctx.handlePasswordInputChange} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Login as</Form.Label>
                        <Form.Control as="select" value={ctx.loginType} onChange={ctx.handleSelect}>
                            <option disabled selected>Choose...</option>
                            <option value="guest">Guest</option>
                            <option value="host">Host</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                {ctx.formError !== "" && <div style={{ "color": "red", "textAlign": "center", "letterSpacing": "1px" }}>{ctx.formError}</div>}
                <Button className={styles.Submit} onClick={ctx.handleLoginSubmit} type="submit">
                    {ctx.loading ? <p style={{ "display": "flex", "alignItems": "center", "justifyContent": "space-around", "padding": "0 10px" }}>Logging you in...  <Spinner animation="border" variant="primary" /> </p> : "Login"}
                </Button>
            </Form>

            <div className={styles.CTA}>
                <p>
                    New user? <span onClick={ctx.guestSignUp}>Sign up</span>
                </p>
            </div>
        </>
    );
    return (
        <div>
            <Modal
                show={ctx.show}
                title={ctx.isSignup ? `Signup as ${ctx.userType}` : "Login"}
                toggle={ctx.toggleModal}
            >
                {signup}
            </Modal>
        </div>
    );
};

export default Signup;