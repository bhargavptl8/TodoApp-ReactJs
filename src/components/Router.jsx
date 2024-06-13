import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import Todo from '../pages/Todo';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <SignUp />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/todoapp',
        element: <Todo />,
    }
])