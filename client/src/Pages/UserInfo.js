import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../Helpers/AuthContext";

function UserInfo() {
  let { id } = useParams();
  const [username, setUserName] = useState("");
  const [listOfUserPost, setListOfUserPost] = useState([]);
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:8080/auth/userinfo/${id}`)
        .then((response) => {
          setUserName(response.data.username);
        });

      axios
        .get(`http://localhost:8080/posts/byuserId/${id}`)
        .then((response) => {
          setListOfUserPost(response.data);
        });
    }
  });
  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        <h1> Username: {username} </h1>
        {authState.username === username && (
          <button
            onClick={() => {
              navigate("/changepassword");
            }}
          >
            Change Password
          </button>
        )}
      </div>
      <div className="listOfPosts">
        {listOfUserPost.map((value, key) => {
          return (
            <div key={key} className="post">
              <div className="title"> {value.title} </div>
              <div className="body">{value.postText}</div>
              <div className="footer">
                <div className="username">{value.username}</div>
                {/* <div className="buttons">
                  <label> {value.Likes.length}</label>
                </div> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserInfo;
