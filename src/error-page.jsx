import { useRouteError } from 'react-router-dom'

// This is the error page for the entire application. It's the fallback for any route that fails to render.
export default function ErrorPage() {
	const error = useRouteError()
	console.error(error)

	return (
		<div id='error-page'>
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
		</div>
	)
}
