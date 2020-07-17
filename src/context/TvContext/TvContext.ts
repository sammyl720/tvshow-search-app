import { createContext } from 'react'
import { IResult } from './TvReducer'

const Context = createContext({ fetchShow: (text:string): Promise<IResult | string> => {
  return Promise.reject('Still Booting up')
},
  clearShow: (): void => { console.log('clear show action') },
  setLoading: (): void => { console.log('load') },
  state: {
    results: null,
    loading: false
  }
})

export default Context
