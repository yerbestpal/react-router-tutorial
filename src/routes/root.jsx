import { Link, Outlet, useLoaderData, Form } from 'react-router-dom'
import { getContacts, createContact } from '../contacts'

// action function is called to create data.
export async function action() {
	const contact = await createContact()
	return { contact }
}

// loader function is called to get data for the route.
export async function loader() {
	const contacts = await getContacts()
	return { contacts }
}

export default function Root() {
	const { contacts } = useLoaderData()
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
					{/* The Form component uses client-side routing and send form data to a route action. */}
					{/* Form prevents the browser from sending the request to the server and sends it to the route action instead. */}
					{/* A POST usually means some data is changing. React Router uses this as a hint to automatically revalidate the data on the page. */}
					{/* This means all `useLoaderData` hooks update and the UI stays in sync with the data automatically. */}
					<Form method='post'>
						<button type='submit'>New</button>
					</Form>
				</div>
				<nav>
					{contacts.length ? (
						<ul>
							{contacts.map((contact) => (
								<li key={contact.id}>
									<Link to={`/contacts/${contact.id}`}>
										{contact.first || contact.last ? (
											<>
												{contact.first} {contact.last}
											</>
										) : (
											<i>No Name</i>
										)}
										{''}
										{contact.favorite && <span>⭐️</span>}
									</Link>
								</li>
							))}
						</ul>
					) : (
						<p>
							<i>No contacts</i>
						</p>
					)}

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
