import React, { useReducer } from 'react'
import Context, { IContext } from './TvContext'
import Reducer, { IAction, IResult, IEpisode } from './TvReducer'
import axios from 'axios'
const getUrl = (query: string): string => {
  return `http://api.tvmaze.com/singlesearch/shows?q=${query}&embed=episodes`
}
const TvProvider = ({ children }): React.ReactElement => {
  const [state, dispatch] = useReducer(Reducer, { results: null, loading: false, liked: [] })
  
  // actions
  
  const fetchShow = (dispatch: React.Dispatch<IAction>) => async (query: string): Promise<IResult> => {
    try {
      dispatch({ type: 'SET_LOADING'})
      const url = getUrl(query)
      const result = await axios(url)
      // console.log(JSON.stringify(result))
      dispatch({ type: 'FETCH_SHOWS', resultsPayload: result})
      return Promise.resolve(result)
    } catch (err) {
      Promise.reject('Error fetching shows')
    }
  }

  const setLoading = (dispatch: React.Dispatch<IAction>) => () => {
    dispatch({ type: 'SET_LOADING' })

  }
  const clearShow = (dispatch: React.Dispatch<IAction>) => () => {
    dispatch({ type: 'CLEAR_SHOW' })
  }
  const likeShow = (dispatch: React.Dispatch<IAction>) => (episode: IEpisode) => {
    let likedShows: IEpisode[]| null;
    try {
      likedShows= JSON.parse(window.localStorage.getItem('likedShows')) || null
      if (likedShows) {
        likedShows.push(episode)
      } else {
        likedShows = [episode]
      }

      window.localStorage.setItem('likedShows', JSON.stringify(likedShows))
    } catch (error) {
      console.log(error)
    }
    dispatch({ type: 'LIKE_SHOW', likePayload: episode })
  }

  const setLikedShows = (dispatch: React.Dispatch<IAction>) => (episodes: IEpisode[]) => {
    dispatch({ type: 'SET_LIKED_SHOWS', setLikedShowsPayload: episodes })
  }

  const removeLikeShow = (dispatch: React.Dispatch<IAction>) => (id: number) => {
    let likedShows: IEpisode[]| null;
    try {
      likedShows = JSON.parse(window.localStorage.getItem('likedShows')) || null
      if (likedShows) {
        likedShows = likedShows.filter(episode => episode.id !== id )
      } else {
        likedShows = []
      }
      window.localStorage.setItem('likedShows', JSON.stringify(likedShows))
    } catch (err) {
      console.log(err)
    }
    dispatch({ type: 'REMOVE_LIKE', payload: id })
  }
  const actions = {
    fetchShow,
    clearShow,
    setLoading,
    likeShow,
    removeLikeShow,
    setLikedShows
  }

  const boundActions = {}
  for (const key in actions) {
    boundActions[key] = actions[key](dispatch)
  }
  // console.log(boundActions)
  // end actions
  return (
    <Context.Provider value={{
      state,
      fetchShow: boundActions['fetchShow'],
      setLoading: boundActions['setLoading'],
      clearShow: boundActions['clearShow'],
      likeShow: boundActions['likeShow'], 
      removeLikeShow: boundActions['removeLikeShow'],
      setLikedShows: boundActions['setLikedShows']
    }}>
      { children }
    </Context.Provider>
  )
}

export default TvProvider