import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { AuthContext } from "../Helpers/AuthContext";
function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const navigate = useNavigate();
  // const { authState } = useContext(AuthContext);
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios.get("http://localhost:8080/posts").then((response) => {
        setListOfPosts(response.data);
      });
    }
  });
  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <div className="post">
            <div className="title">{value.title}</div>
            <div
              className="body"
              onClick={() => {
                navigate(`postinfo/${value.id}`);
              }}
            >
              {value.postText}
            </div>
            <div className="footer">
              <Link className="link" to={`/userinfo/${value.id}`}>
                {value.userName}
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
