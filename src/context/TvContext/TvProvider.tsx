import React, { useReducer } from 'react'
import Context from './TvContext'
import Reducer, { IAction, IResult } from './TvReducer'
import axios from 'axios'
const getUrl = (query: string): string => {
  return `http://api.tvmaze.com/singlesearch/shows?q=${query}&embed=episodes`
}
const TvProvider = ({ children }): React.ReactElement => {
  const [state, dispatch] = useReducer(Reducer, { results: null, loading: false })
  
  // actions
  
  const fetchShow = (dispatch: React.Dispatch<IAction>) => async (query: string): Promise<IResult> => {
    try {
      dispatch({ type: 'SET_LOADING' })
      const url = getUrl(query)
      const result = await axios(url)
      // console.log(JSON.stringify(result))
      dispatch({ type: 'FETCH_SHOWS', payload: result})
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
  const actions = {
    fetchShow,
    clearShow,
    setLoading
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
    }}>
      { children }
    </Context.Provider>
  )
}

export default TvProvider