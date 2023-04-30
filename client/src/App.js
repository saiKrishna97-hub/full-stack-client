import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Pages/Home";
import CreatePost from "./Pages/CreatePost";
import PostInfo from "./Pages/PostInfo";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import UserInfo from "./Pages/UserInfo";
import { AuthContext } from "./Helpers/AuthContext";
import PageNotFound from "./Helpers/PageNotFound";
import ChangePassword from "./Helpers/ChangePassword";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });
  // const {authState} = useContext();
  useEffect(() => {
    // if (!localStorage.getItem("accessToken")) {
    //   setAuthState(false);
    // } else {
    //   setAuthState(true);
    // }
    axios
      .get("http://localhost:8080/auth/verify", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  });

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ ...authState, status: false });
  };
  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <div className="links">
              {!authState.status ? (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Registeration</Link>
                </>
              ) : (
                <>
                  <Link to="/">Home page</Link>
                  <Link to="/createpost">Create a Post</Link>

                  <div className="loggedInContainer">
                    <h5>{authState.username}</h5>
                    <button onClick={logout}>Logout</button>
                  </div>
                </>
              )}
            </div>
          </div>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/createpost" exact element={<CreatePost />} />
            <Route path="/postinfo/:id" exact element={<PostInfo />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/userinfo/:id" exact element={<UserInfo />} />
            <Route path="/changepassword" exact element={<ChangePassword />} />
            <Route path="*" exact element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
