import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';
import './Navbar.css';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg fixed-top">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">NexVault</NavLink>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item mx-4">
                            <NavLink 
                                to="/" 
                                className={({ isActive }) => 
                                    `nav-link navbar-components ${isActive ? 'active' : ''}`} 
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item mx-4">
                            <NavLink 
                                to="/About-us" 
                                className={({ isActive }) => 
                                    `nav-link navbar-components ${isActive ? 'active' : ''}`} 
                            >
                                About
                            </NavLink>
                        </li>
                        <li className="nav-item mx-4">
                            <NavLink 
                                to="/" 
                                className={({ isActive }) => 
                                    `nav-link navbar-components ${isActive ? 'active' : ''}`} 
                            >
                                Services
                            </NavLink>
                        </li>
                        <li className="nav-item mx-4">
                            <NavLink 
                                to="/" 
                                className={({ isActive }) => 
                                    `nav-link navbar-components ${isActive ? 'active' : ''}`} 
                            >
                                Pricing
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
