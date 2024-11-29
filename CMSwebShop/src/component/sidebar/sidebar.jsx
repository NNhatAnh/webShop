import './sidebar.css'
function Sidebar(){
    return(
        <div className="admin-sidebar">
            <div className="admin-sidebar-top">
                <img src="../assets/imgs/logo.jpg" alt="Logo" />
            </div>
            <div className="admin-sidebar-content">
                <ul>
                    <li>
                        <a href="#"> Dashboard <i class="fa-solid fa-chevron-down"></i></a>
                        <ul className="sub-menu">
                            <li><a href="#"> Tổng quan</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#"> Đơn Hàng <i class="fa-solid fa-chevron-down"></i></a>
                        <ul className="sub-menu">
                            <li><a href="#"> Danh sách</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#"> Sản Phẩm <i class="fa-solid fa-chevron-down"></i></a>
                        <ul className="sub-menu">
                            <li><a href="#"> Danh sách</a></li>
                            <li><a href="#"> Thêm</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar