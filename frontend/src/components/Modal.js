import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label
}   from "reactstrap";

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem,
        };
    }

    handleChange = (e) => {

        console.log(e.target.name)

        const activeItem = { ...this.state.activeItem, [e.target.name]: e.target.value };

        this.setState({ activeItem });
    };

    render() {
        const { toggle, onSave } = this.props

        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Contact</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for='contact-name'>Name</Label>
                            <Input
                                type='text'
                                id='contact-name'
                                name='contactname'
                                value={this.state.activeItem.name}
                                onChange={this.handleChange}
                                placeholder='Enter name of the contact'
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for='contact-phone-number'>Phone Number</Label>
                            <Input 
                                type='text'
                                id='contact-phone-number'
                                name='phone'
                                value={this.state.activeItem.phone_number}
                                onChange={this.handleChange}
                                placeholder='Enter phone number'
                            /> 
                        </FormGroup>
                        <FormGroup>
                            <Label for='contact-email'>Email</Label>
                            <Input 
                                type='text'
                                id='contact-email'
                                name='email'
                                value={this.state.activeItem.phone_number}
                                onChange={this.handleChange}
                                placeholder='Enter email'
                            /> 
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color='success'
                        onClick={() => onSave(this.state.activeItem)}
                    >
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}