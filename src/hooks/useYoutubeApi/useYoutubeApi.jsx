import React, { useState, useEffect } from 'react'

export default function useYoutubeApi(searchQuery, loadResultFromPosition) {
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(false)
	const [videos, SetVideos] = useState([])
	const [hasMore, setHasMore] = useState(false)
	const [nothingFound, setNothingFound] = useState(false)

	useEffect(() => {
		SetVideos([])
	}, [searchQuery])

	useEffect(() => {
		// const API_KEY = 'AIzaSyB2u0Cpajl8SbEsVbTub-_9XOD3funQHRQ' // 403 error exceeded quota
		const BORROWED_API_KEY = 'AIzaSyAzfFLwjVLNVIHbBf8EWOSH3nCE0zLgF44'

		async function getVideos() {
			setIsLoading(true)
			setError(false)

			try {
				const response = await fetch(
					`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${loadResultFromPosition}&q=${searchQuery}&key=${BORROWED_API_KEY}`
				)

				if (response.status === 200) {
					let data = await response.json()

					SetVideos(prev => [...prev, ...data.items])
					setHasMore(data.pageInfo.totalResults > 1)
					setNothingFound(data.items < 1)
				}

				setIsLoading(false)
				return
			} catch (ex) {
				setError(true)
				console.log(ex.message)
			}
		}

		getVideos()
	}, [searchQuery, loadResultFromPosition])

	return { videos, error, isLoading, hasMore, nothingFound }
}
