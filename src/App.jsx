import { useState } from 'react'
import './App.css'
import Tiptap from './components/tiptap'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="card">
        <Tiptap />
      </div>
    </>
  )
}

export default App
