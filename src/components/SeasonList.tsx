import React, { useContext, useState, useEffect } from 'react'
import Context, { IContext } from '../context/TvContext/TvContext'
import Loader from './Loader'
import { RouteComponentProps, Route, Switch, Link } from 'react-router-dom'
import EpisodeList from './EpisodeList'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
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
  // console.log(props.match)
  // const {path, url, ...match} = useRouteMatch()
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
      <h4 style={{ textAlign: 'center', margin: '12px auto' }}>
        Search for your favorite tv show
      </h4>
    )
  }
  const renderResults = (data: IData) => {
    return data._embedded.seasons.map(
      (season: ISeason): React.ReactFragment => {
        return (
          <Grid
            key={season.id}
            style={{ margin: 'auto' }}
            item
            xs={12}
            sm={12}
            md={5}
            lg={3}
          >
            <Card style={{ marginTop: '12px' }}>
              {season.image ? (
                <CardMedia
                  component="img"
                  alt={`${data.name} Season ${season.number}`}
                  image={season.image.original}
                  title={`${data.name} Season ${season.number}`}
                  style={{ width: '100%' }}
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
            <div>
              <div
                style={{
                  margin: 'auto',
                  width: '90%',
                  minWidth: '440px',
                  padding: '12px'
                }}
              >
                <Grid container spacing={1}>
                  <Grid item xs={12}></Grid>
                  {renderResults(results.data)}
                </Grid>
              </div>
            </div>
          )
        }}
      />
      <Route path={`${path}:seasonId`} component={EpisodeList} />
    </Switch>
  )
}

export default SeasonList
