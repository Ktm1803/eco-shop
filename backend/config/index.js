import dotenv from "dotenv"
import crypto from "crypto"

// Load environment variables from .env file
dotenv.config()

// Generate a random JWT secret if not provided
const generateJwtSecret = () => {
  return crypto.randomBytes(32).toString("hex")
}

// Configuration object with defaults
const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongodbUri: process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce",
  jwtSecret: process.env.JWT_SECRET || generateJwtSecret(),
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
  apiUrl: process.env.API_URL || "http://localhost:5000/api",

  // Add other configuration variables as needed
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  },
}

export default config

