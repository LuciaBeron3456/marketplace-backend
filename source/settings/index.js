const env = process.env.NODE_ENV || 'dev'

require('dotenv').config()

const settings = {
  env,
  isProd: process.env.NODE_ENV === 'production',
  isDev: process.env.NODE_ENV === 'development',

  publicUrl: process.env.PUBLIC_URL,
  port: process.env.PORT,

  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,

  jwtSecret: process.env.JWT_SECRET,

  gatewayTokenApiUrl: process.env.GATEWAY_TOKEN_API_URL,
  gatewayApiUrl: process.env.GATEWAY_API_URL,
  gatewayGrant: process.env.GATEWAY_GRANT,
  gatewayClient: process.env.GATEWAY_CLIENT,
  gatewayUsername: process.env.GATEWAY_USERNAME,
  gatewayPassword: process.env.GATEWAY_PASSWORD,

  nodemailerSmtpEmail: process.env.NODEMAILER_SMTP_EMAIL,
  nodemailerSmtpPassword: process.env.NODEMAILER_SMTP_PASSWORD,
  nodemailerSmtpHost: process.env.NODEMAILER_SMTP_HOST,
  nodemailerSmtpPort: process.env.NODEMAILER_SMTP_PORT,
  nodemailerSmtpAdminEmail: process.env.NODEMAILER_SMTP_ADMIN_EMAIL,
  nodemailerSmtpAdminPassword: process.env.NODEMAILER_SMTP_ADMIN_PASSWORD,

  googleCloudStorageBucket: process.env.GOOGLE_CLOUD_STORAGE_BUCKET,
  googleCloudStorageBucketFiles: process.env.GOOGLE_CLOUD_STORAGE_BUCKET_FILES,
  googleCloudProjectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  googleCloudClientEmail: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
  googleCloudPrivateKey: process.env.GOOGLE_CLOUD_PRIVATE_KEY,

  azureClientID: process.env.AZURE_CLIENT_ID,
  azureClientSecret: process.env.AZURE_CLIENT_SECRET,
  azureCallbackURL: process.env.AZURE_CALLBACK_URL,
  azureAuthorizationURL: process.env.AZURE_AUTHORIZATION_URL,
  azureTokenURL: process.env.AZURE_TOKEN_URL,
  azureWindow: process.env.AZURE_WINDOW,

  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleCallbackURL: process.env.GOOGLE_CALLBACK_URL
}

module.exports = { settings }
