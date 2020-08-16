import React,{useState} from 'react'


export default function AddMember(){
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  
  function handleNameChange(e){
      setName(e.target.value);
  }

  function handleEmailChange(e){
    setEmail(e.target.value);
  }

  async function addMember() {
    fetch('http://localhost:5000/members/add/', {
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({name,email})
    }).then(response => response.text())
    .then(data => console.log(data))    
    .catch(error => console.log("Error detected: " + error));
    setEmail('');
    setName('');
  }

  return(
    <>
      <div>
        <h1>Add Member</h1>
          <form className="form-group">
            <label htmlFor="fname">Name:</label>
            <br></br>
            <input type="text" className="form-control" aria-describedby="memberName" value={name} name="fname" placeholder="Andrew Doxey" onChange={handleNameChange} required></input>
            <br></br>
            <label htmlFor="email">Email:</label>
            <br></br>
            <input type="email" className="form-control" aria-describedby="memberEmail"  value={email} name="email" placeholder="andydoxy@erin.com" onChange={handleEmailChange} required></input>
          </form>

        <button className="btn btn-primary" disabled={email.length <1 || name.length<1} onClick={addMember}>
          Add
        </button>
      </div>
    </>
  );

}

