import PropTypes from 'prop-types'
import {Form, useFetcher, useLoaderData} from 'react-router-dom'
import {getContact, updateContact} from '../contacts' // Loader function is called to get data for the route.

// Loader function is called to get data for the route.
export async function loader({ params }) {
  const contact = await getContact(params.contactId)
  if (!contact) {
    // If the contact doesn't exist, redirect to the 404 page.
    // This is a special case where we're returning a Response object instead of an object with a `contact` property.
    throw new Response('', { status: 404, statusText: 'Not Found' })
  }
  return { contact }
}

// Action function is called to update data.
export async function action({ request, params }) {
  let formData = await request.formData()
  return updateContact(params.contactId, {
    favorite: formData.get('favorite') === 'true',
  })
}

export default function Contact() {
  // Destructuring here is absolutely necessary.
  const { contact } = useLoaderData()

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar || null} />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
              rel="noreferrer"
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          {/* Deleting works by:

           1. `<Form>` prevents the default browser behaviour of sending a new POST request to the server, but instead
               emulates the browser by creating a POST request with client-side routing.

           2. The `<Form action="destroy">` matches the new route at `"contacts/:contactId/destroy"` and sends it the
              request.

           3. After the action redirects, React Router calls all the loaders for the data on the page to get the
              latest values (this is "revalidation"). `useLoaderData` returns new values and causes the components to
              update.
          */}
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm('Please confirm you want to delete this record.')) {
                event.preventDefault()
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  )
}

function Favorite({ contact }) {
  // `useFetcher` is a hook that allows you to communicate with loaders and actions without causing a navigation.
  // I.e., mutation without navigation.
  // It's useful for things like toggling a favorite without causing a navigation.
  const fetcher = useFetcher()
  // yes, this is a `let` for later
  let favorite = contact.favorite
  if (fetcher.formData) {
    // If the form data is available, then the form has been submitted, and we can update the favorite without waiting
    // for the network request to complete.
    // This is called "optimistic updates/UI".
    favorite = fetcher.formData.get('favorite') === 'true'
  }

  return (
    // fetcher must be used inside a <Form> component.
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? 'false' : 'true'}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </fetcher.Form>
  )
}

Favorite.propTypes = {
  contact: PropTypes.shape({
    favorite: PropTypes.any,
  }),
}
