import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from 'react-router-dom'
import ErrorPage from './error-page'
import Contact, {action as contactAction, loader as contactLoader,} from './routes/contact'
import Root, {action as rootAction, loader as rootLoader} from './routes/root'
import EditContact, {action as editAction} from './routes/edit'
import {action as destroyAction} from './routes/destroy'
import Index from './routes/index.jsx'

// const router = createBrowserRouter([
{
  /*  {*/
}
//     // This is the root route. It serves as the root layout of the UI.
//     path: '/',
{
  /*    element: <Root />,*/
}
//     errorElement: <ErrorPage />,
//     loader: rootLoader,
//     action: rootAction,
//     // This route has child routes. It will render its element, and then render its child routes into its outlet.
{
  /*    children: [*/
}
{
  /*      {*/
}
//         // This route is a catch-all route. It will render if none of its siblings render.
//         errorElement: <ErrorPage />,
//         children: [
//           // This is the index route. It will be rendered when the URL matches the parent routes exact path.
{
  /*          { index: true, element: <Index /> },*/
}
//           {
//             // The colon indicates a URL parameter. This route will match /contacts/123, /contacts/abc, etc.
//             // The value of the parameter will be available in the route's params.
{
  /*            path: '/contacts/:contactId',*/
}
//             element: <Contact />,
//             loader: contactLoader,
//             action: contactAction,
//           },
//           {
//             path: '/contacts/:contactId/edit',
//             element: <EditContact />,
//             // Reusing the same loader function as the Contact route.
//             // This means the data for the Contact route will be reused for the EditContact route.
//             // This is lazy but purely for the needs of this tutorial. Ideally, you'd have a separate loader function for each route.
//             loader: contactLoader,
//             action: editAction,
//           },
//           {
//             path: '/contacts/:contactId/destroy',
//             // This route has no UI of its own. It only performs an action and then redirects to another page.
//             // This is a common pattern for actions that change data on the server.
//             // Thus, there is no element or loader for this route.
//             action: destroyAction,
//             errorElement: <div>Oops! There was an error.</div>,
//           },
//         ],
//       },
//     ],
//   },
// ])

// This is the same router as above, but using JSX instead of the object syntax.
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      loader={rootLoader}
      action={rootAction}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route
          path="/contacts/:contactId"
          element={<Contact />}
          loader={contactLoader}
          action={contactAction}
        />
        <Route
          path="/contacts/:contactId/edit"
          element={<EditContact />}
          loader={contactLoader}
          action={editAction}
        />
        <Route path="/contacts/:contactId/destroy" action={destroyAction} />
      </Route>
    </Route>,
  ),
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
