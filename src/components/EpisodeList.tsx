import React, { useContext, Fragment, useEffect } from 'react'
import Context from '../context/TvContext/TvContext'
import Loader from './Loader'
import { IData, IEpisode, IState } from '../context/TvContext/TvReducer'
import { Card, CardActionArea, CardMedia, CardContent, Typography ,Grid, List, ListItem, ListItemIcon, ListItemText  } from '@material-ui/core'
const EpisodeList: React.FC = (): React.ReactElement => {
  const { state: { results, loading } } : { state: IState } = useContext(Context)
  useEffect(() => {
    console.log('loading: ' + loading)
    loading && ('loading...')
  }, [loading])

  if (loading) {
    console.log('LOADING')
    return <Loader />
  }
  if (!results) {
    return <h4 style={{ textAlign: 'center', margin: '12px auto' }}>Search for your favorite tv show</h4>
  }

  const renderResults = (data: IData ) => {
    return data._embedded.episodes.map((episode: IEpisode): React.ReactFragment => {
      return (
          <Grid key={episode.id} style={{ margin: 'auto'}} item xs={12} sm={12} md={5} lg={3}>
            <Card style={{ marginTop: '12px'}}>
              <CardActionArea>
                { episode.image ? (
                  <CardMedia
                    component='img'
                    alt={episode.name}
                    image={episode.image.original}
                    title={episode.name}
                    style={{ width: '100%' }}
                  />
                ): null }
                <CardContent>
                  
                  <Typography gutterBottom variant="h5" component="h2">
                    {episode.name}
                  </Typography>
                  <Typography variant="body1" style={{ overflow: 'hidden'}} color="textSecondary" component="div">
                    <div className='contain' style={{ margin: '10px', maxHeight:'100px', padding: '10px', textAlign: 'center'}}>
                      {episode.summary ? <div dangerouslySetInnerHTML={{ __html: episode.summary }} /> : null}
                    </div>
                  </Typography>
                </CardContent>
                <List component="ul">
                    <ListItem>
                      <ListItemText primary='Season' secondary={episode.season} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary='Episode number' secondary={episode.number} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary='Duration' secondary={episode.runtime} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary='Air Date' secondary={episode.airdate} />
                    </ListItem>
                  </List>
              </CardActionArea>
            </Card>
          </Grid>
      )
    })
  }


  return (
    <div style={{ margin: 'auto', width: '90%', minWidth: '440px', padding: '12px' }}>
      <Grid container spacing={1}>
        {renderResults(results.data)}
      </Grid>
    </div>
  )
}

export default EpisodeList