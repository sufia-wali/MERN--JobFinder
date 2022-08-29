const Job = require('../models/Job.js')
const {StatusCodes} = require('http-status-codes')
const { BadRequestError, NotFoundError} = require('../errors/index.js')
const checkPermissions = require('../utils/checkPermissions.js')
const { default: JobsContainer } = require('../client/src/components/JobsContainer.js')

const createJob = async (req,res) => {
  const {company, position} = req.body
  if(!position || !company){
    throw new BadRequestError('Please Provide all values')
  }
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({job})
}

const getAllJobs = async (req,res) => {
  const jobs = await Job.find({createdBy: req.user.userId})
  res.status(StatusCodes.OK).json({
    jobs, totalJobs: jobs.length, numOfPages: 1
  })
}

const updateJob = async (req,res) => {
  const {id: jobId} = req.params
  const {company, position, status} = req.body
  if(!company || !position){
    throw new BadRequestError('Please Provide All Values')
  }
  const job = await Job.findOne({_id: jobId})
  if(!job){
    throw new NotFoundError(`No Job with id ${jobId}`)
  }
  // const updatedJob = await Job.findOneAndUpdate({_id: jobId}, req.body,{
  //   new: true,
  //   runValidators: true
  // })
  checkPermissions(req.user, job.createdBy)
  job.position = position
  job.company = company
  job.jobLocation= jobLocation
  await job.save()
  res.status(StatusCodes.OK).json({job})
}

const deleteJob = async (req,res) => {
  const{id:jobId} = req.params
  const job = await Job.findOne({_id: jobId})
  if(!job){
    throw new CustomError.NotFoundError(`No job with id: ${jobId}`)
  }
  checkPermissions(req.user, job.createdBy)
  await job.remove()
  res.status(StatusCodes.OK).json({msg: "success! job removed"})
}


const showStats = async (req,res) => {
  res.send('show stats')
}




module.exports = {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats
}