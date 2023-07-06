import { Link, Outlet } from 'react-router-dom'

export default function Root() {
	return (
		<>
			<div id='sidebar'>
				<h1>React Router Contacts</h1>
				<div>
					<form id='search-form' role='search'>
						<input
							id='q'
							aria-label='Search contacts'
							placeholder='Search'
							type='search'
							name='q'
						/>
						<div id='search-spinner' aria-hidden hidden={true} />
						<div className='sr-only' aria-live='polite'></div>
					</form>
					<form method='post'>
						<button type='submit'>New</button>
					</form>
				</div>
				<nav>
					<ul>
						<li>
							{/* The Link component enables client-side navigation.
                                This is preferred over <a> tags which request documents from the server.  */}
							<Link to={`/contacts/1`}>Your Name</Link>
						</li>
						<li>
							<Link to={`/contacts/2`}>Your Friend</Link>
						</li>
					</ul>
				</nav>
			</div>
			<div id='detail'>
				{/* This is where the child routes will render. */}
				<Outlet />
			</div>
		</>
	)
}
