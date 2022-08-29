const { UnAunthenticatedError } = require("../errors/index.js");
const jwt = require('jsonwebtoken')
const auth = async(req,res, next) =>{
  const authHeader = req.headers.authorization
  if(!authHeader || !authHeader.startsWith('Bearer')){
    throw new UnAunthenticatedError('authenticated error')
  }
  const token = authHeader.split(' ')[1]
  try{
    const payload= jwt.verify(token, process.env.JWT_SECRET)
    console.log(payload);
    req.user = {userId: payload.userId}
    // req.user = payload
    next()
  }catch(error){
    throw new UnAunthenticatedError('authenticated error')

  }
}
module.exports = auth