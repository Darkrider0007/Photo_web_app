import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Upload from './pages/Upload.jsx'
import ViewPhotos from './pages/ViewPhotos.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegistrationPage from './pages/RegistrationPage.jsx'
import Photo from './pages/Photo.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/login',
        element: <LoginPage/>
      },
      {
        path: '/view-photos',
        element: <ViewPhotos/>
      },
      {
        path: '/register',
        element: <RegistrationPage/>
      },
      {
        path:'/upload',
        element: <Upload/>
      },
      {
        path: "/photo/:name",
        element: <Photo/>,
    },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>    
  </React.StrictMode>,
)
