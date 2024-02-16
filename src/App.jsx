// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Piano from './Piano'
import ChordsView from './ChordsView'
import AppHeader from './AppHeader'
import './App.css'
import { enableMIDI } from './midi.js'
import { initializeWakeLock } from './wakelock.js'

enableMIDI()
initializeWakeLock()


function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col h-screen w-screen">
      <header className="">
        <AppHeader></AppHeader>
      </header>  
      <main className="flex-grow flex items-center justify-center">
        <ChordsView></ChordsView>
      </main>
      <footer className="">
        <Piano></Piano>
      </footer>
    </div>
  )
}

export default App
