import React,{useState,useEffect} from 'react'
import "./Table.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'


export default function Table() {
    const [items, setItems] = useState([]);

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
const dateObj = new Date();
const month = monthNames[dateObj.getMonth()];
const day = String(dateObj.getDate()).padStart(2, '0');
const year = dateObj.getFullYear();
const output = month  + '\n'+ day  + ',' + year;

let a = 0;


    useEffect(() => {
       fetchData();
      })

      const fetchData = () => {
        fetch("http://localhost:8000/posts")
        .then(res => res.json())
        .then(
          (result) => {
            setItems(result);
          console.log(result);
          },
          (error) => {
              console.log(error);
            }
        )
      }
     const handleDelete = (id) => {
        fetch(`http://localhost:8000/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res);
            window.location.reload();
        })
        fetchData();
    }
      
    return (
        <div className='table'>
            <text className="title">Input data from Database</text>
            <table class="table table-bordered table-dark">
  <thead>
    <tr>
      <th scope="col">S.N.</th>
      <th scope="col">Title</th>
      <th scope="col">Description</th>
      <th scope="col">Input Date</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
      {items.map(item =>
    <tr>
      <th scope="row">{++a}</th>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{output}</td>
      <td><button className='delete' onClick={()=>handleDelete(item._id)}><FontAwesomeIcon icon={faTrashAlt} /></button></td>
    </tr>
      )}
  </tbody>
</table>
        </div>
    )
}
