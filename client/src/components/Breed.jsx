import React, { Component } from 'react'

export default class Breed extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {photos, name} = this.props;
    return (
      <div>
        here's the img!
        <hr/>
        <div>
          <ul>
            {photos.length > 0 && photos.map((data, i)=> {
              return <li key={i}>{name}'s {data.breed}
                      <br/>
                      <img src={data.img} alt=""/>
                    </li>
            })}
          </ul>
        </div>
      </div>
    )
  }
}
