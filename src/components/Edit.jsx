import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../features/userDetailSlice";

const Edit = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();
  
  const [updateData, setUpdateData] = useState();

  const { user, loading } = useSelector((state) => state.app);

  useEffect(() => {
    if (id) {
      const singleUser = user.filter((ele) => ele.id === id);
      // console.log('single===>',singleUser);
      setUpdateData(singleUser[0]);
    }
  }, []);
  console.log("update1===>", updateData);

  const newData = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser(updateData));
    navigate("/userdetail");
  };

  return (
    <div>
      <h2 className="my-2">Fill the Form </h2>
      <form
        className="w-50 mx-auto needs-validation my-5"
        onSubmit={handleUpdate}
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
            value={updateData && updateData.email}
            onChange={newData}
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
            value={updateData && updateData.name}
            name="name"
            onChange={newData}
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
            value={updateData && updateData.age}
            onChange={newData}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="flexRadioDefault1"
            value="Male"
            checked={updateData && updateData.gender === "Male"}
            onChange={newData}
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
            checked={updateData && updateData.gender === "Female"}
            onChange={newData}
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

export default Edit;
