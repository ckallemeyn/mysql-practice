import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      owner: '',
      breed: '',
    }
    this.breedRef = React.createRef();
    this.ownerRef = React.createRef();
    this.addOwner = this.addOwner.bind(this);
    this.searchBreed = this.searchBreed.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  addOwner() {
    // let {value, name} = this.ownerRef.current;
    // console.log(`found owner name ${name} and value ${value}`);
  }
  handleInput(e) {
    e.preventDefault();
    let {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }

  searchBreed(e) {
    e.preventDefault();
    let ownerName = this.ownerRef.current.value;
    let breed = this.breedRef.current.value;
    console.log(`found owner ${ownerName}, and his dog ${breed}`);
    this.setState({
      owner: '',
      breed: ''
    });
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







