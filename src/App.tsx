import React from 'react'
import './style.css'
import TvProvider from './context/TvContext/TvProvider'
import Router from './router'
type props = {
  /** A Greeting To Display */
  greeting: string;
}


const App = (props: props): React.ReactElement => {
  return (
    <TvProvider>
      <Router />
      
    </TvProvider>
  )
}
export default App
