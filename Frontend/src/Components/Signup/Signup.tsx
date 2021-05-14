import React from "react";
import Modal from "../Modal/Modal";
import styles from "./Signup.module.css";
import { Form, Button, Col } from "react-bootstrap";

interface Props {
    show: boolean;
    toggle: () => void;
    isSignup: boolean;
    signUp: () => void;
    signIn: () => void;
}

const Signup = (props: Props) => {
    let signup = null;
    signup = props.isSignup ? (
        <>
            <Form>
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
                    <Form.Control type="email" />
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

                <Button className={styles.Submit} type="submit">
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
                    <Form.Control type="email" />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridPassword1">
                        <Form.Label>Enter Password</Form.Label>
                        <Form.Control type="password" />
                    </Form.Group>
                </Form.Row>
                <Button className={styles.Submit} type="submit">
                    Login
                </Button>
            </Form>

            <div className={styles.CTA}>
                <p>
                    New user? <span onClick={props.signUp}>Sign up</span>
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
