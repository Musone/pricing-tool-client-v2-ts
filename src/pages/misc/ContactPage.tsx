import React, {ReactElement} from "react";

const ContactPage = (): ReactElement => {
    return (<div>Contact page stub</div>)
    /*return (
        <div id="contactPage">
            <Container>
                <h1 class="display-1 text-center">Contact Us</h1>
                <Form>
                    <Form.Label>Name</Form.Label>
                    <Form.Group as={Row} className="mb-3" controlId="formFullName">
                        <Col>
                            <Form.Control id="firstName" type="firstname" placeholder="First name" required />
                        </Col>
                        <Col>
                            <Form.Control id="lastName" type="lastname" placeholder="Last name" required />
                        </Col>
                    </Form.Group>

                    <Form.Label>Email</Form.Label>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Control type="email" placeholder="Enter email" required />
                    </Form.Group>

                    <Form.Label>I Am A...</Form.Label>
                    <Form.Group className="mb-3" controlId="formIdentity">
                        <Form.Check
                            inline
                            required
                            type="radio"
                            label="Client"
                            name="formIdentityRadios"
                            id="formRadioClient"
                        />
                        <Form.Check
                            inline
                            required
                            type="radio"
                            label="Counsellor"
                            name="formIdentityRadios"
                            id="formRadioCounsellor"
                        />
                    </Form.Group>

                    <Form.Label>Message</Form.Label>
                    <Form.Group controlId="formMessage">
                        <Form.Control as="textarea" rows={3} required />
                    </Form.Group>

                    {/!* Hack: margin bottom for text-area *!/}
                    <Form.Label></Form.Label>

                    <Form.Group className="mb-3" controlId="formSubmit">
                        <button
                            type="submit"
                            className="btn primary-button w-100"
                            // style={{ marginLeft: "0px" }}
                        >
                            Submit
                        </button>
                    </Form.Group>
                </Form>
            </Container>
        </div>
    );*/
}

export default ContactPage;