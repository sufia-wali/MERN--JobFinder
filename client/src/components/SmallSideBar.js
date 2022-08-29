import React from "react";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { useAppContext } from '../context/appContext'
import Logo from './Logo'
import { FaTimes } from "react-icons/fa";
import NavLinks from "./NavLinks";


const SmallSidebar = () => {
  const { toggleSidebar, showSidebar } = useAppContext()
  return (
    <Wrapper>
      <div className={
        showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
      }>
        <div className='content'>
          <button className='close-btn' onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggleSidebar}/>
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSidebar