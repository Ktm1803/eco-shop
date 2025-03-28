import axios from "axios"

// Create axios instance with base URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookies/authentication
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle authentication errors
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// Auth API calls
export const authAPI = {
  register: (userData) => api.post("/auth/register", userData),
  login: (credentials) => api.post("/auth/login", credentials),
  logout: () => api.get("/auth/logout"),
  getProfile: () => api.get("/auth/me"),
  updateProfile: (userData) => api.put("/auth/updateprofile", userData),
  updatePassword: (passwordData) => api.put("/auth/updatepassword", passwordData),
}

// Product API calls
export const productAPI = {
  getProducts: (params) => api.get("/products", { params }),
  getProduct: (id) => api.get(`/products/${id}`),
  getCategories: () => api.get("/products/categories"),
  getBrands: () => api.get("/products/brands"),
}

// Cart API calls
export const cartAPI = {
  getCart: () => api.get("/cart"),
  addToCart: (productData) => api.post("/cart", productData),
  updateCartItem: (itemId, quantity) => api.put(`/cart/${itemId}`, { quantity }),
  removeCartItem: (itemId) => api.delete(`/cart/${itemId}`),
  clearCart: () => api.delete("/cart"),
}

// Order API calls
export const orderAPI = {
  createOrder: (orderData) => api.post("/orders", orderData),
  getOrders: () => api.get("/orders"),
  getOrder: (id) => api.get(`/orders/${id}`),
  payOrder: (id, paymentResult) => api.put(`/orders/${id}/pay`, paymentResult),
  cancelOrder: (id) => api.put(`/orders/${id}/cancel`),
}

// Wishlist API calls
export const wishlistAPI = {
  getWishlist: () => api.get("/wishlist"),
  addToWishlist: (productId) => api.post("/wishlist", { productId }),
  removeFromWishlist: (productId) => api.delete(`/wishlist/${productId}`),
  clearWishlist: () => api.delete("/wishlist"),
  checkWishlist: (productId) => api.get(`/wishlist/check/${productId}`),
}

export default api

