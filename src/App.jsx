import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import VacationEntry from './components/VacationEntry'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <VacationEntry/>
    </>
  )
}

export default App
