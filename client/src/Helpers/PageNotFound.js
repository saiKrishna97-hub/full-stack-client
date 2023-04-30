import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <>
      <h1>PageNotFound :/</h1>
      <h3>
        Go to Home Page: <Link to="/">Home page</Link>
      </h3>
    </>
  );
}

export default PageNotFound;
