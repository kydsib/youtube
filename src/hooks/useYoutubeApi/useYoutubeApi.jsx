import  { useState, useEffect } from 'react'

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
		const API_KEY = 'AIzaSyCNP-pWc13DFqzVwbes8AkBGRxOmfsrgJQ' 

	
		async function getVideos() {
			setIsLoading(true)
			setError(false)

			try {
				const response = await fetch(
					`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${loadResultFromPosition}&q=${searchQuery}&key=${API_KEY}`
				)

				if (response.status === 200) {
					let data = await response.json()
					console.log(data)
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
