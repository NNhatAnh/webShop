import './product.css'
function Product_list(){
    return(
        <div className="admin-content-main-content">
            <h2>Danh Sách Sản Phẩm</h2>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Brand</th>
                        <th>Quantity</th>
                        <th>Categori</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Sản phẩm A</td>
                        <td>
                            <img src="https://via.placeholder.com/50" alt="Sản phẩm A" className="product-image" />
                        </td>
                        <td>Điện thoại</td>
                        <td>Samsung</td>
                        <td>100</td>
                        <td>Điện tử</td>
                        <td>
                            <button className="btn btn-edit">Sửa</button>
                            <button className="btn btn-delete">Xóa</button>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Sản phẩm B</td>
                        <td>
                            <img src="https://via.placeholder.com/50" alt="Sản phẩm B" className="product-image" />
                        </td>
                        <td>Laptop</td>
                        <td>Asus</td>
                        <td>50</td>
                        <td>Công nghệ</td>
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

export default Product_list