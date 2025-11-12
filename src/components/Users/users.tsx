import React, { useMemo, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'
import { useUsersQuery, useUsersSearchQuery } from '../../queries/useUsersQuery'
import Dialog from '../Dialog'
import UserDialog from './user-dialog'

const Users = () => {
  const [skip, setSkip] = useState(0)
  const [genderValue, setGenderValue] = useState(0)
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<number>(-1)
  const [debounceQueryValue, setDebounceQueryValue] = useDebounceValue('', 500)

  const { data: usersData } = useUsersQuery(10, skip)
  const { data: usersSearchData } = useUsersSearchQuery(
    10,
    debounceQueryValue ? 0 : skip,
    debounceQueryValue
  )

  const data = debounceQueryValue ? usersSearchData : usersData
  const users = useMemo(() => {
    return (
      data?.users.filter((user) => {
        if (genderValue === 0) return true
        if (genderValue === 1) return user.gender === 'male'
        if (genderValue === 2) return user.gender === 'female'
      }) || []
    )
  }, [data, genderValue])

  const handleNext = () => {
    setSkip((prev) => prev + 10)
  }

  const handlePrevious = () => {
    if (skip === 0) return
    setSkip((prev) => prev - 10)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setDebounceQueryValue(value)
  }

  const handleGenderFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value
    setGenderValue(parseInt(value, 10))
  }

  const handleSelectUser = (id: number) => {
    setSelectedUserId(id)
    setOpenDialog(true)
  }

  return (
    <div className='w-full p-4'>
      <h1 className='text-4xl font-black'>Users Admin</h1>

      <div className='flex flex-col gap-4'>
        <div className='flex justify-end'>
          <input
            className='border p-2 rounded-md'
            type='text'
            onChange={handleSearchChange}
            placeholder='Search user...'
          />
        </div>
        <div className='flex justify-end'>
          <select
            onChange={handleGenderFilterChange}
            value={genderValue}
            className='border p-2 rounded-md'
          >
            <option value={0}>All</option>
            <option value={1}>Male</option>
            <option value={2}>Female</option>
          </select>
        </div>
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
              {users.map((user) => (
                <tr
                  key={user.id}
                  className='cursor-pointer hover:bg-gray-100'
                  onClick={() => {
                    handleSelectUser(user.id)
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
              ))}
            </tbody>
          </table>
        </div>
        {data && data.total > 10 && (
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
        )}
      </div>
      <UserDialog
        open={openDialog}
        closeDialog={() => setOpenDialog(false)}
        id={selectedUserId}
      />
    </div>
  )
}

export default Users
