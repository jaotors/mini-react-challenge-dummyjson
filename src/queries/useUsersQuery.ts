import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '../api/users'

export const useUsersQuery = (limit = 10, skip = 0) => {
  return useQuery({
    queryKey: ['users', { limit, skip }],
    queryFn: fetchUsers,
  })
}
