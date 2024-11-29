import { useState } from 'react'
import Header from './component/header/header'
import Sidebar from './component/sidebar/sidebar'
import Footer from './component/footer/footer'
import Admin from './Pages/User_admin/admin'

function App() {
  return (
    <>
      <Header/> 
      <Sidebar/>
      <Admin/>
      <Footer/>
    </>
  )
}

export default App
