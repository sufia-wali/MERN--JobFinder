const { StatusCodes } = require('http-status-codes')
const  CustomAPIError = require("./custome-api")

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

class UnAunthenticatedError extends CustomAPIError{
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
  UnAunthenticatedError
}