import main from '../assets/images/main.svg'
import React from "react";
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components';
import { Link } from 'react-router-dom';


const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis inventore sequi aliquam voluptatum, quia totam? Assumenda, ratione ullam? Voluptatem fugit non fugiat tempore magni nisi voluptates repellendus labore alias velit.
          </p>
          <Link to="/register" className='btn btn-hero'>Login/Register</Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  )
}

export default Landing