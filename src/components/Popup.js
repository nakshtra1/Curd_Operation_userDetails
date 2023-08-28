import React from "react";
import "./Popup.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Popup = ({ showPopup, id, setShowPopup }) => {
  const allUsers = useSelector((state) => state.app.user);
  const { user, loading } = useSelector((state) => state.app);

  const singleUser = allUsers.filter((ele) => ele.id === id);
  const single = singleUser[0];

  return (
    <div>
      <div className="modelBackground">
        <div className="modelContainer">
          <div className="button">
            <Link
              type="button"
              onClick={() => setShowPopup(false)}
              class="btn btn-primary my-1"
            >
              close
            </Link>
            <Link type="button" to={`/edit/${id}`} className="card-link">
              Edit
            </Link>
          </div>
          <p className="m-2">{single.name}</p>
          <p className="m-2">{single.age}</p>
          <p className="m-2">{single.email}</p>
          <p>{single.gender}</p>
        </div>
      </div>
    </div>
  );
};

export default Popup;
