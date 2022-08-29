import React,{useState} from "react"
import { FormRow, Alert } from "../../components"
import { useAppContext } from "../../context/appContext"
import Wrapper from "../../assets/wrappers/DashboardFormPage"
import FormRowSelect from "../../components/FormRowSelect"

const AddJob = () =>{
  const {isLoading,position, company, jobLocation,jobTypeOptions,jobType, status, statusOptions, isEditing, showAlert, displayAlert, handleChange, clearValues, createJob, editJob} = useAppContext()

  const handleJobInput =(e)=>{
    // e.preventDefault()
    const name= e.target.name;
    const value = e.target.value
    handleChange({
      name,
      value
    })
   console.log(`${name}: ${value}`);

  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(!position || !company || !jobLocation){
      displayAlert()
      return
    }
    if(isEditing){
      editJob()
      return
    }
    createJob()
  }
  return(
    <Wrapper>
      <form className="form">
        <h3>{isEditing? 'edit job': 'Add job'}</h3>
        {showAlert && <Alert/>}
        <div className="form-center">
          <FormRow
          type="text"
          name='position'
          value={position}
          handleChange={handleJobInput}
          />
           <FormRow
          type="text"
          name='company'
          value={company}
          handleChange={handleJobInput}
          />
           <FormRow
          type="text"
          labelText='location'
          name='jobLocation'
          value={jobLocation}
          handleChange={handleJobInput}
          />

          <FormRowSelect
          name='status'
          value={status}
          list={statusOptions}
          handleChange={handleJobInput}
          />
           <FormRowSelect
           labelText='type'
          name='jobtype'
          value={jobType}
          list={jobTypeOptions}
          handleChange={handleJobInput}
          />

          <div className="btn-container">
            <button className="btn btn-block clear-btn" onClick={(e)=>{
              e.preventDefault();
              clearValues()
            }}>clear
            </button>

            <button
            className="btn btn-block submit-btn"
            type="submit"
            onClick ={handleSubmit}
            disabled={isLoading}
            >submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob