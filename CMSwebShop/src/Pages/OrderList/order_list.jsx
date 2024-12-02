import './order_list.css'
function Order_list(){
    return(
        <div className="admin-content-main-content">
            <h2>Danh Sách Đơn Hàng</h2>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User id</th>
                        <th>Status</th>
                        <th>Total price</th>
                        <th>Time Order</th>
                        <th>Aciton</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>Điện thoại</td>
                        <td>1000000</td>
                        <td>22/10/2222</td>
                        <td>
                            <button className="btn btn-edit">Sửa</button>
                            <button className="btn btn-delete">Xóa</button>
                        </td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>Điện thoại</td>
                        <td>1000000</td>
                        <td>22/10/2222</td>
                        <td>
                            <button className="btn btn-edit">Sửa</button>
                            <button className="btn btn-delete">Xóa</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>


    );
}

export default Order_list