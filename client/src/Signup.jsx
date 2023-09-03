import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios  from 'axios';
import { Link , useNavigate} from 'react-router-dom';

function Signup() {
  const [name , setName] = useState("");
  const [email , setEmail] = useState(""); 
  const [password , setPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:3001/register',{name , email , password})
    .then(result =>  navigate('/login'))
    .catch(err => console.log(err))
    console.log(name , email , password);
  }
  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4">Registration Form</h2>
  <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" placeholder="Enter username"  onChange={(e)=>{setName(e.target.value)}}/>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="email" placeholder="Enter email"   onChange={(e)=>{setEmail(e.target.value)}} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password"   onChange={(e)=>{setPassword(e.target.value)}} />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password"  />
              </div>
              <button type="submit" className="btn btn-primary">Register</button>
            </form>
             <p>Already have an account</p>
             <Link to="/login"  className='btn btn-defult border w-100 bg-light'>Login</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Signup;