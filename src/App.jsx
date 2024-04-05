import { useSyncExternalStore } from 'react'
import './App.css'
import MainScreen from './screens/MainScreen.jsx'
import { initializeStore, subscribe, getSnapshotData } from './lib/store.js'

initializeStore()

function App() {
  const state = useSyncExternalStore(subscribe, getSnapshotData);
  return <MainScreen state={state}/>
}

export default App
