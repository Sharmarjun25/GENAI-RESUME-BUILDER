import { createBrowserRouter } from "react-router";
import { Outlet } from "react-router";

import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import { AuthProvider } from "./features/auth/auth.context.jsx";

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
                element: <Protected><h1>Home Page</h1></Protected>
            }
        ]
    }
])