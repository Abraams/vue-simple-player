import axios from 'axios'

export const ApiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL + '/api/'
})
