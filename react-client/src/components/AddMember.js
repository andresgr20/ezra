import React, { Component } from 'react'

export class AddMember extends Component {
  static displayName = AddMember.name

  constructor(props) {
    super(props)
  }

  async addMember() {
    // TODO
    throw 'Implement me'
  }

  render() {
    return (
      <div>
        <h1>Add Member</h1>
          <form>
            <label for="fname">Name:</label>
            <br></br>
            <input type="text" id="fname" name="fname" placeholder="Andrew Doxey"></input>
            <br></br>
            <label for="email">Email:</label>
            <br></br>
            <input type="email" id="email" name="email" placeholder="andydoxy@erin.com"></input> 
          </form>

        <button className="btn btn-primary" onClick={this.addMember}>
          Add
        </button>
      </div>
    )
  }
}
