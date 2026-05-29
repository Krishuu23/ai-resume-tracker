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

export const uploadResume = (file) => {
  const formData = new FormData()
  formData.append('resume', file)

  return API.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}