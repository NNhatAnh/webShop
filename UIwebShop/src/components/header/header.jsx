import React from "react";
import { Link } from "react-router-dom";
import './header.css';

import logoHeader from '../../assets/react.svg';

export default function Header({ openLoginPopup, openCartPopup }) {
    return (
        <section className="header">
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <img src="../../images/Rolex_logo.svg" alt="Logo" />
                    </Link>
                </div>
                <div className="navbar">
                    <ul className="navList">
                        <li className="navLink">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="navLink">
                            <Link to="/product">Product</Link>
                        </li>
                        <li className="navLink">
                            <Link to="/policy">Policy</Link>
                        </li>
                        <li className="navLink">
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>
                <div className="subHeader">
                    <ul className="subList">
                        <li className="user" onClick={openLoginPopup}>
                            <i className="fa-regular fa-user"></i>
                        </li>
                        <li className="shopping-cart" onClick={openCartPopup}>
                            <i className="fa-solid fa-cart-shopping"></i>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
