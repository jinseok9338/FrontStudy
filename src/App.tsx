import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import TodoList from "./components/layout/TodoList"

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="my-6 max-w-lg mx-auto text-center">
        <TodoList />
      </div>
    </QueryClientProvider>
  )
}

export default App
