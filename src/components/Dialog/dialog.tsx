import { useEffect, useRef } from 'react'

const Dialog = ({
  open = false,
  children,
  closeDialog = () => {},
}: {
  open: boolean
  children: React.ReactNode
  closeDialog?: () => void
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (dialogRef.current) {
      if (open) {
        dialogRef.current.showModal()
      } else {
        dialogRef.current.close()
      }
    }
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      onCancel={closeDialog}
      className='fixed top-1/2 left-1/2 -translate-1/2'
    >
      <div className='w-100 p-4'>
        <div className='flex justify-end'>
          <button className='flex items-center justify-center w-10 h-10'>X</button>
        </div>
        {children}
      </div>
    </dialog>
  )
}

export default Dialog
