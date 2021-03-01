import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core'
import Search from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment'

const SearchInput = React.forwardRef(({ handleSubmit }, ref) => {
	const classes = useStyles()

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
		const regex = /^[a-zA-Z ]*$/
		const value = event.target.value

		if (value.match(regex)) {
			setInputValue(value)
			setInputError(false)
		} else if (!value.match(regex)) {
			setInputError(true)
			SetErrorMessage('Only letters are allowed')
		}
	}

	const ConditionalTextField = inputError ? (
		<TextField
			error
			id="standard-error-helper-text"
			helperText={errorMessage}
			label="Error"
			variant="outlined"
			onChange={handleInput}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<Button
							disableElevation
							disabled={inputError}
							type="submit"
							variant="contained"
							color="inherit"
						>
							<Search />
						</Button>
					</InputAdornment>
				)
			}}
			fullWidth={true}
		/>
	) : (
		<TextField
			id="standard-basic"
			label="Search"
			variant="outlined"
			onChange={handleInput}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<Button
							disableElevation
							disabled={inputError}
							type="submit"
							variant="contained"
							color="inherit"
						>
							<Search />
						</Button>
					</InputAdornment>
				)
			}}
			fullWidth={true}
		/>
	)

	return (
		<div className={classes.root}>
			<form
				className={classes.formContainer}
				onSubmit={handleSearchInput}
				ref={ref}
			>
				{ConditionalTextField}
			</form>
		</div>
	)
})

export default SearchInput

const useStyles = makeStyles(theme => ({
	root: {
		height: '6rem',
		padding: '0 1rem',
		display: 'flex',
		justifyContent: 'center',
		marginBottom: '2rem',
		backgroundColor: '#fff'
	},
	formContainer: {
		marginTop: '0.75rem',
		width: '80vw',
		[theme.breakpoints.up('sm')]: {
			width: '50vw'
		}
	}
}))
