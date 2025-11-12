import { useState } from 'react'
import { useUsersQuery } from '../../queries/useUsersQuery'

const Users = () => {
  const [skip, setSkip] = useState(0)
  const { data } = useUsersQuery(10, skip)

  const handleNext = () => {
    setSkip((prev) => prev + 10)
  }

  const handlePrevious = () => {
    if (skip === 0) return
    setSkip((prev) => prev - 10)
  }

  return (
    <div className='w-full p-4'>
      <h1 className='text-4xl font-black'>Users Admin</h1>

      <div className='flex flex-col gap-4'>
        <div className='flex justify-end'>Search Bar</div>
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
              {data?.users.map((user) => (
                <tr key={user.id}>
                  <td className='p-2'>{user.id}</td>
                  <td className='p-2'>{user.username}</td>
                  <td className='p-2'>{user.firstName}</td>
                  <td className='p-2'>{user.lastName}</td>
                  <td className='p-2'>{user.age}</td>
                  <td className='p-2'>{user.gender}</td>
                  <td className='p-2'>{user.email}</td>
                  <td className='p-2'>{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='flex justify-between'>
          <button
            className='border p-2 min-w-36 rounded-md cursor-pointer'
            onClick={handlePrevious}
          >
            Previous
          </button>
          <button
            className='border p-2 min-w-36 rounded-md cursor-pointer'
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Users
