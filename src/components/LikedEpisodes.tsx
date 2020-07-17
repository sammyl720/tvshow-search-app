import React, { useEffect, useContext } from 'react'
import { Grid, Card, CardMedia, ListItemText, CardContent, Button, CardActions, Typography, List, ListItem, } from '@material-ui/core'
import { Favorite } from '@material-ui/icons'
import Context, { IContext } from '../context/TvContext/TvContext'
import { IEpisode } from '../context/TvContext/TvReducer'
import episodeIsLiked from '../utils/episodeIsLiked'

function LikedEpisodes(): React.ReactElement {
  const { state: { liked }, removeLikeShow, likeShow, setLikedShows } =  useContext<IContext>(Context)
  useEffect(() => {
    let likedShows: IEpisode[]| null;
    try {
      likedShows= JSON.parse(window.localStorage.getItem('likedShows')) || null
      if (likedShows) {
        // likedShows.push(episode)
        setLikedShows(likedShows)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])
  const renderResults = ( episodes: IEpisode[] ) => {
    return episodes.map((episode: IEpisode): React.ReactFragment => {
      return (
          <Grid key={episode.id} style={{ margin: 'auto'}} item xs={12} sm={12} md={5} lg={3}>
            <Card style={{ marginTop: '12px'}}>
              
                { episode.image ? (
                  <CardMedia
                    component='img'
                    alt={episode.name}
                    image={episode.image.original}
                    title={episode.name}
                    style={{ width: '100%' }}
                  />
                ): null }
                <CardActions>
                  <Button onClick={() => {
                    episodeIsLiked(episode.id, liked) ? removeLikeShow(episode.id) : likeShow(episode)
                  }}><Favorite style={{color: episodeIsLiked(episode.id, liked) ? 'red' : 'black'}} /></Button>
                </CardActions>
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
            </Card>
          </Grid>
      )
    })
  }


  return (
    <div>
      <div style={{ margin: 'auto', width: '90%', minWidth: '440px', padding: '12px' }}>
          <Grid container spacing={1}>
          {renderResults(liked)}
          </Grid>
      </div>
    </div>
  )
}

export default LikedEpisodes
