import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      owner: '',
      dogName: '',
      breed: '',
      dogData: [],
    }
    this.breedRef = React.createRef();
    this.ownerRef = React.createRef();
    this.searchBreed = this.searchBreed.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.sendUserData = this.sendUserData.bind(this);
  }

  handleInput(e) {
    e.preventDefault();
    let { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  searchBreed(e) {
    e.preventDefault();
    let ownerName = this.ownerRef.current.value;
    // let petName = this.petNameRef.current.value;
    let breed = this.breedRef.current.value;
    console.log(`found owner ${ownerName}, and his dog ${breed}`);
    let postDogData = async () => {
      let response = await this.sendUserData(ownerName, breed);

      if (response) {
        console.log('received the response from server!', response);
        this.setState({
          owner: '',
          breed: ''
        });
      } else {
        console.error('unable to recieve response from server');
      }
    }
  postDogData();
  }

  async sendUserData(owner, breed) {
    // add in petname later
    try {
      return await axios.post('/fetch/', {owner, breed});
    } catch(error) {
      console.error('Could not send the data!');
    }
  }


  render() {
    let { owner, breed } = this.state;
    return (
      <div>
        <h1>Go Fetch!</h1>
        <form onSubmit={this.searchBreed}>
          <label>
            Owner Name:
          </label>
          <input type="text" name='owner'
            value={owner} ref={this.ownerRef} onChange={this.handleInput}/>
          <br/>
          <label>
            Add dog Breed:
          </label>
          <input type="text" name='breed'
            value={breed} ref={this.breedRef} onChange={this.handleInput}/>
          <input type="submit" value="submit"/>
        </form>
      </div>
    )
  }
}







