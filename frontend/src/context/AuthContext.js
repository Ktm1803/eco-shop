"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { authAPI } from "../services/api"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem("token")
        if (token) {
          const { data } = await authAPI.getProfile()
          setUser(data.user)
        }
      } catch (error) {
        localStorage.removeItem("token")
        console.error("Authentication error:", error)
      } finally {
        setLoading(false)
      }
    }

    checkLoggedIn()
  }, [])

  // Login function
  const login = async (credentials) => {
    try {
      setError(null)
      const { data } = await authAPI.login(credentials)
      localStorage.setItem("token", data.token)
      setUser(data.user)
      return data
    } catch (error) {
      setError(error.response?.data?.message || "Login failed")
      throw error
    }
  }

  // Register function
  const register = async (userData) => {
    try {
      setError(null)
      const { data } = await authAPI.register(userData)
      localStorage.setItem("token", data.token)
      setUser(data.user)
      return data
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed")
      throw error
    }
  }

  // Logout function
  const logout = async () => {
    try {
      await authAPI.logout()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      localStorage.removeItem("token")
      setUser(null)
    }
  }

  // Update profile function
  const updateProfile = async (userData) => {
    try {
      setError(null)
      const { data } = await authAPI.updateProfile(userData)
      setUser(data.user)
      return data
    } catch (error) {
      setError(error.response?.data?.message || "Profile update failed")
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

