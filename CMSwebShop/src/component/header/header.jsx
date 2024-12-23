import './header.css'
function Header(){

    const handleLogout = (e) => {
        localStorage.removeItem("admin");
        window.location.reload();
        e.preventDefault(); // Ngừng hành động mặc định (ngừng điều hướng)
    }


    return(
        <div className="admin-header">
            <div className="admin-header-right">
                <ul className="flex-box account-actions">
                    <li className="flex-box account-dropdown">
                        <p><i className="fa-regular fa-user" style={{marginRight: '5px'}}></i>Account <i className="ri-arrow-down-s-fill"></i></p>
                        <div className="dropdown-menu">
                            <ul>
                                <li><a href="#" onClick={handleLogout} >Log out</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Header