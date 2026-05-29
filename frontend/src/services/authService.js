import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const registerUser = (formData) => {
  return API.post('/auth/register', formData)
}

export const loginUser = (formData) => {
  return API.post('/auth/login', formData)
}