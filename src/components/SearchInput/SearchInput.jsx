import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const SearchInput = ({ handleSubmit }) => {
	const [inputError, setInputError] = useState(false)
	const [errorMessage, SetErrorMessage] = useState('')

	const [inputValue, setInputValue] = useState('')

	function handleSearchInput(event) {
		event.preventDefault()

		handleSubmit(inputValue)

		event.target.reset()
	}

	useEffect(() => {
		function testInputLength() {
			if (inputValue.length > 19) {
				setInputError(true)
				SetErrorMessage('Input is too long!')
			} else if (inputValue.length < 19) {
				setInputError(false)
			}
		}

		testInputLength()
	}, [inputValue])

	function handleInput(event) {
		const regex = /^[a-zA-Z]*$/
		const value = event.target.value

		if (value.match(regex)) {
			setInputValue(value)
			setInputError(false)
		} else if (!value.match(regex)) {
			setInputError(true)
			SetErrorMessage('Only letters are allowed')
		}
	}

	return (
		<form onSubmit={handleSearchInput}>
			{inputError ? (
				<TextField
					error
					id="standard-error-helper-text"
					helperText={errorMessage}
					label="Error"
					variant="filled"
					onChange={handleInput}
				/>
			) : (
				<TextField
					id="standard-basic"
					label="Search"
					variant="filled"
					onChange={handleInput}
				/>
			)}

			<Button
				disabled={inputError}
				type="submit"
				variant="contained"
				color="primary"
			>
				Go!
			</Button>
		</form>
	)
}

export default SearchInput
