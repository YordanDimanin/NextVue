import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Filter from './pages/Filter.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Result from './pages/Result.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/filter',
    element: <Filter />,
  },
  {
    path: '/result',
    element: <Result />,
  }
])

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
