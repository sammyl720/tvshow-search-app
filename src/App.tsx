import React from 'react'
import './style.css'
import SearchBar from './components/SearchBar'
import TvProvider from './context/TvContext/TvProvider'
import EpisodeList from './components/EpisodeList'
type props = {
  /** A Greeting To Display */
  greeting: string;
}


const App = (props: props): React.ReactElement => {
  return (
    <TvProvider>
      <SearchBar />
      <EpisodeList />
    </TvProvider>
  )
}
export default App
