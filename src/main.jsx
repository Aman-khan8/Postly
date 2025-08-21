import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import  store from './store/store'
import { createBrowserRouter,Router, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import EditPost from './pages/EditPost.jsx'
import AllPost from './pages/AllPost.jsx'
import AddPost from './pages/AddPost.jsx'
import Protected from './components/Protect.jsx'
import PostPage from './pages/Post.jsx'

const router=createBrowserRouter([{
  path:'/',
  element:<App/>,
  children:[
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/login',
      element:( <Protected isauthenticate={false}> 
      <LoginPage/>
      </Protected>
      )
    },
    {
      path:'/signup',
      element:(
        <Protected isauthenticate={false}>
          <SignUpPage/>
        </Protected>
      )
    },
    {

      path:'/allpost',
      element:(
        <Protected isauthenticate={true}>
          <AllPost/>
        </Protected>
      )
    },
    {
      path:'/addpost',
      element:(
        <Protected isauthenticate={true}>
          <AddPost/>
        </Protected>
      )
    },
    {
      path:'/editpost/:slug',
      element:(
        <Protected isauthenticate={true}>
          <EditPost/>
        </Protected>
      )
    },
    {
      path:'/post/:slug',
      element:(
        <Protected isauthenticate={true}>
          <PostPage/>
        </Protected>
      )
    }
  ]
},

]


)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> 
      <RouterProvider router={router}/> 
    
    
    
    </Provider>

  </StrictMode>,
)
