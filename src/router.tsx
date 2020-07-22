import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import EpisodeList from './components/EpisodeList'
import LikedEpisodes from './components/LikedEpisodes'
import Header from './components/Header'
import Navigation from './components/Navigation'
import SeasonList from './components/SeasonList'
const RouterComponent = (): React.ReactElement => {
  return (
    <Router>
      <Header title="TvApp" Navigation={Navigation} />
      <Switch>
        <Route path="/liked" exact component={LikedEpisodes} />
        <Route path="/season/:seasonId" component={EpisodeList} />
        <Route path="/" component={SeasonList} />
        <Route
          path="/"
          render={() => {
            return <h1>404 Page not found</h1>
          }}
        />
      </Switch>
    </Router>
  )
}

export default RouterComponent
