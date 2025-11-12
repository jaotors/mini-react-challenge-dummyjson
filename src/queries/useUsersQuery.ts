import { useQuery } from '@tanstack/react-query'
import { fetchUsers, searchUsers, fetchUserById } from '../api/users'

export const useUsersQuery = (limit = 10, skip = 0) => {
  return useQuery({
    queryKey: ['users', { limit, skip }],
    queryFn: fetchUsers,
  })
}

export const useUsersSearchQuery = (limit = 10, skip = 0, query = '') => {
  return useQuery({
    queryKey: ['users', { limit, skip, query }],
    queryFn: searchUsers,
    enabled: query !== '',
  })
}

export const useUserQuery = (id: number) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: fetchUserById,
    enabled: id > -1,
  })
}
