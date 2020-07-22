import React, { useContext, useEffect, useState } from 'react'
import Context, { IContext } from '../context/TvContext/TvContext'
import Loader from './Loader'
import { Favorite } from '@material-ui/icons'
import { IData, IEpisode } from '../context/TvContext/TvReducer'
import { RouteComponentProps, RouteProps, useParams } from 'react-router-dom'

import {
	Card,
	CardActions,
	CardMedia,
	CardContent,
	Typography,
	Grid,
	List,
	ListItem,
	ListItemText,
	Button
} from '@material-ui/core'
import episodeIsLiked from '../utils/episodeIsLiked'

const EpisodeList = (props: RouteComponentProps): React.ReactElement => {
	const {
		state: { results, loading, liked, episodes },
		likeShow,
		removeLikeShow,
		fetchSeason
	}: IContext = useContext(Context)
	const [seasonId, setSeasonId] = useState(null)
	// const { seasonIdId } = useParams()

	useEffect(() => {
		if (seasonId) {
			fetchSeason(seasonId)
		} else {
			fetchSeason(props.match.params['seasonId'])
			setSeasonId(props.match.params['seasonId'])
		}
		console.log(`Episode list rendering`, props.match.params['seasonId'])
	}, [])

	if (loading) {
		console.log('LOADING')
		return <Loader />
	}
	if (!episodes.length) {
		return (
			<h4
				style={{
					textAlign: 'center',
					margin: '12px auto',
					fontFamily: '"Roboto", sans-serif, cursive',
					fontSize: '22px',
					color: 'rgb(40,129,299)'
				}}
			>
				Search for your favorite tv show
			</h4>
		)
	}

	const renderResults = () => {
		return episodes.map(
			(episode: IEpisode): React.ReactFragment => {
				return (
					<Grid
						key={episode.id}
						style={{ margin: 'auto' }}
						item
						xs={12}
						sm={12}
						md={5}
						lg={3}
					>
						<Card style={{ marginTop: '12px' }}>
							{episode.image ? (
								<CardMedia
									component="img"
									alt={episode.name}
									image={episode.image.original}
									title={episode.name}
									style={{ width: '100%' }}
								/>
							) : null}
							<CardActions>
								<Button
									onClick={() => {
										episodeIsLiked(episode.id, liked)
											? removeLikeShow(episode.id)
											: likeShow(episode)
									}}
								>
									<Favorite
										style={{
											color: episodeIsLiked(episode.id, liked) ? 'red' : 'black'
										}}
									/>
								</Button>
							</CardActions>
							<CardContent>
								<Typography gutterBottom variant="h5" component="h2">
									{episode.name}
								</Typography>
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
										{episode.summary ? (
											<div
												dangerouslySetInnerHTML={{ __html: episode.summary }}
											/>
										) : null}
									</div>
								</Typography>
							</CardContent>
							<List component="ul">
								<ListItem>
									<ListItemText primary="Season" secondary={episode.season} />
								</ListItem>
								<ListItem>
									<ListItemText
										primary="Episode number"
										secondary={episode.number}
									/>
								</ListItem>
								<ListItem>
									<ListItemText
										primary="Duration"
										secondary={episode.runtime}
									/>
								</ListItem>
								<ListItem>
									<ListItemText
										primary="Air Date"
										secondary={episode.airdate}
									/>
								</ListItem>
							</List>
						</Card>
					</Grid>
				)
			}
		)
	}

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
					{renderResults()}
				</Grid>
			</div>
		</div>
	)
}

export default EpisodeList
