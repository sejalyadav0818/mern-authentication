import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((res) => {
        if (res.data.Status === "Success") {
          if (res.data.role === "admin") {
            navigate("/darshboard");
          } else {
            navigate("/");
          }
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Login Form</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  
                </div>
                <Link
                to="/forgot-password"
                className="btn btn-defult border w-100 bg-light"
              >
          
              <p>Forgot Password</p>
           </Link>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
             
              <Link
                to="/register"
                className="btn btn-defult border w-100 bg-light"
              >
                Sign-up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
