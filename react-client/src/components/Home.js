import React, { Component } from 'react'

import './Home.css'

export class Home extends Component {
  static displayName = Home.name

  constructor(props) {
    super(props)
    this.state = { members: [], loading: true, editing: false, delete: false}
    this.editMember = this.editMember.bind(this);
  }

  componentDidMount() {
    this.populateMembers()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.delete !== this.state.delete) {
      this.populateMembers();
    }
  }

  renderMembersTable(members) {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member,index) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>
                {this.state.editing 
                ? <input value={member.name} onChange={e => this.handleChange(index,e.target.value)}/>   
                : member.name}</td>
               <td>
                {this.state.editing 
                ? <input value={member.email} onChange={e => this.handleChangeEmail(index,e.target.value)}/>   
                : member.email}</td>
              <td className="btn-group">
                <button
                  className="img-btn btn-link"
                  onClick={() => this.deleteMember(index,member.id)}
                >
                  <img src="/delete.svg" width="12px" height="12px" />
                </button>
                <button
                  className="img-btn btn-link"
                  onClick={() => this.editMember(member.id,member.name,member.email)}
                >
                  <img src="/edit.svg" width="12px" height="12px" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderMembersTable(this.state.members)
    )

    return (
      <div>
        <h1 id="tabelLabel">Ezra Members</h1>

        {contents}
      </div>
    )
  }

  handleChangeEmail(index,value){
    const newState = this.state.members.map((item,i) => {
      if(i === index){
        return {...item, email:value }
      }
      return item;
    })
    this.setState(
      { members: newState, loading: false,editing:true, delete:false }
    );
  }

  handleChange(index,value){
    const newState = this.state.members.map((item,i) => {
      if(i === index){
        return {...item, name:value }
      }
      return item;
    })
    this.setState(
      { members: newState, loading: false,editing:true, delete: false }
    );
  }

  async populateMembers() {
    const response = await fetch('http://localhost:5000/members')
    const data = await response.json()
    this.setState({ members: data, loading: false , editing:false, delete: false})
  }

  async deleteMember(index,memberId) {
    fetch(`http://localhost:5000/members/delete/${memberId}`, {
      method: "POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({'id':memberId})
    }).then(response => response.text())
    .then(data => console.log(data))    
    .catch(error => console.log("Error detected: " + error));
    this.setState(previousState => {
      return{
        members: previousState.members,
        loading: previousState.loading,
        editing: previousState.editing,
        delete: !previousState.delete
      };
    });
  }

  async editMember(memberId,memberName, memberEmail) {
    if(this.state.editing){
      fetch(`http://localhost:5000/members/edit/${memberId}`, {
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          'id':memberId,
          'Name':memberName,
          'Email':memberEmail
      })
      }).then(response => response.text())
      .then(data => console.log(data))    
      .catch(error => console.log("Error detected: " + error));
    }
      this.setState(previousState => {
        return{
          members: previousState.members,
          loading: previousState.loading,
          editing: !previousState.editing,
          delete: previousState.delete
        };
      });
  }
}
