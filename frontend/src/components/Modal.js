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
            phoneError: "",
            emailError: "",
        };
    }

    handleChange = (e) => {
        
        const activeItem = { ...this.state.activeItem, [e.target.name]: e.target.value };

        this.setState({ activeItem });
    };

    validateInputs = () => {
        let emailError = "";
        let phoneError = "";

        let emailCopy = this.state.activeItem.email;
        if (emailCopy.trim() != '' && !emailCopy.includes('@')) {
            emailError = 'Invalid email';
        }
        
        let phoneCopy = this.state.activeItem.phone;
        if (phoneCopy[0] == '+') {
            phoneCopy = phoneCopy.replace('+', '');
        }
        if (isNaN(phoneCopy)) {
            phoneError = 'Invalid phone number';
        }

        if (emailError || phoneError) {
            this.setState({emailError, phoneError});
            return false;
        }

        return true;
    }

    handleSubmit = () => {
        const isValid = this.validateInputs();
        
        if (isValid) {
            //  if no name is given, then set name as phone number.
            if (this.state.activeItem.name.trim() == '') {
                this.state.activeItem.name = this.state.activeItem.phone;
            }
            this.props.onSave(this.state.activeItem);    
        }
    };

    render() {
        return (
            <Modal isOpen={true} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>Contact</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for='contact-name'>Name</Label>
                            <Input
                                type='text'
                                id='contact-name'
                                name='name'
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
                                value={this.state.activeItem.phone}
                                onChange={this.handleChange}
                                placeholder='Enter phone number'
                            /> 
                            <div style={{fontSize: 12, color: 'red'}}>
                                {this.state.phoneError}
                            </div> 
                        </FormGroup>
                        <FormGroup>
                            <Label for='contact-email'>Email</Label>
                            <Input 
                                type='email'
                                id='contact-email'
                                name='email'
                                value={this.state.activeItem.email}
                                onChange={this.handleChange}
                                placeholder='Enter email'
                            />
                            <div style={{fontSize: 12, color: 'red'}}>
                                {this.state.emailError}
                            </div>  
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color='success'
                        onClick={() => this.handleSubmit()}
                    >
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}