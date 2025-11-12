import {
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

import Users from './components/Users'

const queryClient = new QueryClient()

function App() {
  const { reset } = useQueryErrorResetBoundary()
  return (
    <QueryClientProvider client={queryClient}>
      <div className='container mx-auto'>
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <div className="flex flex-col items-center justify-center h-screen gap-4">
              <p>Something went wrong.</p>
              <button
                className='border p-2 min-w-36 rounded-md cursor-pointer hover:bg-gray-200'
                onClick={resetErrorBoundary}
              >
                Try Again!
              </button>
            </div>
          )}
        >
          <Users />
        </ErrorBoundary>
      </div>
    </QueryClientProvider>
  )
}

export default App
