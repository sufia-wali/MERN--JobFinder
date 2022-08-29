import React,{ useReducer, useContext, useEffect} from "react";
import reducer from './reducer'
import axios from 'axios'

import {
   DISPLAY_ALERT,
   CLEARˍALERT,
   SETUP_USER_BEGIN,
   SETUP_USER_SUCCESS,
   SETUP_USER_ERROR,
   TOGGLE_SIDEBAR,
   LOGOUT_USER,
   UPDATE_USER_BEGIN,
   UPDATE_USER_SUCCESS,
   UPDATE_USER_ERROR,
   HANDLE_CHANGE,
   CLEAR_VALUES,
   CREATE_JOB_BEGIN,
   CREATE_JOB_SUCCESS,
   CREATE_JOB_ERROR,
   GET_JOBS_BEGIN,
   GET_JOBS_SUCCESS,
   SET_EDIT_JOB

  } from "./action";

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.stringify(user): null,
  token: token,
  userLocation: userLocation || '',
  jobLocation: userLocation || '',
  showSidebar: false,
  isEditing: false,
  editJobId: '',
  position: '',
  company: '',
  //joblocation
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['pending', 'interview', 'declined'],
  status: 'pending',
  //get all jobs
  jobs:[],
  totalJobs: 0,
  numOfPages: 1,
  page: 1

}
const AppContext = React.createContext()

const AppProvider = ({children}) =>{
  const [state, dispatch] = useReducer(reducer, initialState)

  //global setup
  // axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`
//axios
// const authFetch = axios.create({
//   baseURL: '/api/v1',
//   headers:{
//     Authorization: `Bearer ${state.token}`
//   }

// })
//interceptor - just like mware
const authFetch = axios.create({
  baseURL: '/api/v1',
})

//request
authFetch.interceptors.request.use((config)=>{
  config.headers.common['Authorization'] = `Bearer ${state.token}`
  return config
},
(error)=>{
  return Promise.reject(error)
}
)

//response
authFetch.interceptors.response.use((response)=>{
  return response
},
(error) =>{
  console.log(error.response);
  if(error.response.status === 401){
    logoutUser()
    // console.log('AUTH ERROR');
  }
  return Promise.reject(error)
}
)

  const displayAlert = () => {
    dispatch({type: DISPLAY_ALERT})
    clearAlert()
  }

  const clearAlert = () =>{
    setTimeout(()=>{
    dispatch({type: CLEARˍALERT})
    }, 2000)
  }

  const addUserToLocalStorage = ({user, token, location}) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    localStorage.setItem('location', location)
  }
//when we logout
  const removeUserFromLocalStorage = () =>{
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('location')
  }

// Login and Register
  const setupUser = async({currentUser, endPoint, alertText}) =>{
    dispatch({type: SETUP_USER_BEGIN})
    try{
      const response = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)
      const {user, token, location} = response.data
      dispatch({type: SETUP_USER_SUCCESS, payload:{ user, token, location, alertText }})
      addUserToLocalStorage({user, token, location})
    }catch(error){
      dispatch({type: SETUP_USER_ERROR, payload: {msg: error.response.data.msg}})
    }
    clearAlert()
  }

  const toggleSidebar = () =>{
    dispatch({type:TOGGLE_SIDEBAR})
  }

  const logoutUser= () =>{
    dispatch({type:LOGOUT_USER})
    removeUserFromLocalStorage()
  }

  //update user in the profile section
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN })
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser)

      const { user, location, token } = data

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      })
      addUserToLocalStorage({ user, location, token })
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        })
      }
    }
    clearAlert()
  }

  //jobs
  const handleChange = ({name, value}) =>{
    dispatch({type: HANDLE_CHANGE, payload:{name, value}})

  }

  const clearValues =() =>{
    dispatch({type: CLEAR_VALUES})
  }

  //CREATING JOBS
  const createJob = async()=>{
    dispatch({type: CREATE_JOB_BEGIN})
    try{
      const{position,company,jobLocation,status,jobType}= state
      await authFetch.post('/jobs',{
        position,
        company,
        jobLocation,
        status,
        jobType
      })
      dispatch({type: CREATE_JOB_SUCCESS})
      dispatch({type: CLEAR_VALUES})
    }catch(error){
      if(error.response.status === 401){
        return dispatch({type: CREATE_JOB_ERROR,
        payload: {msg: error.response.data.msg}})
      }
    }
    clearAlert()
  }

  //Get all the jobs

  const getJobs = async() =>{
    let url =`/jobs`
    dispatch({type: GET_JOBS_BEGIN})
    try{
      const {data} = await authFetch(url)
      const {jobs, totalJobs, numOfPages} = data
      dispatch({
        type:GET_JOBS_SUCCESS,
        payload:{
          jobs,
          totalJobs,
          numOfPages
        }
      })
    }catch(error){
      console.log(error.message);
      logoutUser()
    }
    clearAlert()
  }

  useEffect(()=>{
    getJobs()
  }, [])

  const setEditJob =(id) =>{
    dispatch({type:SET_EDIT_JOB, payload:{id}})
  }

  const deleteJob =(id) =>{
    console.log(`deletejob: ${id}`);
  }
  const editJob=()=>{
    console.log('edit job');
  }
  return(
    <AppContext.Provider
    value={{
      ...state,
      displayAlert,
      clearAlert,
      setupUser,
      toggleSidebar,
      logoutUser,
      updateUser,
      handleChange,
      clearValues,
      createJob,
      getJobs,
      setEditJob,
      editJob,
      deleteJob
    }}
    >
      {children}
    </AppContext.Provider>
  )
}
export const useAppContext = () =>{
  return useContext(AppContext)
}

export {AppProvider, initialState}