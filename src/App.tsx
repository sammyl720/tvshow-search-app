import React from 'react'
import './style.css'
import ReactDOM from 'react-dom'

type props = {
  /** A Greeting To Display */
  greeting: string;
  /** Css Classname to use */
  className?: string;
}


const App = (props: props) => {
  return (
    <h1 className={props.className || 'title'}>{props.greeting}</h1>
  )
}
export default App
