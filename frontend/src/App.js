import './App.css';
import Modal from './components/Modal';
import axios from 'axios';

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
      contacts: [],
      modal: false,
      activeItem: {
        name: "",
        phone: "",
        email: "",
      },
    };
  }
  
  componentDidMount() {
    this.refreshContacts();
  }

  refreshContacts = () => {
    axios
      .get('/api/contactbook/')
      .then((res) => this.setState({ contacts: res.data}))
      .catch((err) => console.log("hELLO"));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal});
  };

  handleSubmit = (item) => {
    this.toggle();

    if (item.id) {
      axios
        .put('/api/contactbook/${item.id}/', item)
        .then((res) => this.refreshContacts());
        return;
    }
    axios
      .post('/api/contactbook/', item)
      .then((res) => this.refreshContacts());
  };

  handleDelete = (item) => {
    alert("delete" + JSON.stringify(item));
  }

  createItem = () => {
    let item = { name: "", phone: "", email: ""};

    this.setState({ activeItem: item, modal: !this.state.modal });  
  };

  editItem = (item) => {

    let editItem = { name: item['name'], phone: item['phone'], email: item['email']}

    this.setState({ activeItem: editItem, modal: !this.state.modal });
  };

  renderContacts = () => {

    console.log(this.state.contacts);

    return this.state.contacts.map((contact) => (

      <li 
        className="list-group-item d-flex justify-content-between align-items-center"
        key={contact.id}>
        <span 
          className={'todo-title mr-2'}
          title={contact.name}
        >
          {contact.name}
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
            onClick={() => this.editItem(contact)}>
              Edit
            </button>
            &nbsp;
            &nbsp;
          <button
            className='btn btn-danger'
            onClick={() => this.handleDelete(contact)}>
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