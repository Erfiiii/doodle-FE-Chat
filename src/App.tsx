import { Chat } from './chat'
import { AuthGuard } from './core/auth/AuthGuard'

function App() {
  return (
    <AuthGuard>
      <Chat />
    </AuthGuard>
  )
}

export default App
