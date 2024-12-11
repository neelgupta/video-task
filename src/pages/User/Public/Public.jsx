import React from "react";
import { useParams } from "react-router-dom";

function Public() {
  const { token } = useParams();
  console.log("token", token);
  return <div>Public</div>;
}

export default Public;
