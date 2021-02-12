import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'

import VideoBox from '../VideoBox/VideoBox'

const SugestedVideos = ({ data }) => {
	const classes = useStyles()
	return (
		<Grid className={classes.root} lg={3} md={3} xs={12}>
			<div className="title">Sugested Videos</div>
			{data.map(item => (
				<VideoBox video={item} />
			))}
		</Grid>
	)
}

export default SugestedVideos

const useStyles = makeStyles(() => ({
	root: {
		height: '100%',
		backgroundColor: 'salmon'
	}
}))
