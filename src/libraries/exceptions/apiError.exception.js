const SystemErrors = require('../mappings/errors/system.errors');

/**
 * Custom Error to send as APIResponse
 * @extends Error
 */
class ApiError extends Error {
  /**
   * Constructor to create APIError
   * @param {string} message custom error message
   * @param {string} messageKey message key for the custom error
   * @param {number} statusCode http status code for the error
   * @param {any} meta additional meta param that can be anything
   */
  constructor(
    message = SystemErrors.UNKOWN_PROBLEM.message,
    messageKey = SystemErrors.UNKOWN_PROBLEM.key,
    statusCode = SystemErrors.UNKOWN_PROBLEM.statusCode
  ) {
    super(message);
    this.name = 'APIError';
    this.messageKey = messageKey;
    this.statusCode = statusCode;
    // capture current stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
