import React from 'react'
import './style.css'
import Header from './components/Header'

type props = {
  /** A Greeting To Display */
  greeting: string;
}


const App = (props: props): React.ReactElement => {
  return (
    <div>
      <Header title={props.greeting} />
    </div>
  )
}
export default App
