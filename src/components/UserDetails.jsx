import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showUser, deleteUser } from "../features/userDetailSlice";
import { Link } from "react-router-dom";
import Popup from "./Popup";

const UserDetails = () => {
  const [id, setId] = useState();

  const [radioData, setRadioData] = useState('');

  const dispatch = useDispatch();

  const [showPopup, setShowPopup] = useState(false);

  const { user, loading, searchData } = useSelector((state) => state.app);
  // console.log("users====>", user);

  useEffect(() => {
    dispatch(showUser());
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="my-2">
      {showPopup && (
        <Popup id={id} setShowPopup={setShowPopup} showPopup={showPopup} />
      )}
      <h2>User Details</h2>
      {/*  */}

      <div className="p-3">
      <input
          className="form-check-input m-1"
          type="radio"
          name="gender"
          id="flexRadioDefault1"
          value="All"
          checked = {radioData === ""}
          onChange={(e)=> setRadioData("")}
          // onChange={getUserData}
        />
        <label className="form-check-label" htmlFor="flexRadioDefault1">
          All
        </label>
        <input
          className="form-check-input m-1"
          type="radio"
          name="gender"
          id="flexRadioDefault1"
          value="Male"
          checked = {radioData === "Male"}
          onChange={(e)=> setRadioData(e.target.value)}
        />
        <label className="form-check-label" htmlFor="flexRadioDefault1">
          Male
        </label>
        <input
          className="form-check-input m-1"
          type="radio"
          name="gender"
          id="flexRadioDefault2"
          value="Female"
          checked = {radioData === "Female"}
          onChange={(e)=> setRadioData(e.target.value)}
          // checked
        />
        <label className="form-check-label" htmlFor="flexRadioDefault2">
          Female
        </label>
      </div>

      {/*  */}
      <div className="d-flex flex-row flex-wrap m-2 m-auto">
        {user &&
          user
            .filter((ele) => {
              if (!searchData || searchData.length === 0) {
                return ele;
              } else {
                return ele.name
                  .toLowerCase()
                  .includes(searchData.toLowerCase());
              }
            }).filter((ele)=>{
              if(radioData === "Male"){
                return ele.gender === radioData
              }else  if(radioData === "Female"){
                return ele.gender === radioData
              }else return ele;
            })
            .map((ele) => (
              <div
                className="card d-flex flex-row flex-wrap m-1 mb-2 m-auto "
                style={{ width: "20rem" }}
              >
                <div className="card-body">
                  <h5 className="card-title">Name: {ele.name}</h5>
                  <h5 className="card-title">Email: {ele.email}</h5>
                  <h5 className="card-title">Age: {ele.age}</h5>
                  <h5 className="card-title">Gender: {ele.gender}</h5>
                  <Link
                    to="#"
                    className="card-link"
                    onClick={() => [setId(ele.id), setShowPopup(true)]}
                  >
                    View
                  </Link>
                  <Link to={`/edit/${ele.id}`} className="card-link">
                    Edit
                  </Link>
                  <Link
                    onClick={() => dispatch(deleteUser(ele.id))}
                    className="card-link"
                  >
                    Delete
                  </Link>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default UserDetails;
