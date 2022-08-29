const User = require('../models/User.js')
const { StatusCodes } = require('http-status-codes')
const {BadRequestError, UnAunthenticatedError} = require('../errors/index.js')
const { JsonWebTokenError } = require('jsonwebtoken')

const register = async (req, res) => {
  const {name, email, password} = req.body

  if(!name || !email || !password){
    throw new BadRequestError('Please provide all values')
  }

  //checking duplicate email////////////////////////////
  const userAlreadyExists = await User.findOne({ email })
  console.log(userAlreadyExists);

  if(userAlreadyExists){
    throw new BadRequestError('Email already in use!')
  }
  ///////////////////////////////////////////////////////
  const user  = await User.create({name, email, password})
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({
    user:{
      name: user.name,
      email: user.email,
      lastName: user.lastName,
      location: user.location,
    },
    token,
    location: user.location
    })
}

const login = async(req, res) =>{
  const {email, password}= req.body
  if(!email || !password){
    throw new BadRequestError('Please provide all values!')
  }
  const user = await User.findOne({email}).select('+password')
  if(!user){
    throw new UnAunthenticatedError('Invalid Credentials')
  }
  console.log(user);
  const isPasswordCorrect = await user.comparePassword(password)
  if(!isPasswordCorrect){
    throw new UnAunthenticatedError('Invalid Credentials')
  }
  const token = user.createJWT()
  user.password = undefined
  res.status(StatusCodes.OK).json({user, token, location: user.location})
}

const updateUser = async(req, res) =>{
  const{name, email, lastName, location} = req.body
  if(!email || !name || !lastName || !location){
    throw new BadRequestError('Please provide all values')
  }
  const user = await User.findOne({_id: req.user.userId})
  user.email = email
  user.name = name
  user.lastName = lastName
  user.location = location
  await user.save()
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({
    user,token,location:user.location
  })
}


module.exports = {
  register, login, updateUser
}