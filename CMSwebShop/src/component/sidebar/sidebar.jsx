import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './sidebar.css';

function Sidebar() {
    // Trạng thái cho menu được mở
    const [openMenu, setOpenMenu] = useState({});

    // Hàm toggle mở/đóng menu
    const toggleMenu = (menuName) => {
        setOpenMenu((prevState) => ({
            ...prevState,
            [menuName]: !prevState[menuName], // Đảo ngược trạng thái của menu
        }));
    };

    return (
        <div className="admin-sidebar">
            <div className="admin-sidebar-top">
                <img src="../../images/Rolex_logo.svg" alt="Logo" />
            </div>
            <div className="admin-sidebar-content">
                <ul>
                    <li>
                        <a
                            href="#!"
                            className={openMenu.orders ? 'open' : ''}
                            onClick={() => toggleMenu('orders')}
                        >
                            Order <i className="fa-solid fa-chevron-down"></i>
                        </a>
                        <ul className={`sub-menu ${openMenu.orders ? 'open' : ''}`}>
                            <li>
                                <Link to="/">List Order</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a
                            href="#!"
                            className={openMenu.products ? 'open' : ''}
                            onClick={() => toggleMenu('products')}
                        >
                            Products <i className="fa-solid fa-chevron-down"></i>
                        </a>
                        <ul className={`sub-menu ${openMenu.products ? 'open' : ''}`}>
                            <li>
                                <Link to="/productList">List Product</Link>
                            </li>
                            <li>
                                <Link to="/productAdd">Add Product</Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
