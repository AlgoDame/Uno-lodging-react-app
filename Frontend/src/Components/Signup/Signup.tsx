import React, { useContext } from "react";
import Modal from "../Modal/Modal";
import styles from "./Signup.module.css";
import { Form, Button, Col, Spinner } from "react-bootstrap";
import AuthContext from "../../store/AuthContext"

interface Props {

}
// const getBase64 = (file: File, cb) => {
//     let reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = function () {
//         let buf = reader.result;
//         if (buf) {
//             cb(buf.toString())
//         }
//     };
//     reader.onerror = function (error) {
//         console.log('Error: ', error);
//     };
// }


const Signup = (props: Props) => {
    // const [err, setErr] = useState("")
    const ctx = useContext(AuthContext);
    let signup;
    signup = ctx.isSignup ? (
        <>
            <Form encType="multipart/form-data">
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" value={ctx.data.firstName} onChange={ctx.handleFirstNameInput} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridLastName">
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
                <Button className={styles.Submit} value={ctx.userType} type="submit" onClick={ctx.handleSignupSubmit}>
                    {ctx.loading ? <p style={{ "display": "flex", "alignItems": "center", "justifyContent": "space-around", "padding": "0 10px" }}>Signing you up...  <Spinner animation="border" variant="primary" /> </p> : "Sign Up"}
                </Button>
                {ctx.formError !== "" && <div style={{ "color": "red", "textAlign": "center", "letterSpacing": "1px" }}>{ctx.formError}</div>}
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