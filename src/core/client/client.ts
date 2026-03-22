import { BASE_URL } from './constants'
import type { Message } from './types'

const TOKEN = import.meta.env.VITE_API_TOKEN || 'super-secret-doodle-token'

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`

  const headers = {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
    ...options.headers,
  }

  const res = await fetch(url, { ...options, headers })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw {
      status: res.status,
      ...errorData,
    }
  }
  return res.json()
}

export const getMessages = (queryParam?: string) => {
  const queryString = queryParam ? `?${queryParam}` : ''
  return apiRequest<Message[]>(`/api/v1/messages${queryString}`)
}

export const sendMessage = (message: string, author: string) => {
  return apiRequest<Message>('/api/v1/messages', {
    method: 'POST',
    body: JSON.stringify({ message, author }),
  })
}
