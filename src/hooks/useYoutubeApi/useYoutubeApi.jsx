import React, { useState, useEffect } from 'react'

export default function useYoutubeApi(searchQuery, resultsPage) {
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(false)
	const [videos, SetVideos] = useState([])
	const [hasMore, setHasMore] = useState(false)

	useEffect(() => {
		SetVideos([])
	}, [searchQuery])

	useEffect(() => {
		const API_KEY = 'AIzaSyB2u0Cpajl8SbEsVbTub-_9XOD3funQHRQ'
		const rsultsPerLoad = 20
		async function getVideos() {
			setIsLoading(true)
			setError(false)

			try {
				const response = await fetch(
					`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${rsultsPerLoad}&q=${searchQuery}&key=${API_KEY}`
				)

				if (response.status === 200) {
					let data = await response.json()
					console.log(data)
				} else {
					console.log(response)
				}

				setIsLoading(false)
				return
			} catch (ex) {
				console.log(`Wooops something went wrong ${ex.message}`)
				setError(true)
			}
		}

		getVideos()
	}, [searchQuery, resultsPage])

	return { videos, error, isLoading, hasMore }
}
