// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Piano from './Piano'
import ChordsView from './ChordsView'
// import AppHeader from './AppHeader'
import AppHeader from './AppHeader2'
import './App.css'
import { enableMIDI } from './midi.js'
import { useCallback } from 'react'
import { useImmer } from 'use-immer'
import ChordsTrainer from './ChordsTrainer.jsx'

enableMIDI()

const initialState = {
  activeTab: "play",
}

function App() {
  const [state, setState] = useImmer(initialState)

  const setActiveTab = useCallback((tab) => {
    setState((draft) => {
      draft.activeTab = tab
    })
  }, [])

  let mainWindow 
  if (state.activeTab == "play") {
    mainWindow = <ChordsView/>
  } else {
    mainWindow = <ChordsTrainer/>
  }

  return (
    <div className="flex flex-col h-screen w-screen">
      <header className="">
        <AppHeader activeTab={state.activeTab} setActiveTab={setActiveTab}></AppHeader>
      </header>  
      <main className="flex-grow flex items-center justify-center">
        {mainWindow}
      </main>
      <footer className="">
        <Piano></Piano>
      </footer>
    </div>
  )
}

export default App
