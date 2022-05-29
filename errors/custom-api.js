class CustomAPIError extends Error {
  constructor(message,statusCode) {
    super()
    message=message,
    statusCode=statusCode
  }
}

module.exports = CustomAPIError
