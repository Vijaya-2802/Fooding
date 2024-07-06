import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
export default function Signup() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [geolocation, setGeolocation] = useState("")
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
        const response=await fetch("http://localhost:5000/api/createuser",{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:name,password:password,email:email,location:geolocation}),})
            if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`) }
            const data=await response.json()
            //console.log("Data sent to the server:"+data);
            if(!data.success){
                alert("Enter Valid Credentials")
            }
        }
        catch(error){
             console.error('Error:', error)}
        }   
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3 form-group">
                    <label htmlFor="name" className="form-label">User name</label>
                    <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="name" />

                </div>
                <div className="mb-3 form-group">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3 form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" />
                    <small id="passwordHelp" className="form-text text-muted">Password length should be atleast 5</small>
                </div>
                <div className="mb-3 form-group">
                    <label htmlFor="geolocation" className="form-label">Location</label>
                    <input type="text" name='geolocation' value={geolocation} onChange={(e) => setGeolocation(e.target.value)} className="form-control" id="geolocation"  />
                </div>
                <button type="submit" className="m-3 btn btn-success">Submit</button>
                <Link to="/Login" className="m-3 btn btn-danger">Already a user</Link>
            </form>
        </div>

    )
}
