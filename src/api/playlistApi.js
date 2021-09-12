import { ApiClient } from '@/api/ApiClient.js'

export const playlistApi = {
  async get () {
    const { data } = await ApiClient.get('playlist')
    return data
  }
}
