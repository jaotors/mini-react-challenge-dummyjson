const BASE_URL = 'https://dummyjson.com'

type User = {
  id: number
  firstName: string
  lastName: string
  maidenName?: string
  age: number
  gender: 'male' | 'female'
  email: string
  phone: string
  username: string
  image?: string
  company?: {
    name: string
    department: string
    title: string
  }
  address?: {
    address: string
    city: string
    state: string
    postalCode: string
  }
}

export const fetchUsers = async ({
  queryKey,
}: {
  queryKey: [string, { limit: number; skip: number }]
}): Promise<{ limit: number; skip: number; users: User[]; total: number }> => {
  const [_key, { limit, skip }] = queryKey
  return fetch(`${BASE_URL}/users?limit=${limit}&skip=${skip}`).then((res) =>
    res.json()
  )
}

export const searchUsers = async ({
  queryKey,
}: {
  queryKey: [string, { limit: number; skip: number; query: string }]
}): Promise<{ limit: number; skip: number; users: User[]; total: number }> => {
  const [_key, { limit, skip, query }] = queryKey
  return fetch(
    `${BASE_URL}/users/search?q=${query}&limit=${limit}&skip=${skip}`
  ).then((res) => res.json())
}

export const fetchUserById = async ({
  queryKey,
}: {
  queryKey: [string, number]
}): Promise<User> => {
  const [_key, id] = queryKey
  return fetch(`${BASE_URL}/users/${id}`).then((res) => res.json())
}
