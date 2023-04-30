import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  });

  const changePassword = () => {
    axios
      .put(
        "http://localhost:8080/auth/changepassword",
        { oldPassword: oldPassword, newPassword: newPassword },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        }
      });
  };
  return (
    <>
      <h2>Change Password</h2>
      <div className="changePasswordContainer">
        <label>Old Password</label>
        <input
          type="password"
          placeholder="old password..."
          onChange={(event) => {
            setOldPassword(event.target.value);
          }}
        />
        <label>New Password</label>
        <input
          type="password"
          placeholder="new password..."
          onChange={(event) => {
            setNewPassword(event.target.value);
          }}
        />
        <button onClick={changePassword}> Save Changes </button>
      </div>
    </>
  );
}

export default ChangePassword;
