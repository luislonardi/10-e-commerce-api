const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

class BadRequestError extends CustomAPIError {
  constructor(message) {
    super();
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.message=message
  }
}

module.exports = BadRequestError;
