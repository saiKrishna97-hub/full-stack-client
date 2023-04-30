import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Register() {
  const initialValues = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });
  const onSubmit = (data) => {
    axios.post("http://localhost:8080/auth", data).then((response) => {
      console.log(response);
    });
  };
  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="formContainer">
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autoComplete="false"
            placeholder="(Akhil123...)"
            id="inputCreatePost"
            name="username"
          ></Field>
          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autoComplete="false"
            type="password"
            placeholder="Password"
            id="inputCreatePost"
            name="password"
          ></Field>
          <button type="submit"> Register </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Register;
