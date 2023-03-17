import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import SignUp from './pages/SignUp'
import Chat from './pages/Chat'
import { Provider } from 'react-redux'
import persistStore from 'redux-persist/es/persistStore'
import { PersistGate } from 'redux-persist/es/integration/react'
import store from './store'
import SocketWrapper from './SocketWrapper'
import 'bootstrap/dist/css/bootstrap.css'

const persistedStore = persistStore(store)

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/chat',
        element: <Chat />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <SocketWrapper>
          <RouterProvider router={router} />
        </SocketWrapper>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
