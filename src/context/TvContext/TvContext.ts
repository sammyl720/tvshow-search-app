import { createContext } from 'react'
import { IState, IEpisode } from './TvReducer'

interface IActions {
  fetchShow: (text: string) => void | unknown
  clearShow: () => void | unknown;
  setLoading: () => void | unknown;
  likeShow: (episode: IEpisode) => void | unknown;
  removeLikeShow: (id: number) => void | unknown;
  setLikedShows: (episodes: IEpisode[]) => void | unknown;
}

export interface IContext extends IActions {
  state: IState;
}
const Context = createContext<IContext | null >(null)

export default Context
