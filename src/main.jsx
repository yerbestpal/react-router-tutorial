import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './error-page'
import Contact from './routes/contact'
import Root, { loader as rootLoader, action as rootAction } from './routes/root'

const router = createBrowserRouter([
	{
		// This is the root route. It serves as the root layout of the UI.
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		loader: rootLoader,
		action: rootAction,
		// This route has child routes. It will render its element, and then render its child routes into its outlet.
		children: [
			{
				// The colon indicates a URL parameter. This route will match /contacts/123, /contacts/abc, etc.
				// The value of the parameter will be available in the route's params.
				path: '/contacts/:contactId',
				element: <Contact />,
			},
		],
	},
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
