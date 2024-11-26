import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function MyFolder() {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/user/collection");
    }
  }, [id, navigate]);
  return (
    <div className="MyFolder">
      <div>{id}</div>
    </div>
  );
}

export default MyFolder;
