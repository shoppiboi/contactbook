import logo from './logo.svg';
import './App.css';

import React from 'react';


const testContacts = [
  {
    id: 1,
    name: 'John Smith',
    phone_number: '1234567890',
    email: 'john.smith@gmail.com'
  },
  {
    id: 2,
    name: 'John Johnson',
    phone_number: '1234567890',
    email: 'john.johnson@gmail.com'
  }
]

class App extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      contacts: testContacts,
    };
  }
  
  renderContacts = () => {

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
            className='btn btn-secondary'>
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
        </main>
      )  
  }  
}

export default App;