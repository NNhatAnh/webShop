import './admin.css'
function admin (){
    return(
        <div className="admin-content-main-content">
            <div className="admin-info-wrapper">
                <h2>Thông Tin Quản Trị Viên</h2>
                <div className="admin-info-item">
                    <label htmlFor="full-name">Họ và Tên:</label>
                    <p id="full-name">Nguyễn Văn A</p>
                </div>
                <div className="admin-info-item">
                    <label htmlFor="email">Email:</label>
                    <p id="email">vana@gmail.com</p>
                </div>
                <div className="admin-info-item">
                    <label htmlFor="phone">Số Điện Thoại:</label>
                    <p id="phone">0912345678</p>
                </div>
                <div className="admin-info-item">
                    <label htmlFor="dob">Ngày Sinh:</label>
                    <p id="dob">1990-01-01</p>
                </div>
                <div className="admin-info-item">
                    <label htmlFor="role">Vai Trò:</label>
                    <p id="role">Quản Trị Viên</p>
                </div>
                <div className="admin-info-item">
                    <label htmlFor="date-joined">Ngày Tham Gia:</label>
                    <p id="date-joined">2023-01-15</p>
                </div>
            </div>
            <div className="admin-action-buttons">
                <button className="btn btn-edit">Chỉnh Sửa</button>
                <button className="btn btn-delete">Xóa Tài Khoản</button>
            </div>
        </div>

    );
}

export default admin