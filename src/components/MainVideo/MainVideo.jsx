import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import YouTube from '@material-ui/icons/YouTube'

const MainVideo = ({ video }) => {
	const classes = useStyles()

	const idForContainer = video ? video.id.videoId : 'rndami2311'

	const videoBlock = video ? (
		<iframe
			className={classes.image}
			src={`https://www.youtube.com/embed/${video.id.videoId}`}
			alt={video.snippet.title}
		/>
	) : (
		<div className={classes.iconContainer}>
			<YouTube />
		</div>
	)

	const descriptionBlock = video ? (
		<div className={classes.videoInfoBox}>
			<p className={classes.title}>{video.snippet.title}</p>
			<p className={classes.description}>{video.snippet.channelTitle}</p>
		</div>
	) : null

	return (
		<Grid key={idForContainer + 1} item lg={8} md={8} xs={12}>
			<div className={classes.root}>{videoBlock}</div>
			{descriptionBlock}
		</Grid>
	)
}

export default MainVideo

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		width: '100%',
		height: '22rem',
		marginTop: '0.5rem',
		boxSizing: 'border-box',
		backgroundColor: '#bfbebe',
		[theme.breakpoints.up('sm')]: {
			height: '32rem'
		}
	},
	image: {
		height: '100%',
		width: '100%'
	},
	iconContainer: {
		alignSelf: 'center'
	},
	videoInfoBox: {
		paddingTop: '1.5rem'
	},
	title: {
		fontSize: '1.5rem',
		fontWeight: 'bold'
	},
	description: {
		fontSize: '1rem'
	}
}))
