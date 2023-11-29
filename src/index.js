import React from 'react';

import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import CategoryScreen from './screens/CategoryScreen';
import TodoListScreen from './screens/TodoListScreen';
import LoginScreen from './screens/LoginScreen'; 
import SignUpScreen from './screens/SignUpScreen';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginScreen />,
    children: [
      {
        path: "/SignUpScreen",
        element: <SignUpScreen />,
      },
      {
        path: "/CategoryScreen",
        element: <CategoryScreen />,
      },
      {
        path: "/TodoListScreen",
        element: <TodoListScreen />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
