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
    fetch("http://localhost:5000/members'", {
      method: "POST",
      body: JSON.stringify({name,email})
    });
  }

  return(
    <>
      <div>
        <h1>Add Member</h1>
          <form>
            <label for="fname">Name:</label>
            <br></br>
            <input type="text" id="fname" name="fname" placeholder="Andrew Doxey" onChange={handleNameChange}></input>
            <br></br>
            <label for="email">Email:</label>
            <br></br>
            <input type="email" id="email" name="email" placeholder="andydoxy@erin.com" onChange={handleEmailChange}></input> 
          </form>

        <button className="btn btn-primary" onClick={addMember}>
          Add
        </button>
      </div>
    </>
  );

}

