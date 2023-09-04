import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DarshBorad = () => {
  const [success, setSuccess] = useState();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3001/darshboard")
      .then((res) => {
        if (res.data === "Success") {
          setSuccess("Success");
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return <div>DarshBorad</div>;
};

export default DarshBorad;
