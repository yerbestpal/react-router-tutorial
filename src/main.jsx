import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root'
import ErrorPage from './error-page'
import Contact from './routes/contact'

const router = createBrowserRouter([
	{
		// This is the root route. It serves as the root layout of the UI.
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/contacts/:contactId',
		element: <Contact />,
	},
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
