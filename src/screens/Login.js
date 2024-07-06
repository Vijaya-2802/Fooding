import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';

export default function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();//This prevents from refreshing the page
    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: password, email: email }),
      })
      //if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`) }
      const data = await response.json()
      if (!data.success) {
        alert("Enter Valid Credentials")
      }
      if (data.success) {
        localStorage.setItem('userEmail', email);
        localStorage.setItem('authToken', data.authToken);
        console.log(localStorage.getItem("authToken"));
        console.log(localStorage.getItem("userEmail"));
        navigate("/");
      }
    }
    catch (error) {
      console.error('Error:', error)
    }
  }
  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3 form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3 form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/createuser" className="m-3 btn btn-danger">I'm a new user</Link>
        </form>
      </div>
    </div>
  )
}
