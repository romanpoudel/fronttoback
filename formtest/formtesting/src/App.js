import "./App.css";
import React, { useState } from "react";
// import {useHistory,useNavigate} from 'react-router-dom';
import Table from "./Table";

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
    setUser({title:"",description:""});
  }

  
  return (
    <div className="App">
      <form id="create-course-form">
        <div className="container">
        <label>
          Enter your title:
          <input className="input"
            type="text"
            name="title"
            value={user.title}
            onChange={handleInputs}
          />
        </label>
        </div>
        <div className="container" >
        <label>
          Enter description:
          <input className="input" type="text" name="description" value={user.description}
            onChange={handleInputs}/>
        </label>
        </div>
        <div className="container">
        <button className="btn" onClick={PostData} >Submit</button>
        </div>
      </form>
      <Table />
    </div>
  );
}

export default App;
