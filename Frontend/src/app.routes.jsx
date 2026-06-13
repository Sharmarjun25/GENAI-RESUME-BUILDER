/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router";
import { Outlet } from "react-router";

import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";

/**
 * Layout route that wraps all children with AuthProvider.
 * This ensures the AuthContext is available inside the router tree.
 */
function AuthLayout() {
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    )
}

export const router = createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/",
                element: <Protected><Home /></Protected>
            },
            {
                path: "/interview/:interviewId",
                element: <Protected><Interview /></Protected>
            }
        ]
    }
])