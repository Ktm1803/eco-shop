"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

// Define user type
export type User = {
  id: string
  name: string
  email: string
  role: "user" | "admin"
}

// Define auth context type
type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (name: string, email: string, password: string) => Promise<boolean>
  loginWithGoogle: () => Promise<boolean>
  loginWithFacebook: () => Promise<boolean>
  isLoading: boolean
  isAdmin: boolean
  checkAuth: () => boolean
  checkAdminAuth: () => boolean
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demo
const MOCK_USERS = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "user" as const,
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin" as const,
  },
]

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Ensure client-side only rendering and avoid hydration errors
  useEffect(() => {
    // Mark component as mounted
    setMounted(true)

    // Check authentication from localStorage - only when mounted
    if (typeof window !== "undefined") {
      try {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
      }
    }

    // Mark loading as complete
    setIsLoading(false)
  }, [])

  // Check if user is authenticated
  const checkAuth = () => {
    if (!user) {
      return false
    }
    return true
  }

  // Check if user is admin
  const checkAdminAuth = () => {
    if (!user || user.role !== "admin") {
      return false
    }
    return true
  }

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Find user
      const foundUser = MOCK_USERS.find((u) => u.email === email && u.password === password)

      if (foundUser) {
        // Create user object without password
        const { password: _, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)

        // Store in localStorage
        localStorage.setItem("user", JSON.stringify(userWithoutPassword))

        toast({
          title: "Login successful",
          description: `Welcome back, ${userWithoutPassword.name}!`,
        })

        return true
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password",
        })
        return false
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An error occurred during login",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Login with Google function
  const loginWithGoogle = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Create mock user for demo - always regular user, never admin
      const googleUser = {
        id: `google-${Date.now()}`,
        name: "Google User",
        email: "user@gmail.com",
        role: "user" as const, // Ensure social login can't create admin accounts
      }

      setUser(googleUser)

      // Store in localStorage
      localStorage.setItem("user", JSON.stringify(googleUser))

      toast({
        title: "Google login successful",
        description: `Welcome, ${googleUser.name}!`,
      })

      return true
    } catch (error) {
      console.error("Google login error:", error)
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An error occurred during Google login",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Login with Facebook function
  const loginWithFacebook = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Create mock user for demo - always regular user, never admin
      const facebookUser = {
        id: `facebook-${Date.now()}`,
        name: "Facebook User",
        email: "user@facebook.com",
        role: "user" as const, // Ensure social login can't create admin accounts
      }

      setUser(facebookUser)

      // Store in localStorage
      localStorage.setItem("user", JSON.stringify(facebookUser))

      toast({
        title: "Facebook login successful",
        description: `Welcome, ${facebookUser.name}!`,
      })

      return true
    } catch (error) {
      console.error("Facebook login error:", error)
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An error occurred during Facebook login",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    try {
      localStorage.removeItem("user")
    } catch (error) {
      console.error("Error during logout:", error)
    }
    router.push("/")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    })
  }

  // Register function - always creates regular users, never admins
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if user already exists
      if (MOCK_USERS.some((u) => u.email === email)) {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: "Email already in use",
        })
        return false
      }

      // Create new user - always as regular user, never admin
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: "user" as const, // Ensure registration can't create admin accounts
      }

      setUser(newUser)

      // Store in localStorage
      localStorage.setItem("user", JSON.stringify(newUser))

      toast({
        title: "Registration successful",
        description: "Your account has been created",
      })

      return true
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "An error occurred during registration",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Check if user is admin
  const isAdmin = user?.role === "admin"

  // Modify the context value
  const value = {
    user: mounted ? user : null,
    login,
    logout,
    register,
    loginWithGoogle,
    loginWithFacebook,
    isLoading,
    isAdmin: mounted ? isAdmin : false,
    checkAuth,
    checkAdminAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook for using auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

