import { useState } from 'react'
import './App.css'
import MdWrapper from './components/MdWrapper';
import SideBar from './components/sidebar';


function App() {

  return (
    <>
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 h-screen overflow-hidden">
      <SideBar></SideBar>

      <div className="card col-span-2 md:col-span-3 lg:col-span-4 overflow-auto">
        <MdWrapper />
      </div>
    </div>
    
      
    </>
  )
}

export default App
