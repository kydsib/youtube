import React, { useState } from 'react'

import useYoutubeSearch from '../../hooks/useYoutubeApi/useYoutubeApi'

import SearchInput from '../../components/SearchInput/SearchInput'

const HomePage = () => {
	const [searchQuery, setSearchQuery] = useState('')
	const [resultsPage, setResultsPage] = useState(1)

	const [data, setData] = useState([])

	function handleSubmit(dataFromInput) {
		console.log(searchQuery)
		setSearchQuery(dataFromInput)
	}

	console.log(searchQuery)
	const { videos, error, isLoading, hasMore } = useYoutubeSearch(
		searchQuery,
		resultsPage
	)

	return (
		<div>
			<SearchInput handleSubmit={handleSubmit} />

			{isLoading ? <p>Loading ... </p> : null}
			<div>{error && 'Error'}</div>
		</div>
	)
}

export default HomePage
