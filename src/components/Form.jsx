import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../features/userDetailSlice";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [users, setUsers] = useState({});

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const getUserData = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
    // console.log(users);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("users===>", users);
    dispatch(createUser(users));
    navigate("userdetail")
  };

  return (
    <div>
      <h2 className="my-2">Fill the Form </h2>
      <form
        className="w-50 mx-auto needs-validation my-5"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
            name="email"
            onChange={getUserData}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="validationTooltip01"
            required
            name="name"
            onChange={getUserData}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="validationTooltip01" className="form-label">
            Age
          </label>
          <input
            type="text"
            className="form-control"
            id="validationTooltip01"
            required
            name="age"
            onChange={getUserData}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="flexRadioDefault1"
            value="Male"
            onChange={getUserData}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Male
          </label>
        </div>
        <div className="mb-3">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="flexRadioDefault2"
            value="Female"
            onChange={getUserData}
            // checked
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            Female
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
