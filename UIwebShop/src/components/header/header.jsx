import React from "react";
import { Link } from "react-router-dom";
import './header.css';

import logoHeader from '../../assets/react.svg';

export default function Header() {
    return (
        <section className="header">
            <div className="container">
                <div className="logo">
                    <img src={logoHeader} alt="Logo" />
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
                            <Link to="/accessory">Accessory</Link>
                        </li>
                        <li className="navLink">
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>
                <div className="subHeader">
                    <ul className="subList">
                        <li className="seacrch">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </li>
                        <li className="user">
                            <i className="fa-regular fa-user"></i>
                        </li>
                        <li className="shopping-cart">
                            <i className="fa-solid fa-cart-shopping"></i>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}