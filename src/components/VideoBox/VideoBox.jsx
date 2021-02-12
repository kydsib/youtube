import React from 'react'
import { makeStyles } from '@material-ui/core'

const VideoBox = ({ video, handleSelect, refToVideo }) => {
	const classes = useStyles()

	function truncate(str, num) {
		return str.length > num ? str.substr(0, num - 1) + '...' : str
	}

	return (
		<div className={classes.root}>
			<div
				ref={refToVideo}
				onClick={() => handleSelect(video)}
				className={classes.imageContainer}
				key={video.id.videoId}
			>
				<img
					className={classes.image}
					src={video.snippet.thumbnails.medium.url}
					alt={video.snippet.title}
				/>
			</div>
			<div className={classes.descriptionContainer}>
				<p className={classes.descriptionTitle}>
					{truncate(video.snippet.title, 32)}
				</p>
				<p className={classes.description}>
					{video.snippet.channelTitle}
				</p>
			</div>
		</div>
	)
}

export default VideoBox

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		overflow: 'hidden'
	},
	imageContainer: {
		width: '100%',
		maxWidth: '10rem',
		maxHeight: '6rem',
		padding: '0.5rem 0'
	},
	image: {
		minHeight: '150px',
		width: '100%',
		paddingRight: '0.75rem',
		cursor: 'pointer'
	},
	descriptionContainer: {
		justifySelf: 'flex-start',
		flexGrow: '1'
	},
	descriptionTitle: {
		fontWeight: 'bold',
		fontSize: '1.125rem',
		marginTop: '0.5rem'
	},
	description: {
		fontSize: '0.75rem',
		paddingTop: '0.5rem'
	}
}))
