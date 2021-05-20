import React from 'react';
import { Form, Col, Button } from "react-bootstrap"

interface Props {

}

const HostForm = (props: Props) => {
    return (
        <div>
            <Form encType="multipart/form-data">
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
                </Form.Row>
                <Form.Group>
                    <Form.File id="exampleFormControlFile1" label="Example file input" name="image" multiple />
                </Form.Group>
                <Button>
                </Button>
            </Form>
        </div>
    )
}

export default HostForm
