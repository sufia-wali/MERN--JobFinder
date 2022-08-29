const {unAuthenticatedError} = require('../errors/index.js')


const checkPermissions =(requestUser, resourceUserId)=>{
  if(requestUser.userId === resourceUserId.toString())
  {
    return
  }
  throw new CustomError.unAuthenticatedError('Not authorized to access this route')

}

module.exports = checkPermissions