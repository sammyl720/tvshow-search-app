export interface IAction {
  type: string | null;
  likePayload?: IEpisode;
  resultsPayload?: IResult;
  seasonPayload?: IEpisode[];
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

export interface ISeason {
  /** Season ID number */
  id: string;
  /** Url to show info */
  url: string;
  /** Season number */
  number: number;
  /** season name */
  name: string;
  /** number of episodes */
  episodeOrder: number | null;
  /** Date Season Premiered */
  premiereDate: string | null;
  /** Date Season ended */
  endDate: string | null;
  /** Network which aired season show */
  network: {
    /** Network id */
    id: number;
    /** Network name */
    name: string;
    /** Country of Network */
    country: {
      /** Country's Name */
      name: string;
      /** Country code */
      code: string;
      /** Country timezone */
      timezone: string;
  }
  };
  webChannel: string | null;
  /** Season images list */
  image: {
    /** Medium Season image */
    medium: string | null;
    /** Original Season image */
    original: string | null;
  };
  /** Season summary */
  summary: string;
}
export interface IEmbedded {
  episodes?: IEpisode[];
  seasons?: ISeason[];
}
export interface IData {
  _embedded?: IEmbedded | null;
  episodes?: IEpisode[];
  schedule?: ISchedule | null;
  network?: INetwork | null;
  webChannel?: IWebChannel | null;
  rating?: IRating | null;
  image?: IImage | null;
  summary?: string | null;
  weight?: number | null;
  id?: number | null;
  url?: string | null;
  name?: string | null;
  type?: string | null;
  language?: string | null;
  genres?: string[] | null;
  status?: string | null;
  runtime?: number | null;
  premiered?: string | null;
  officialSite?: string | null;

}
export interface IResult {
  data?: IData | null;
}

export interface IState {
  results: IResult | null
  loading: boolean
  liked: IEpisode[]
  error: null | string
  episodes: IEpisode[]
}

const INITIAL_STATE: IState = {
  results: { data: null },
  episodes: [],
  loading: false,
  liked: [],
  error: null
}
export default (state: IState = INITIAL_STATE, action: IAction): IState => {
  switch(action.type) {
    case 'SET_LIKED_SHOWS':
      return { ...state, loading: false, liked: action.setLikedShowsPayload, error: null }
    case 'LIKE_SHOW':
      return { ...state, loading: false, liked: [ ...state.liked, action.likePayload ], error: null}
    case 'REMOVE_LIKE':
      return { ...state, loading: false, liked: [...state.liked.filter(episode => episode.id !== action.payload )],error: null}
    case 'FETCH_SHOWS':
      return { ...state, results: action.resultsPayload, loading: false, error: null }
    case 'FETCH_SEASON':
      return { ...state, episodes: action.seasonPayload, loading: false, error: null }
    case 'SET_ERROR':
      return { ...state, loading: false, error: 'Something went wrong.\nPlease try again later.'}
    case 'CLEAR_SHOW':
      return { ...state, results: null, loading: false, error: null }
    case 'SET_LOADING':
      return { ...state, loading: true }
    default:
      return state
  }
}