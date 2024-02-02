import './App.css'
import { AppContextProvider } from './context/store'
import { Routing } from './routing/routing'

function App() {

  return (
    <>
      <AppContextProvider>
        <Routing />
      </AppContextProvider>
    </>
  )
}

export default App
