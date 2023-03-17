import { Outlet } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'

function App() {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  )
}

export default App
