import React, { useContext, Fragment, useEffect } from 'react'
import Context, { IContext } from '../context/TvContext/TvContext'
import Loader from './Loader'
import { RouteComponentProps } from 'react-router-dom'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { IData, ISeason } from '../context/TvContext/TvReducer'
import { Card, CardMedia, CardContent, Typography, Grid, Button  } from '@material-ui/core'

const SeasonList = (props: RouteComponentProps ): React.ReactElement => {
  const { state: { results, loading, error } } : IContext = useContext(Context)
  console.log(props.match)
 
  useEffect(() => {
    console.log('loading: ' + loading)
    loading && ('loading...')
  }, [loading])

  if (loading) {
    console.log('LOADING')
    return <Loader />
  }
  if (error) {
    return <h4 style={{ textAlign: 'center', margin: '12px auto' }}>{ error }</h4>
  }
  
  if (!results) {
    return <h4 style={{ textAlign: 'center', margin: '12px auto' }}>Search for your favorite tv show</h4>
  }
  const renderResults = (data: IData ) => {
    return data._embedded.seasons.map((season: ISeason): React.ReactFragment => {
      return (
          <Grid key={season.id} style={{ margin: 'auto'}} item xs={12} sm={12} md={5} lg={3}>
            <Card style={{ marginTop: '12px'}}>
              
                { season.image ? (
                  <CardMedia
                    component='img'
                    alt={`${data.name} Season ${season.number}`}
                    image={season.image.original}
                    title={`${data.name} Season ${season.number}`}
                    style={{ width: '100%' }}
                  />
                ): null }
                <CardContent>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '10px'}}>
                  <Typography gutterBottom variant="h5" component="h2">
                  {data.name + ' Season ' +season.number}
                  </Typography>
                  <Button onClick={() => {
                    props.history.push(`/${data.name.replace(/\W/gi, '-')}/${season.id}/episodes`)
                    console.log('Get Season episodes')
                  }}><ChevronRightIcon /></Button>
                </div>
                <Typography variant="body1" style={{ overflow: 'hidden'}} color="textSecondary" component="div">
                    <div className='contain' style={{ margin: '10px', maxHeight:'100px', padding: '10px', textAlign: 'center'}}>
                      {season.summary ? <div dangerouslySetInnerHTML={{ __html: season.summary }} /> : null}
                    </div>
                  </Typography>
                  
                </CardContent>
            </Card>
          </Grid>
      )
    })
  }


  return (
    <div>
      <div style={{ margin: 'auto', width: '90%', minWidth: '440px', padding: '12px' }}>
          <Grid container spacing={1}>
          {renderResults(results.data)}
          </Grid>
      </div>
    </div>
  )
}

export default SeasonList