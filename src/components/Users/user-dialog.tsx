import Dialog from '../Dialog'
import { useUserQuery } from '../../queries/useUsersQuery'

const UserDialog = ({
  id,
  open,
  closeDialog = () => {},
}: {
  id: number
  open: boolean
  closeDialog: () => void
}) => {
  const { data } = useUserQuery(id)

  return (
    <Dialog open={open} closeDialog={closeDialog}>
      <ul className='flex flex-col gap-4'>
        <li className='flex gap-2'>
          <span className='font-bold'>Name: </span>
          <span>
            {data?.firstName} {data?.lastName}
          </span>
        </li>
        <li className='flex gap-4'>
          <span className='font-bold'>Email: </span>
          <span>{data?.email}</span>
        </li>
        <li className='flex gap-4'>
          <span className='font-bold'>Phone: </span>
          <span>{data?.phone}</span>
        </li>
        <li className='flex gap-4'>
          <span className='font-bold'>Company: </span>
          <span>{data?.company?.name}</span>
        </li>
        <li className='flex gap-4'>
          <span className='font-bold'>Address: </span>
          <span>{data?.address?.address}</span>
        </li>
      </ul>
    </Dialog>
  )
}

export default UserDialog
