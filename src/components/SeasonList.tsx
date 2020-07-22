import React, { useContext, useState, useEffect } from 'react'
import Context, { IContext } from '../context/TvContext/TvContext'
import Loader from './Loader'
import { RouteComponentProps, Route, Switch, Link } from 'react-router-dom'
import EpisodeList from './EpisodeList'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import getFormattedDate from '../utils/getFormattedDate'
import { IData, ISeason } from '../context/TvContext/TvReducer'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Button
} from '@material-ui/core'

const SeasonList = (props: RouteComponentProps): React.ReactElement => {
  const {
    state: { results, loading, error }
  }: IContext = useContext(Context)
  // const todaysDate = getFormattedDate()
  // console.log(todaysDate)
  // const todaysSchedule = `http://api.tvmaze.com/schedule?country=US&date=${todaysDate}`
  // console.log(todaysSchedule)
  const [url, setUrl] = useState('/')
  const [path, setPath] = useState('/')
  useEffect(() => {
    console.log('Season list rendering')
    setUrl(props.match.url)
    setPath(props.match.path)
  }, [])

  if (loading && !results) {
    return <Loader />
  }
  if (error) {
    return <h4 style={{ textAlign: 'center', margin: '12px auto' }}>{error}</h4>
  }

  if (!results) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly'
        }}
      >
        <Typography
          style={{ textAlign: 'center', margin: '12px auto' }}
          variant="h4"
          component="h1"
          gutterBottom
        >
          Search for your favorite tv show
        </Typography>
        <img
          src="assets/Tv-Image@2x.png"
          alt="Tv Image"
          style={{ maxWidth: '80vw', margin: 'auto' }}
        />
      </div>
    )
  }
  const renderResults = (data: IData) => {
    return data._embedded.seasons.map(
      (season: ISeason): React.ReactFragment => {
        return (
          <Grid key={season.id} item xs={12} sm={12} md={5} lg={3}>
            <Card style={{ margin: '12px auto auto auto' }}>
              {season.image ? (
                <CardMedia
                  component="img"
                  alt={`${data.name} Season ${season.number}`}
                  image={season.image.original}
                  title={`${data.name} Season ${season.number}`}
                  style={{ width: '100%' }}
                  onClick={() => {
                    props.history.push(url + season.id)
                  }}
                />
              ) : null}
              <CardContent>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    padding: '10px'
                  }}
                >
                  <Typography gutterBottom variant="h5" component="h2">
                    {data.name + ' Season ' + season.number}
                  </Typography>
                  <Button>
                    <Link to={`${url + season.id}`}>
                      <ChevronRightIcon />
                    </Link>
                  </Button>
                </div>
                <Typography
                  variant="body1"
                  style={{ overflow: 'hidden' }}
                  color="textSecondary"
                  component="div"
                >
                  <div
                    className="contain"
                    style={{
                      margin: '10px',
                      maxHeight: '100px',
                      padding: '10px',
                      textAlign: 'center'
                    }}
                  >
                    {season.summary ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: season.summary }}
                      />
                    ) : null}
                  </div>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )
      }
    )
  }

  return (
    <Switch>
      <Route
        path="/"
        exact
        render={({ location, history, match }) => {
          return (
            <Grid container alignItems="center" justify="center" spacing={1}>
              <Grid item xs={12} alignItems="center" justify="center">
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '12px auto',
                    padding: '5px',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.5)',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    width: '100%'
                  }}
                >
                  <Typography style={{ marginTop: '10px' }} variant="h5">
                    {results.data.name}
                  </Typography>
                  {results.data.image['medium'] && (
                    <img
                      style={{
                        maxWidth: '80%',
                        margin: '10px auto',
                        borderRadius: '5px'
                      }}
                      src={results.data.image['medium']}
                      alt={results.data.name}
                    />
                  )}
                  {results.data.summary && (
                    <Typography variant="body1">
                      <div
                        style={{ maxWidth: '80%', margin: '10px auto' }}
                        dangerouslySetInnerHTML={{
                          __html: results.data.summary
                        }}
                      />
                    </Typography>
                  )}
                </div>
              </Grid>
              {renderResults(results.data)}
            </Grid>
          )
        }}
      />
      <Route path={`${path}:seasonId`} component={EpisodeList} />
    </Switch>
  )
}

export default SeasonList
