import React, { useState, useRef, MouseEvent, ChangeEvent, useEffect } from "react";
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

    const initialData = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
        type: props.type
    }
    const [files, setFiles] = useState<(string | Buffer)[]>([]);
    const [data, setData] = useState(initialData)
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [loginType, setLoginType] = useState("")
    const emailInput = useRef(null)
    const passwordInput = useRef(null)
    let fileUploads = useRef() as MutableRefObject<HTMLInputElement>
    let form_data = useRef() as MutableRefObject<HTMLFormElement>
    // const 
    // utility function to validate input email

    useEffect(() => {
        setData(initialData);
        console.log("useeffect just ran!!")
    }, [props.show])
    const validateEmail = (email) => {
        const testRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
        return testRegex.test(email)
    }
    const validatePassword = (password) => {
        let numReg = /[0-9]/g
        return password.trim().length > 7 && numReg.test(password)
    }

    const status = (validationType) => {
        switch (validationType) {
            case "email":
                const testRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                if (!testRegex.test(data.email)) {
                    return "Invalid email address"
                }
                else {
                    return ""
                }
            case "password":
                let numReg = /[0-9]/g
                if (!(data.password.trim().length > 7 && numReg.test(data.password))) {
                    return "passwords must be greater than 7 and should contain numbers and alphabets"
                }
                else if (passwordConfirmation !== data.password) {
                    return "passwords do not match"
                }
                else return "";
            default:
                return true;

        }
    }
    const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, email: e.target.value });
    }
    const handlPasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, password: e.target.value });
    }

    const handlePasswordConfirmationChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirmation(e.target.value)
    }

    const handleFirstNameInput = (e: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, firstName: e.target.value })
    }
    const handleLastNameInput = (e: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, lastName: e.target.value })
    }
    const handlePhoneInput = (e: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, phone: e.target.value })
    }

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        // console.log(e.target.value, loginType)
        setLoginType(e.target.value);
    }

    const handleLoginSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (validateEmail(data.email) && validatePassword(data.password)) {
            const body = { email: data.email, password: data.password, type: loginType };
            await validateLogin(body)
            console.log(loginType)
            console.log(body);
        }
        else console.log("invalid Email or Password")
    }
    const handleSignupSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const emailStatus = status("email");
        const passwordStatus = status("password")
        if (emailStatus !== "" || passwordStatus !== "") {
            console.log(emailStatus, passwordStatus)
        }
        const body = { ...data, type: props.type }
        await validateSignup(body)
        console.log(body)
        // if (validateEmail(data.email) && validatePassword(data.password)) {
        //     const body = { email: data.email, password: data.password, type: props.type };
        //     console.log(data);
        // }
        // else console.log("invalid Email or Password")
    }
    const validateLogin = async (body) => {
        try {
            const { data } = await axios.post("http://localhost:5000/api/login", body, { headers: { 'content-type': "application/json" } })
            console.log(data)
        }
        catch (e) {
            console.log(e.message)
        }
    }
    const validateSignup = async (body) => {
        try {
            const { data } = await axios.post("http://localhost:5000/api/signup", body, { headers: { 'content-type': "application/json" } })
            console.log(data)
        }
        catch (e) {

            console.log(e)
        }
    }

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
    // const handleLoginSubmitSubmit = (e) => {
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
                        <Form.Control type="text" value={data.firstName} onChange={handleFirstNameInput} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" value={data.lastName} onChange={handleLastNameInput} />
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={data.email} onChange={handleEmailInputChange} />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridPassword1">
                        <Form.Label>Enter Password</Form.Label>
                        <Form.Control type="password" value={data.password} onChange={handlPasswordInputChange} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword1">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" value={passwordConfirmation} onChange={handlePasswordConfirmationChange} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Telephone</Form.Label>
                        <Form.Control type="tel" value={data.phone} onChange={handlePhoneInput} />
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
                <Button className={styles.Submit} value={props.type} type="submit" onClick={handleSignupSubmit}>
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
                    <Form.Control type="email" ref={emailInput} value={data.email} onChange={handleEmailInputChange} />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridPassword1">
                        <Form.Label>Enter Password</Form.Label>
                        <Form.Control type="password" ref={passwordInput} onChange={handlPasswordInputChange} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Login as</Form.Label>
                        <Form.Control as="select" value={loginType} onChange={handleSelect}>
                            <option disabled>Choose...</option>
                            <option value="guest">Guest</option>
                            <option value="host">Host</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Button className={styles.Submit} onClick={handleLoginSubmit} type="submit">
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
