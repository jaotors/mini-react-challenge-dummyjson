import { useQuery } from '@tanstack/react-query'
import { searchUsers } from '../api/users'

export const useUsersSearchQuery = (limit = 10, skip = 0, query = '') => {
  return useQuery({
    queryKey: ['users', { limit, skip, query }],
    queryFn: searchUsers,
    enabled: query !== '',
  })
}
