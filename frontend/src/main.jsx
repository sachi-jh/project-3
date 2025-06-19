import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router'
import './index.css'
import App from './App.jsx'
import BoardDetails from './BoardDetails.jsx'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/board/:id",
    element: <BoardDetails />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes}/>
  </StrictMode>,
)
