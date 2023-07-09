import {redirect} from 'react-router-dom'
import {deleteContact} from '../contacts.js'

// Action function is called to destroy data.
export async function action({ params }) {
  await deleteContact(params.contactId)
  return redirect('/')
}
