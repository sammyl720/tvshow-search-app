export interface IAction {
  type: string | null;
  likePayload?: IEpisode;
  resultsPayload?: IResult;
  payload?: number;
  setLikedShowsPayload?: IEpisode[];
}


// externals: {tvrage: 18164, thetvdb: 81189, imdb: "tt0903747"}
export interface IExternals {
  tvrage: number | null;
  thetvdb: number | null;
  imdb: string | null;
}
export interface ISchedule {
  time: string | null;
  days: string[]|null;
}

export interface IRating {
  average: number | null;
}

export interface ICountry {
  name: string | null;
  code: string | null;
  timezone: string | null;
}

export interface INetwork {
  id: number | null;
  name: string | null;
  country: ICountry
}

export interface IWebChannel {
  id: number | null;
  name: string | null;
  country: null | ICountry;
}

export interface IImage {
  medium: string | null;
  original: string | null;
}

export interface IEpisode {
  id: number | null;
  url: string | null;
  name: string | null;
  season: number | null;
  number: number | null;
  airdate: number | null;
  airtime: number | null;
  airstamp: string | null;
  runtime: number | null;
  image: IImage;
  summary: string | null;
}
export interface IEmbedded {
  episodes: IEpisode[];
}
export interface IData {
  _embedded: IEmbedded;
  schedule: ISchedule;
  network: INetwork;
  webChannel: IWebChannel;
  rating: IRating;
  image: IImage;
  summary: string | null;
  weight: number | null;
  id: number | null;
  url: string | null;
  name: string | null;
  type: string | null;
  language: string | null;
  genres: string[] | null;
  status: string | null;
  runtime: number | null;
  premiered: string | null;
  officialSite: string | null;

}
export interface IResult {
  data?: IData | null;
}

export interface IState {
  results: IResult | null,
  loading: boolean,
  liked: IEpisode[]
}

const INITIAL_STATE: IState = {
  results: null,
  loading: false,
  liked: []
}
export default (state: IState = INITIAL_STATE, action: IAction): IState => {
  switch(action.type) {
    case 'SET_LIKED_SHOWS':
      return { ...state, loading: false, liked: action.setLikedShowsPayload }
    case 'LIKE_SHOW':
      return { ...state, loading: false, liked: [ ...state.liked, action.likePayload ]}
    case 'REMOVE_LIKE':
      return { ...state, loading: false, liked: [...state.liked.filter(episode => episode.id !== action.payload )]}
    case 'FETCH_SHOWS':
      return { ...state, results: action.resultsPayload, loading: false }
    case 'CLEAR_SHOW':
      return { ...state, results: null, loading: false }
    case 'SET_LOADING':
      return { ...state, loading: true }
    default:
      return state
  }
}