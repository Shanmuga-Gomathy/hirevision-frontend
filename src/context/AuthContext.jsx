import React, { createContext, useContext, useState, useEffect } from 'react'
import { apiService } from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Initialize auth state on app load
  useEffect(() => {
    initializeAuth()
  }, [])

  const initializeAuth = () => {
    try {
      const storedUser = localStorage.getItem('user')
      const accessToken = localStorage.getItem('accessToken')
      
      if (storedUser && accessToken) {
        const userData = JSON.parse(storedUser)
        setUser(userData)
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error('Error initializing auth:', error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    try {
      const response = await apiService.login(credentials)
      
      // Store tokens and user data
      localStorage.setItem('accessToken', response.accessToken)
      localStorage.setItem('refreshToken', response.refreshToken)
      
      const userData = {
        id: response.id,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        role: response.role
      }
      
      localStorage.setItem('user', JSON.stringify(userData))
      
      setUser(userData)
      setIsAuthenticated(true)
      
      return { success: true, message: 'Login successful' }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, message: error.message }
    }
  }

  const logout = () => {
    // Clear all stored data
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    
    setUser(null)
    setIsAuthenticated(false)
  }

  const refreshToken = async () => {
    try {
      const storedRefreshToken = localStorage.getItem('refreshToken')
      if (!storedRefreshToken) {
        throw new Error('No refresh token available')
      }

      const response = await apiService.refreshToken(storedRefreshToken)
      
      // Update stored tokens
      localStorage.setItem('accessToken', response.accessToken)
      localStorage.setItem('refreshToken', response.refreshToken)
      
      // Update user data if it changed
      const userData = {
        id: response.id,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        role: response.role
      }
      
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      
      return { success: true }
    } catch (error) {
      console.error('Token refresh error:', error)
      logout()
      return { success: false, message: error.message }
    }
  }

  const checkAuthStatus = () => {
    const accessToken = localStorage.getItem('accessToken')
    const userData = localStorage.getItem('user')
    
    if (!accessToken || !userData) {
      logout()
      return false
    }
    
    return true
  }

  const getUserRole = () => {
    return user?.role || null
  }

  const isUser = () => {
    return getUserRole() === 'USER'
  }

  const isRecruiter = () => {
    return getUserRole() === 'RECRUITER'
  }

  const isAdmin = () => {
    return getUserRole() === 'ADMIN'
  }

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    refreshToken,
    checkAuthStatus,
    getUserRole,
    isUser,
    isRecruiter,
    isAdmin
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext 