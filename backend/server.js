import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import { fileURLToPath } from "url"
import path from "path"
import morgan from "morgan"
import config from "./config/index.js"

// Import routes
import authRoutes from "./routes/auth.routes.js"
import productRoutes from "./routes/product.routes.js"
import cartRoutes from "./routes/cart.routes.js"
import orderRoutes from "./routes/order.routes.js"
import wishlistRoutes from "./routes/wishlist.routes.js"
import userRoutes from "./routes/user.routes.js"
import adminRoutes from "./routes/admin.routes.js"
import { errorHandler } from "./middleware/errorHandler.js"

// Initialize Express app
const app = express()

// Middleware
app.use(
  cors({
    origin: config.frontendUrl,
    credentials: true,
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan("dev"))

// Set up static files directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// API routes
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/wishlist", wishlistRoutes)
app.use("/api/users", userRoutes)
app.use("/api/admin", adminRoutes)

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is running",
    config: {
      port: config.port,
      environment: config.nodeEnv,
      frontendUrl: config.frontendUrl,
    },
  })
})

// Error handling middleware
app.use(errorHandler)

// Connect to MongoDB and start server
mongoose
  .connect(config.mongodbUri)
  .then(() => {
    console.log("Connected to MongoDB")
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`)
      console.log(`Frontend URL: ${config.frontendUrl}`)
      console.log(`API URL: ${config.apiUrl}`)
      console.log(`Environment: ${config.nodeEnv}`)
    })
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error)
    process.exit(1)
  })

