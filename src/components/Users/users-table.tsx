import { type User } from '../../api/users'
import EmptyState from '../EmptyState'
import Loader from '../Loader'

type Props = {
  users: User[]
  onSelectUser: (id: number) => void
  onNext: () => void
  onPrevious: () => void
  total: number
  isLoading: boolean
}

const UsersTable = ({
  users,
  onSelectUser,
  onNext,
  onPrevious,
  total,
  isLoading,
}: Props) => {
  return (
    <>
      <div className='border rounded-md'>
        <table className='w-full'>
          <thead>
            <tr className='border-b-2 border-b-black'>
              <th className='p-2'>Id</th>
              <th className='p-2'>Username</th>
              <th className='p-2'>First Name</th>
              <th className='p-2'>Last name</th>
              <th className='p-2'>Age</th>
              <th className='p-2'>Gender</th>
              <th className='p-2'>Email</th>
              <th className='p-2'>Phone</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className='p-4'>
                  <Loader />
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className='cursor-pointer hover:bg-gray-100'
                  onClick={() => {
                    onSelectUser(user.id)
                  }}
                >
                  <td className='p-2'>{user.id}</td>
                  <td className='p-2'>{user.username}</td>
                  <td className='p-2'>{user.firstName}</td>
                  <td className='p-2'>{user.lastName}</td>
                  <td className='p-2'>{user.age}</td>
                  <td className='p-2'>{user.gender}</td>
                  <td className='p-2'>{user.email}</td>
                  <td className='p-2'>{user.phone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className='p-4'>
                  <EmptyState />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {total > 10 && (
        <div className='flex justify-between'>
          <button
            className='border p-2 min-w-36 rounded-md cursor-pointer hover:bg-gray-200'
            onClick={onPrevious}
          >
            Previous
          </button>
          <button
            className='border p-2 min-w-36 rounded-md cursor-pointer hover:bg-gray-200'
            onClick={onNext}
          >
            Next
          </button>
        </div>
      )}
    </>
  )
}

export default UsersTable
