import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Users from './components/Users'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='container mx-auto'>
        <Users />
      </div>
    </QueryClientProvider>
  )
}

export default App
