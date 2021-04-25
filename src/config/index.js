const path = require('path');
const Joi = require('@hapi/joi');
const dotEnv = require('dotenv');

// Validate NODE_ENV first, only specified NODE_ENV allowed
const { error: envError, value } = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
})
  .required()
  .validate(process.env, { allowUnknown: true });

if (envError) {
  throw new Error(`Environment Validation Error: ${envError.message}`);
}

// read and configure env file according to provided NODE_ENV
const envFilePath = path.resolve(
  __dirname,
  '..',
  '..',
  `.env.${value.NODE_ENV}`
);
const envConfig = dotEnv.config({ path: envFilePath });
if (envConfig.error) {
  throw new Error(`Environment Configuration File Error: ${envConfig.error}`);
}

// validate all env variables in configuration
const { error: envConfigError, value: envVars } = Joi.object({
  // since it is already validated
  NODE_ENV: Joi.string().default(value.NODE_ENV),
  PORT: Joi.number().default(4000),
})
  .required()
  .validate(process.env, { allowUnknown: true });

if (envConfigError) {
  throw new Error(`Environment Configuration Error: ${envConfigError.message}`);
}

/**
 * module mounting configuration
 * unmount: if you dont want to mount a module with API, add it unmount
 * deauth: if a modules API does not required authentication, add it in deauth
 * NOTE: if a module has a mix of auth and deauth API,
 * add it in deauth and add auth in its each individual route where required
 */
const moduleConfiguration = {
  unmount: [],
  deauth: [],
};
// Export all configuration
const finalConfiguration = {
  ENV: envVars.NODE_ENV,
  PORT: envVars.PORT,
  MODULE_CONFIGURATION: moduleConfiguration,
};

module.exports = finalConfiguration;
