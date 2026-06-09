import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout } from "../../../services/auth.api";


export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    const handleLogin = async ({ email, password }) => {
        setLoading(true)

        try {
            const data = await login({ email, password })
            if (data && data.user) {
                setUser(data.user)
                return true  // success — Login.jsx will call navigate('/')
            }
            return "Login failed. Please try again."

        } catch (err) {
            // err.message contains the server error (e.g. "Invalid email or password")
            return err.message || "Something went wrong. Is the server running?"
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            if (data && data.user) {
                setUser(data.user)
                return true  // success — Register.jsx will call navigate('/')
            }
            return "Registration failed. Please try again."

        } catch (err) {
            // err.message contains the server error (e.g. "Account already exists")
            return err.message || "Something went wrong. Is the server running?"
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout()
            setUser(null)

        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    return { user, loading, handleRegister, handleLogin, handleLogout }
}