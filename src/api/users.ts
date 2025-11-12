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
}): Promise<{ limit: number; skip: number; users: User[] }> => {
  const [_key, { limit, skip }] = queryKey
  return fetch(`${BASE_URL}/users?limit=${limit}&skip=${skip}`).then((res) =>
    res.json()
  )
}
