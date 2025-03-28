import fs from "fs"
import { fileURLToPath } from "url"
import path from "path"

// Get directory name
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Default environment variables
const defaultEnv = {
  NEXT_PUBLIC_API_URL: "http://localhost:5000/api",
}

// Create .env.local file content
const envContent = Object.entries(defaultEnv)
  .map(([key, value]) => `${key}=${value}`)
  .join("\n")

// Write to .env.local file
fs.writeFileSync(path.join(__dirname, ".env.local"), envContent)

console.log("Local environment setup complete!")
console.log("Created .env.local file with the following variables:")
console.log(envContent)
console.log("\nYou can modify these values in the .env.local file if needed.")

