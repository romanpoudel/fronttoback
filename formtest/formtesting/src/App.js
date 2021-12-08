import "./App.css";
import React, { useState } from "react";
// import {useHistory,useNavigate} from 'react-router-dom';

function App() {

  // const history=useHistory();
  // const navigate=useNavigate();
  const [user, setUser] = useState({title:"",description:""});

  let name,value;
  const handleInputs = (e) => {
  console.log(e);
  name = e.target.name;
  value = e.target.value;
  setUser({...user,[name]:value});
  };

  const PostData = async(e) => {
    e.preventDefault();
    const {title,description} = user;

    const res=await fetch('http://localhost:8000/posts',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({title,description})
    })
    const data = await res.json();

    if(data.status === 422 || !data){
      window.alert("Invalid Input");
      console.log("Invalid Input");
    }
    else{
      window.alert("Post Added");
      console.log("Post Added");

      // history.push("/posts")
      // navigate("/posts")
    }
  }

  return (
    <div className="App">
      <form >
        <label>
          Enter your title:
          <input
            type="text"
            name="title"
            value={user.title}
            onChange={handleInputs}
          />
        </label>
        <label>
          Enter description:
          <input type="text" name="description" value={user.description}
            onChange={handleInputs}/>
        </label>
        <button onClick={PostData} >Submit</button>
      </form>
    </div>
  );
}

export default App;
