import React, { useState, useRef, MouseEvent } from "react";
import Modal from "../Modal/Modal";
import styles from "./Signup.module.css";
import { Form, Button, Col } from "react-bootstrap";
import { MutableRefObject } from "react";
import axios from "axios"
// import { readFileSync } from "fs";
// import FileBase64 from "react-file-base64";

interface Props {
    show: boolean;
    toggle: () => void;
    isSignup: boolean;
    guestSignUp: () => void;
    hostSignUp: () => void;
    signIn: () => void;
    type: string
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
    const [files, setFiles] = useState<(string | Buffer)[]>([]);
    const [email, setEmail] = useState("")
    const emailInput = useRef(null)
    const passwordInput = useRef(null)
    let fileUploads = useRef() as MutableRefObject<HTMLInputElement>
    let form_data = useRef() as MutableRefObject<HTMLFormElement>
    // const 
    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (fileUploads.current) {
            let formData = new FormData()
            const uploadedFiles = fileUploads.current.files;
            if (formData && uploadedFiles) {
                let filess: (string | Buffer)[] = [];
                for (const file of uploadedFiles) {
                    getBase64(file, (res: string) => {
                        let newRes = res.replace(/^data:([A-Za-z-+/]+);base64,/, '');
                        const buff = Buffer.from(newRes, "base64");

                        const data = buff.toString("utf8");
                        console.log("i am a ", typeof data)
                        filess.push(data)

                    })
                    setFiles(filess)
                }
                console.log("base64 files ", filess, files, typeof filess[0]);
                // const body = {
                //     "name": "emmanuel",
                //     "age": 20
                // }
                // fetch("http://localhost:5000/api/signup", {
                //     method: "post",
                //     mode: "cors",
                //     body: JSON.stringify(body),
                //     headers: {
                //         'Content-Type': 'application/json',
                //         "Accept": "application/json"
                //     }
                // }).then(res => res.json()).then(data => console.log(data)).catch(e => console.log(e))
                axios.request({
                    method: 'POST',
                    url: `http://localhost:5000/api/signup`,
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    data: { files },

                }).then(res => console.log(res)).catch(e => console.log(e))
                console.log("upF", uploadedFiles[0])
            }
        }
        else {
            console.log("type", props.type);
        }

    }
    // const handleLoginSubmit = (e) => {
    //     e.preventDefault();
    //     const email = emailInput;
    //     const password = passwordInput;
    //     if (!isSignup) {

    //     }
    //     //Add validation
    // }
    let signup;
    signup = props.isSignup ? (
        <>
            <Form ref={form_data} encType="multipart/form-data">
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridPassword1">
                        <Form.Label>Enter Password</Form.Label>
                        <Form.Control type="password" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword1">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Telephone</Form.Label>
                        <Form.Control type="tel" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Sign up as</Form.Label>
                        <Form.Control as="select" defaultValue="Sign up as">
                            <option disabled>Choose...</option>
                            <option>Guest</option>
                            <option>Host</option>
                        </Form.Control>
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
                {/* <Form.Group>
                    <Form.File id="exampleFormControlFile1" label="Example file input" name="image" ref={fileUploads} multiple />
                </Form.Group> */}
                <Button className={styles.Submit} value={props.type} type="submit" onClick={handleSubmit}>
                    Sign Up
                </Button>
            </Form>

            <div className={styles.CTA}>
                <p>
                    Existing user? <span onClick={props.signIn}>Sign in</span>
                </p>
            </div>
        </>
    ) : (
        <>
            <Form>
                <Form.Group controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailInput} />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridPassword1">
                        <Form.Label>Enter Password</Form.Label>
                        <Form.Control type="password" ref={passwordInput} />
                    </Form.Group>
                </Form.Row>
                <Button className={styles.Submit} type="submit">
                    Login
                </Button>
            </Form>

            <div className={styles.CTA}>
                <p>
                    New user? <span onClick={props.guestSignUp}>Sign up</span>
                </p>
            </div>
        </>
    );
    return (
        <div>
            <Modal
                show={props.show}
                title={props.isSignup ? "Signup" : "Login"}
                toggle={props.toggle}
            >
                {signup}
            </Modal>
        </div>
    );
};

export default Signup;
