import axios from 'axios'
import router from '@/router/router.js'

const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})

// Add a request interceptor
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (config.url !== '/login') {
    config.headers.Authorization = window.localStorage.getItem('token')
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
http.interceptors.response.use(function (response) {
  // Do something with response data
  console.log(response)
  if (response.data.meta.status === 401) {
    router.push('/login')
  }
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default http
