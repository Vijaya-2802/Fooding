import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import { useCart } from './Contextreducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';
export default function Navbar() {
    const [cartView, setCartView] = useState(false)
    localStorage.setItem('temp', "first")
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    }

    const items = useCart();
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand bubblegum-sans-regular fs-1" to="/">Fooding</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <ul className="navbar-nav me-auto fs-5">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            </li>
                            {(localStorage.getItem("authToken")) ?
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/history">History</Link>
                                </li>
                                : ""}
                        </ul>
                        <div className="d-flex">
                            {!(localStorage.getItem("authToken")) ?
                                <div>
                                    <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                                    <Link className="btn bg-white text-success mx-1" to="/Signup">Sign up</Link>
                                </div>
                                :
                                <div>
                                    <div className="btn bg-white text-success mx-2" onClick={() => { setCartView(true) }}>
                                        🛒Cart
                                        {
                                            items.length !== 0 ?
                                                <Badge pill color="secondary"  > {items.length} </Badge>
                                                : ""
                                        }
                                    </div>
                                    {cartView ? <Modal onClose={() => setCartView(false)}><Cart className='bg-dark' /></Modal> : ""}
                                    <button onClick={handleLogout} className="btn bg-white text-success" >Logout</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )

}
