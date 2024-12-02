import React, { useState } from 'react';
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
                <img src="../assets/imgs/logo.jpg" alt="Logo" />
            </div>
            <div className="admin-sidebar-content">
                <ul>
                    <li>
                        <a
                            href="#!"
                            className={openMenu.orders ? 'open' : ''}
                            onClick={() => toggleMenu('orders')}
                        >
                            Đơn Hàng <i className="fa-solid fa-chevron-down"></i>
                        </a>
                        <ul className={`sub-menu ${openMenu.orders ? 'open' : ''}`}>
                            <li><a href="#">Danh sách</a></li>
                        </ul>
                    </li>
                    <li>
                        <a
                            href="#!"
                            className={openMenu.products ? 'open' : ''}
                            onClick={() => toggleMenu('products')}
                        >
                            Sản Phẩm <i className="fa-solid fa-chevron-down"></i>
                        </a>
                        <ul className={`sub-menu ${openMenu.products ? 'open' : ''}`}>
                            <li><a href="#">Danh sách</a></li>
                            <li><a href="#">Thêm</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;