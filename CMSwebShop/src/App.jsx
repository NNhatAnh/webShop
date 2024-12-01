import { useState } from 'react'
import Header from './component/header/header'
import Sidebar from './component/sidebar/sidebar'
import Footer from './component/footer/footer'
import Product_list from './Pages/Product/product_list'
import Order_list from './Pages/OrderList/order_list'
import Product_add from './Pages/Product/product_add'

function App() {
  return (
    <>
      <Header/> 
      <Sidebar/>
      {/* <Product_list/> */}
      {/* <Order_list/> */}
      <Product_add/>
      <Footer/>
    </>
  )
}

export default App
