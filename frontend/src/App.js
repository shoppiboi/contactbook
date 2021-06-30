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
  
  render() {  
      return <h1>Hello world!</h1>;  
  }  
}

export default App;