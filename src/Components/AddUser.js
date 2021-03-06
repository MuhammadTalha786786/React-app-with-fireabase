import React, { useState } from "react";
import { db } from "./firebase";
function AddUser() {
  const [name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Cellnumber, setCellnumber] = useState("");
  const [age, setage] = useState("");

  const HandleSubmit = (e) => {
    e.preventDefault();
    db.collection("users")
      .add({
        name: name,
        Email: Email,
        Cellnumber: Cellnumber,
        age: age,
      })
      .then(() => {
        alert("User has been added successfully");
        window.location.reload(false);
      })
      .catch((err) => {
        alert(err);
      });
    setName();
    setEmail();
    setCellnumber();
    setage();
  };
  return (
    <div className="container my-3">
      <h3 className="text-center text-primary">Add User</h3>
      <form onSubmit={HandleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            required
            placeholder="Enter your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            value={Email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Cell Number
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter your Number "
            value={Cellnumber}
            onChange={(e) => {
              setCellnumber(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter your Age "
            min="18"
            max="60"
            value={age}
            onChange={(e) => {
              setage(e.target.value);
            }}
          />
        </div>

        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-block btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUser;
