import React from 'react';
import './policy.css';

const Policy = () => {
  return (
    <div className="policies-page-container">
      <h1 className="policies-page-title">Chính sách và Điều khoản</h1>

      <div className="policy-section-container">
        <h2 className="policy-section-title">Chính sách Giao hàng</h2>
        <p className="policy-section-content">
          Chúng tôi cung cấp các dịch vụ giao hàng nhanh chóng và an toàn. Thời gian giao hàng
          tùy thuộc vào địa chỉ nhận hàng của bạn. Các đơn hàng sẽ được xử lý và vận chuyển trong vòng 24 giờ.
        </p>
        <ul className="policy-list">
          <li>Miễn phí giao hàng với đơn hàng trên 500.000 VNĐ.</li>
          <li>Giao hàng trong vòng 2-5 ngày làm việc đối với nội thành.</li>
          <li>Giao hàng quốc tế có thể mất từ 7-10 ngày làm việc.</li>
        </ul>
      </div>

      <div className="policy-section-container">
        <h2 className="policy-section-title">Chính sách và Điều khoản</h2>
        <p className="policy-section-content">
          Khi sử dụng dịch vụ của chúng tôi, bạn đồng ý với các điều khoản sau:
        </p>
        <ul className="policy-list">
          <li>Chúng tôi có quyền thay đổi hoặc cập nhật các điều khoản mà không cần thông báo trước.</li>
          <li>Bạn phải cung cấp thông tin chính xác khi tạo tài khoản hoặc mua hàng.</li>
          <li>Chúng tôi không chịu trách nhiệm về bất kỳ lỗi nào xảy ra trong quá trình vận chuyển.</li>
        </ul>
      </div>

      <div className="policy-section-container">
        <h2 className="policy-section-title">Chính sách Bảo mật</h2>
        <p className="policy-section-content">
          Chúng tôi cam kết bảo vệ sự riêng tư và thông tin cá nhân của khách hàng:
        </p>
        <ul className="policy-list">
          <li>Thông tin của bạn chỉ được sử dụng cho mục đích xử lý đơn hàng.</li>
          <li>Chúng tôi không chia sẻ thông tin cá nhân của bạn với bên thứ ba mà không có sự đồng ý.</li>
          <li>Tất cả giao dịch được bảo mật bằng mã hóa SSL.</li>
        </ul>
      </div>
    </div>
  );
};

export default Policy;
