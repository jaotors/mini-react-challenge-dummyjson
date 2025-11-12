import React, { useMemo, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'
import { useUsersQuery, useUsersSearchQuery } from '../../queries/useUsersQuery'
import UserDialog from './user-dialog'
import UsersTable from './users-table'

const Users = () => {
  const [skip, setSkip] = useState(0)
  const [genderValue, setGenderValue] = useState(0)
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<number>(-1)
  const [debounceQueryValue, setDebounceQueryValue] = useDebounceValue('', 500)

  const { data: usersData, isLoading: userDataLoading } = useUsersQuery(10, skip)
  const { data: usersSearchData, isLoading: usersSearchLoading } = useUsersSearchQuery(
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
        <div className='flex gap-4 justify-end items-center'>
          <div className='flex items-center gap-2'>
            Filtered By:
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
          <div className='flex'>
            <input
              className='border p-2 rounded-md'
              type='text'
              onChange={handleSearchChange}
              placeholder='Search user...'
            />
          </div>
        </div>
        <UsersTable
          isLoading={userDataLoading || usersSearchLoading}
          users={users}
          onSelectUser={handleSelectUser}
          onNext={handleNext}
          onPrevious={handlePrevious}
          total={data?.total || 0}
        />
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
