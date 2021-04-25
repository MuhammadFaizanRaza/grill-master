const httpStatus = require('http-status');

/**
 * Response Handler to send response in case of request success
 * Using this handler ensures that system has consistent response pattern
 * @param {object} res express response object
 * @param {string} messageKey  messageKey for request response
 * @param {string} message  message for request response
 * @param {object} data response data for request if available
 * @param {string} statusCode status code for request if available
 */
module.exports = (
  res,
  messageKey,
  message,
  data = {},
  statusCode = httpStatus.OK
) => {
  res.status(statusCode).json({
    status: true,
    statusCode: statusCode,
    messageKey: messageKey,
    message: message,
    data,
  });
};
