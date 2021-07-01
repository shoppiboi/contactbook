import logo from './logo.svg';
import './App.css';
import Modal from './components/Modal';

import React from 'react';


const testContacts = [
  {
    id: 1,
    contactname: 'John Smith',
    phone: '1234567890',
    email: 'john.smith@gmail.com'
  },
  {
    id: 2,
    contactname: 'John Johnson',
    phone: '1234567890',
    email: 'john.johnson@gmail.com'
  }
]

class App extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      contacts: testContacts,
      modal: false,
      activeItem: {
        contactname: "",
        phone: "",
        email: "",
      },
    };
  }
  
  toggle = () => {
    this.setState({ modal: !this.state.modal});
  };

  handleSubmit = (item) => {
    this.toggle();
  };

  createItem = () => {
    let item = { contactname: "", phone: "", email: ""};

    this.setState({ activeItem: item, modal: !this.state.modal });  
  };

  editItem = (item) => {

    // let editItem = { contactname: item['contactname'], phone: item['phone'], email: item['email']}

    console.log(item)

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  renderContacts = () => {

    return this.state.contacts.map((contact) => (
      <li 
        className="list-group-item d-flex justify-content-between align-items-center"
        key={contact.id}>
        <span 
          className={'todo-title mr-2'}
          title={contact.contactname}
        >
          {contact.contactname}
        </span>
        <span>
          <button
            className='btn btn-info'>
              View
          </button>
            &nbsp;
            &nbsp;
          <button
            className='btn btn-secondary'
            onClick={() => this.editItem({ contactname: contact.contactname, phone: contact.phone, email: contact.email })}>
              Edit
            </button>
            &nbsp;
            &nbsp;
          <button
            className='btn btn-danger'>
              Delete
            </button>
        </span>
      </li>
    ))
  }

  render() {  
      return (
        <main className='container'>
          <h1 className='text-uppercase text-center my-4'>Contact Book</h1>
          <div className='row'>
            <div className='col-md-6 col-sm-10 mx-auto p-0'>
              <div className='card p-3'>
                <div className='mb-4'>
                  <button 
                    className='btn btn-primary'
                    onClick={this.createItem}
                  >
                    Add Contact
                  </button>
                </div>
               <ul className='list-group list-group-flush border-top-0'>
                {this.renderContacts()}
               </ul>
              </div>
            </div>
          </div>
          {this.state.modal ? (
            <Modal
              activeItem={this.state.activeItem}
              toggle={this.toggle}
              onSave={this.handleSubmit}
            />
          ) : null}
        </main>
      )  
  }  
}

export default App;