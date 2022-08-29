# Jobify

#### Track Your Job Search


Project in Action - [Jobify](https://www.jobigy.live/)

#### Support

Find the App USeful? [You can always buy me a coffee](https://www.buymeacoffee.com/johensmilga)

#### Run The App Locally


- npm run install-dependencies
- rename .env.temp to .env
- setup values for -MONGO_URL, JWT_SECRET, JWT_LIFETIME
- npm start
- visit url http://localhost:3000/

#### Setup React App

- create 'client' folder
- open terminal
- cd client
- npx create-react-app@latest
- npm start
- set editor/browser side by side
- copy/paste assets from complete project


#### Spring Cleaning

- in src remove
- App.css
- App.test.js
- reportWebVital.js
- setupTests.js
- fix App.js and index.js

#### Title and Favicon

- change title in public/index.html
- replace favicon.ico in public
- resource (favicons) [https://favicon.io/]

#### Normalize.css and Global Styles

- CSS in JS
- saves times on the setup
- less lines of css
- speeds up the development
- normalize.css
- small CSS file that provides cross-browser consistency in the default styling of HTML elements
- (normalize)[https://necolas.github.io/normalize.css/]
- npm install normalize.css
- import 'normalize.css' in index.js
- SET BEFORE 'index.css'
- if any questions about normalize or specific styles
- Coding Addict (Default Starter)[https://youtu.be/UDdyGNlQK5w]
- Repo (Default Satrter)[https://github.com/john-smilga/default-starter]

#### Landing Page

- zoom level 175%
- markdown preview extension
- get something on the screen
- react router and styled components right after
- create pages directory in the source
- for now Landing.js
- create component (snippets extension)
- setup basic return

```js
<h4>Landing Page</h4>
```

- import logo.svg and main.svg
- import Landing in App.js and render

#### Styled Components

- CSS in JS
- Styled Components
- have logic and styles in component
- no name collisions
- apply javascript logic
- Styled Components Docs [https://styled-components.com/]
- Styled Components Course[https://www.udemy.com/course/styled-components-tutorial-and-project-course/?referralCode=9DABB172FCB2625B663F]

npm install styled-components

import styled from "styled-components"

const El = styled.el`
//styles go here

- no name collisions, since unique class
- vscode-styled-components extension
- style entrire react component

const Wrapper = styled.el``

const Component = () =>{
  return(
    <Wrapper>
    <h1>Component</h1>
    </Wrapper>
  )
}

- only responsible for styling
- wrappers folder in assets

#### Logo and Images

- logo built in Figma
- Cool Images[https://undraw.co/]

#### Logo
- create components folder in source
- create Logo.js
- move import and image logic
- export as default
- utilize index.js


#### React Router
- Version 6
- React Router Docs[https://reactrouter.com/docs/en/v6]

npm install history@5 react-router-dom@6

- import four components
 import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'

 - connect to browser's URL with BrowserRouter
- Routes instead of Switch

<BrowserRouter>
<Routes>
<Route path="/" element={<div>Dashboard</div>}/>
<Route path="/register" element={<div>Register</div>} />
<Route path="/landing" element={<Landing />} />
<Route path="*" element={<div>Error</div>}>
</Routes>
</BrowserRouter>

<nav>
<Link to="/" >Dashboard</Link>
<Link to="/register">Register</Link>
<Link to="/landing" >Home</Link>
</nav>

- go to Landing.js

import { Link } from 'react-router-dom'

return (
  <Link to='/register' className='btn btn-hero'>
    Login / Register
  </Link>
)

#### Setup Pages
- create Error, Register, Dashboard pages
- basic return
- create index.js
- import all the pages
- export one by one
- basically the same, as in components
- import App.js
- add to element={}
- remove temp navbar

#### Error Page

import { Link } from 'react-router-dom'
import img from '../assets/images/not-found.svg'
import Wrapper from '../assets/wrappers/ErrorPage'

return (
  <Wrapper className='full-page'>
    <div>
      <img src={img} alt='not found' />
      <h3>text</h3>
      <p>text</p>
      <Link to='/'>back home</Link>
    </div>
  </Wrapper>
)

#### Auto Imports

- use while developing
- only sparingly while recording
- better picture
- messes with flow
- just my preference
- still use them, just not all the time


#### Register Page - Setup

- show preview in Broswer and themes

import { useState, useEffect } from 'react'
import { Logo } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
// global context and useNavigate later

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}
// if possible prefer local state
// global state

function Register() {
  const [values, setValues] = useState(initialState)

  // global context and useNavigate later

  const handleChange = (e) => {
    console.log(e.target)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(e.target)
  }
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>Login</h3>

        {/* name field */}
        <div className='form-row'>
          <label htmlFor='name' className='form-label'>
            name
          </label>

          <input
            type='text'
            value={values.name}
            name='name'
            onChange={handleChange}
            className='form-input'
          />
        </div>

        <button type='submit' className='btn btn-block'>
          submit
        </button>
      </form>
    </Wrapper>
  )
}


#### FormRow Component


- create FormRow.js in components
- setup import/export
- setup one for email and password
- hint "type,name,value"

const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>

      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className='form-input'
      />
    </div>
  )
}

export default FormRow


#### Alert Component

- right away setup as component
- create Alert.js in components

const Alert = () => {
  return <div className='alert alert-danger'>alert goes here</div>
}

export default Alert

- setup import/export
- alert-danger or alert-success
- eventually setup in global context
- showAlert in initialState (true || false)
- right after h3 login
values.showAlert && <Alert />

#### Toggle Memeber

const toggleMember = () => {
  setValues({ ...values, isMember: !values.isMember })
}

return (
  <Wrapper>
    {/* control h3 */}

    <h3>{values.isMember ? 'Login' : 'Register'}</h3>

    {/* toggle name */}

    {!values.isMember && (
      <FormRow
        type='text'
        name='name'
        value={values.name}
        handleChange={handleChange}
      />
    )}

    {/* right after submit btn */}
    {/* toggle button */}

    <p>
      {values.isMember ? 'Not a member yet?' : 'Already a member?'}

      <button type='button' onClick={toggleMember} className='member-btn'>
        {values.isMember ? 'Register' : 'Login'}
      </button>
    </p>
  </Wrapper>
)

#### Global Context

- in src create context directory
- actions.js
- reducer.js
- appContext.js

import React, { useState, useReducer, useContext } from 'react'

export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
}
const AppContext = React.createContext()
const AppProvider = ({ children }) => {
  const [state, setState] = useState(initialState)

  return (
    <AppContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider }

- index.js
import { AppProvider } from './context/appContext'

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

- Register.js
import { useAppContext } from '../context/appContext'

const { isLoading, showAlert } = useAppContext()

- switch to global showAlert

#### useReducer
- React Tutorial
- useReducer vs Redux
- multiple reducers vs one

#### Wire up reducer

reducer.js

const reducer = (state, action) => {
  throw new Error(`no such action :${action.type}`)
}
export default reducer

appContext.js

import reducer from './reducer'

const [state, dispatch] = useReducer(reducer, initialState)

#### Display Alert

actions.js

export const DISPLAY_ALERT = 'SHOW_ALERT'

- setup imports (reducer and appContext)
appContext.js

const displayAlert() =>{
  dispatch({type:DISPLAY_ALERT})
}
reducer.js

if (action.type === DISPLAY_ALERT) {
  return {
    ...state,
    showAlert: true,
    alertType: 'danger',
    alertText: 'Please provide all values!',
  }
}

Alert.js in Components

import { useAppContext } from '../context/appContext'

const Alert = () => {
  const { alertType, alertText } = useAppContext()
  return <div className={`alert alert-${alertType}`}>{alertText}</div>
}

#### Display Alert
- JS Nuggest - Dynamic Object Keys
appContext.js

const handleChange = (e) => {
  setValues({ ...values, [e.target.name]: e.target.value })
}

- get displayAlert function
appContext.js

const onSubmit = (e) => {
  e.preventDefault()
  const { name, email, password, isMember } = values
  if (!email || !password || (!isMember && !name)) {
    displayAlert()
    return
  }
  console.log(values)
}

#### Clear Alert

- technically optional

actions.js

export const CLEAR_ALERT = 'CLEAR_ALERT'

- setup imports (reducer and appContext)
reducer.js

if (action.type === CLEAR_ALERT) {
  return {
    ...state,
    showAlert: false,
    alertType: '',
    alertText: '',
  }
}

appContext.js

const displayAlert = () => {
  dispatch({
    type: DISPLAY_ALERT,
  })
  clearAlert()
}

const clearAlert = () => {
  setTimeout(() => {
    dispatch({
      type: CLEAR_ALERT,
    })
  }, 3000)
}

#### Setup Server
- stop the dev server in client
- cd ..
- start setting up our server
- setup package.json

npm init -y

- create server.js
- console.log('server running)

node server


#### Not Found Middleware
- in the root create middleware folder
- not-found.js
- setup function
- return 404 with message 'Route does not exist'
- import in server.js
- make sure to use .js extension
- place after home route

#### Error Middleware
- in the middleware create error-handler.js
- setup function
- accept 4 parameters, first one error
- log error
- return 500
- json({msg:'there was an error'})
- import in the server.js
- make sure to use .js extension
- place it last
- eventually handle Mongoose Errors, just like in the node-express
- showcase with async errors

#### ENV Variables
- import dotenv from 'dotenv'
- dotenv.config()
- create .env
- PORT=4000
- .gitignore
- /node_modules
- .env

#### Connect to MongoDB

- switched back to PORT=5000
- remove Error from '/'
- existing MongoDB Atlas Account

npm i mongoose

- create db folder
- create connect.js
- setup connectDB(url)
- in server.js create start() function
- get connection string
- setup as MONGO_URL in .env
- provide credentials and DB Name

#### Auth Controller and Route Structure
- create controllers
- authController.js
- create async functions

export {register, login, updateUser}

- return res.send('function name')
- create routes folder
- authRoutes.js
- setup express router
- import functions from authController.js

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/updateUser').patch(updateUser)

export default router

- import authRouter in server.js
app.use('/api/v1/auth', authRouter)

#### Jobs Controller and Route Structure
- jobsController.js
- create async functions

export { createJob, deleteJob, getAllJobs, updateJob, showStats }

- return res.send('function name')
- jobsRoutes.js
- setup express router
- import functions from jobsController.js

router.route('/').post(createJob).get(getAllJobs)
// place before :id
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteJob).patch(updateJob)

export default router

- in server.js jobsRouter
app.use('/api/v1/jobs', jobsRouter)

#### Postman
- URL global var
- JOBIFY Collection
- auth and jobs folders
- setup routes
#### User Model
- models folder
- User.js
- setup schema
- name, email, password, lastName, location
- all {type:String}

#### Validate Email

validate:{
  validator:(field)=> {return 2 > 1},
  message:'Please provide valid email'
  }

- Validator Package
npm install validator
- import in User.js
- validator.isEmail

#### Register User - Initial Setup

- authController
- import User model
- setup temporary try/catch
- await User.create(req.body)
- if success 201 with json({user}) (temp)
- if error 500 with json({msg:'there was an error'})

#### Express-Async-Errors Package
- remove try/catch
- Express-Async-Errors
npm install express-async-errors
- in server.js
- import 'express-async-errors'
- use throw Error('error') instead of next(error)

#### Http Status Codes
- constants for status codes
- personal preference
- provides consistency
- less bugs
- easier to read/manage
- Http Status Codes

npm install http-status-codes
- import/setup in authController and error-handler
- setup defaultError
#### Custom Errors

Refactor Errors
- create errors folder
- create custom-api, bad-request, not-found, index.js files
- add proper imports
- setup index.js just like in the front-end
- import {BadRequestError} in authController
- gotcha "errors/index.js"

#### Hash Passwords
- one way street, only compare hashed values
- bcrypt.js
npm install bcryptjs
- User Model
- import bcrypt from 'bcryptjs'
- await genSalt(10)
- await hash(password , salt)
- await compare(requestPassword , currentPassword)
- mongoose middleware
- UserSchema.pre('save',async function(){ "this" points to instance created by UserSchema })

#### Mongoose - Custom Instance Methods
Custom Instance Methods

- UserSchema.methods.createJWT = function(){console.log(this)}
- register controller
- right after User.create()
- invoke user.createJWT()
#### JWT
- token
- jsonwebtoken
npm install jsonwebtoken

- User Model
- import jwt from 'jsonwebtoken'
- jwt.sign(payload,secret,options)
- createJWT
return jwt.sign({ userId: this._id }, 'jwtSecret', { expiresIn: '1d' })
return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_LIFETIME,
})

#### JWT_SECRET and JWT_LIFETIME
- Keys Generator
- RESTART SERVER!!!!
Complete Register
- password : {select:false}
- complete response
Concurrently
- front-end and backend (server)
- run separate terminals
- concurrently

npm install concurrently --save-dev

- package.json
// --kill-others switch, all commands are killed if one dies
// --prefix client - folder
// cd client && npm start
// escape quotes

"scripts": {
    "server": "nodemon server --ignore client",
    "client": "npm start --prefix client",
    "start": "concurrently --kill-others-on-fail \"npm run server\" \" npm run client\""
  },

#### Cors Error

Cors Error
- two fixes (ors package and proxy)

Cors Package

cors package
 npm i cors
 import cors from 'cors'

app.use(cors())

#### Proxy
- access from anywhere
- don't want to use full url
"proxy":"http://localhost:5000"

- my preference to remove trailing slash /
- restart app

####Postman - SET token programmatically
-register and login routes
-Tests
'''js
const jsonData = pm.response.json()
pm.globals.set('token, jsonData.token)
Type: Bearer

Token: {{token}}