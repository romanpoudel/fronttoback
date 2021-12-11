import React, { useState, useEffect } from "react";
import "./Table.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";

const customStyles = {
  content: {
    width: "50%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function Table() {
  const [items, setItems] = useState([]);
  const [open, openModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dateObj = new Date();
  const month = monthNames[dateObj.getMonth()];
  const day = String(dateObj.getDate()).padStart(2, "0");
  const year = dateObj.getFullYear();
  const output = month + "\n" + day + "," + year;

  let a = 0;

  useEffect(() => {
    fetchData();
  });

  const selectUser = (no) => {
    console.warn(items[no]);
    let user = items[no];
    setTitle(user.title);
    setDescription(user.description);
  };

  const fetchData = () => {
    fetch("http://localhost:8000/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result);
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const handleDelete = (id) => {
    fetch(`http://localhost:8000/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      window.location.reload();
    });
    fetchData();
  };

  const trigger = (no,id) => {
    selectUser(no);
    setId(id);
    openModal(true);
  };

  const updateUser=()=>{

    fetch(`http://localhost:8000/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({title,description}),
    }).then((res) => {
      res.json().then((resp)=>{
        console.log(resp);
        window.location.reload();
        fetchData();
      })
    });

  };
  return (
    <div className="table">
      <Modal
        isOpen={open}
        onRequestClose={() => openModal(false)}
        style={customStyles}
      >
        <h1>Roman Modal</h1>
        <form>
          <div className="modInput">
            <text>Enter your title: </text>
            <input
              className="input"
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "347.7px" }}
            />
          </div>
          <div className="modInput">
            <text> Enter description:</text>
            <input
              className="input"
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "347.7px" }}
            />
          </div>
        </form>

        <button className="updatebtn" onClick={()=>updateUser()}>
          Update
        </button>
      </Modal>

      <text className="title">Input data from Database</text>
      <table class="table table-bordered table-dark">
        <thead>
          <tr>
            <th scope="col">S.N.</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Input Date</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, no) => (
            <tr>
              <th scope="row">{++a}</th>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{output}</td>
              <td>
                <button className="edit" onClick={() => trigger(no,item._id)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </td>
              <td>
                <button
                  className="delete"
                  onClick={() => handleDelete(item._id)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
