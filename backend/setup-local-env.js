import fs from "fs"
import crypto from "crypto"
import { fileURLToPath } from "url"
import path from "path"

// Get directory name
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Generate a random JWT secret
const generateJwtSecret = () => {
  return crypto.randomBytes(32).toString("hex")
}

// Default environment variables
const defaultEnv = {
  PORT: 5000,
  NODE_ENV: "development",
  MONGODB_URI: "mongodb://localhost:27017/ecommerce",
  JWT_SECRET: generateJwtSecret(),
  FRONTEND_URL: "http://localhost:3000",
  API_URL: "http://localhost:5000/api",
}

// Create .env file content
const envContent = Object.entries(defaultEnv)
  .map(([key, value]) => `${key}=${value}`)
  .join("\n")

// Write to .env file
fs.writeFileSync(path.join(__dirname, ".env"), envContent)

console.log("Local environment setup complete!")
console.log("Created .env file with the following variables:")
console.log(envContent)
console.log("\nYou can modify these values in the .env file if needed.")

