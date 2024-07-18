import './App.css'
import { AppContextProvider } from './context/store'
import { Routing } from './routing/routing'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <AppContextProvider>
        <Routing />
      </AppContextProvider>
      <ToastContainer position="top-center" autoClose={1500} />
    </>
  )
}

export default App
