import { useState } from 'react'
import {RutesHeader} from "./routing/rutesHeader"; 

function App() {
  const [count, setCount] = useState(0)

  return (
      <RutesHeader />
  )
}

export default App
