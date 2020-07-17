import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import EpisodeList from './components/EpisodeList'
import LikedEpisodes from './components/LikedEpisodes'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import Navigation from './components/Navigation'
const RouterComponent = (): React.ReactElement => {
  return (
    <Router>
      <Header title='TvApp' Navigation={Navigation} />
      <SearchBar />
      <Switch>
        <Route path='/' exact component={EpisodeList} />
        <Route path='/liked' exact component={LikedEpisodes} />
        <Route path='/' render={() => {
          return <h1>404 Page not found</h1>
        }} />
      </Switch>
    </Router>
  )
}

export default RouterComponent
