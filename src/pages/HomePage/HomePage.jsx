import React, { useState, useRef, useCallback, Fragment } from 'react'
import { Container, Grid, makeStyles } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

import useYoutubeApi from '../../hooks/useYoutubeApi/useYoutubeApi'
import MainVideo from '../../components/MainVideo/MainVideo'
import VideoBox from '../../components/VideoBox/VideoBox'
import SearchInput from '../../components/SearchInput/SearchInput'
import Spinner from '../../components/Spinner/Spinner'

const HomePage = () => {
	const [searchQuery, setSearchQuery] = useState('node js')
	const [videoToShow, setVideoToShow] = useState('')
	// bad name
	const [loadResultFromPosition, setLoadResultFromPosition] = useState(1)

	const resultsPerLoad = 20
	const classes = useStyles()
	const inputElement = useRef(null)
	const observer = useRef(null)

	const { videos, error, isLoading, hasMore, nothingFound } = useYoutubeApi(
		searchQuery,
		loadResultFromPosition
	)

	const loadMoreVideosRef = useCallback(
		node => {
			if (isLoading) return

			if (observer.current) observer.current.disconnect()
			observer.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting && hasMore) {
					setLoadResultFromPosition(
						prevPageNumber => prevPageNumber + resultsPerLoad
					)
				}
			})
			if (node) observer.current.observe(node)
		},
		[isLoading, hasMore]
	)

	function handleSubmit(dataFromInput) {
		setSearchQuery(dataFromInput)
	}

	function handlePlaySelectedVideo(video) {
		setVideoToShow(video)
		scrollToTop()
	}

	function scrollToTop() {
		inputElement.current.scrollIntoView({ behavior: 'smooth' })
	}

	console.log(videos)
	return (
		<Fragment>
			<SearchInput ref={inputElement} handleSubmit={handleSubmit} />
			{error ? (
				<Alert className={classes.error} severity="warning">
					Something went wrong, check your internet connection or try
					latter.
				</Alert>
			) : null}
			<Container className={classes.padding} maxWidth="lg">
				<Grid container spacing={6}>
					<MainVideo video={videoToShow} />
					<Grid item lg={4} md={4} xs={12} className={classes.root}>
						{videos
							? videos.map((video, index) => {
									if (videos.length === index + 1) {
										return (
											<VideoBox
												refToVideo={loadMoreVideosRef}
												handleSelect={
													handlePlaySelectedVideo
												}
												video={video}
											/>
										)
									} else {
										return (
											<VideoBox
												handleSelect={
													handlePlaySelectedVideo
												}
												video={video}
											/>
										)
									}
							  })
							: null}
						{isLoading ? <Spinner /> : null}
						{nothingFound ? (
							<Alert severity="info">
								We couldn't find anything!
							</Alert>
						) : null}
					</Grid>
				</Grid>
			</Container>
		</Fragment>
	)
}

export default HomePage

const useStyles = makeStyles(() => ({
	root: {
		height: '200px',
		padding: '0.5rem 0',
		boxSizing: 'border-box'
	},

	image: {
		height: '100%',
		width: '100%',
		cursor: 'pointer'
	},
	padding: {
		paddingTop: '1.5rem'
	},
	error: {
		marginBottom: '0.75rem',
		justifyContent: 'center'
	}
}))
