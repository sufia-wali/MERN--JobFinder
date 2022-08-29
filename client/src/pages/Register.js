import React, { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo, FormRow, Alert } from "../components";
import { useAppContext } from "../context/appContext";
import {useNavigate} from "react-router-dom"


const initialState = {
  name: "",
  email: '',
  password: "",
  isMember: true,
}


const Register = () => {
  const navigate = useNavigate()
  const { setupUser, user, isLoading, showAlert, displayAlert } = useAppContext()
  const [values, setValues] = useState(initialState)

  const toggleMember = () => {
    setValues({
      ...values,
      isMember: !values.isMember
    })
  }
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values
    if ((!isMember && !name) || !password || !email) {
      displayAlert()
      return
    }
    const currentUser = {name, email, password}
    if(isMember){
      setupUser({
        currentUser,
        endPoint: 'Login',
        alertText: 'Login Successfull!'})
    }else{
      setupUser({
        currentUser,
        endPoint: 'Register',
        alertText: 'Register Successful'
      })
    }
  }

  useEffect(()=>{
    if(user){
    setTimeout(()=>{
      navigate("/")
    }, 2000)
  }
  }, [user, navigate])

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>
          {values.isMember ? 'Login' : 'Register'}
        </h3>
        {showAlert && <Alert />}

        {/* name input */}
        {!values.isMember &&
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />}
        {/* email input */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password input */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>submit</button>
        {values.isMember ?
          <p>Not a member yet?
            <button className="member-btn" onClick={toggleMember} type="button">Register</button>
          </p> :
          <p>Already a member?
            <button className="member-btn" onClick={toggleMember} type="button">Login</button>
          </p>
        }
      </form>
    </Wrapper>
  )
}

export default Register


// // Something to e deleted later
// for i in Range(0,n):
//   iffsf
// //