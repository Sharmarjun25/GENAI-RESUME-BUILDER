import React, { useState } from 'react'
import "../auth.form.scss"
import { useNavigate, Link } from 'react-router'
import { useAuth } from "../hooks/useAuth"

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (!email || !password) {
            setError("Please enter your email and password.")
            return
        }

        const result = await handleLogin({ email, password })

        if (result === true) {
            navigate('/')
        } else {
            // result will be the error message from the server, or a generic one
            setError(result || "Invalid email or password. Please try again.")
        }
    }

    if (loading) {
        return (<main><h1>Loading......</h1></main>)
    }

    return (
        <main>
            <header className='page-header'>
                <h1>Tailor Your Application for the <span className='highlight'>Dream Role</span></h1>
                <p>Instantly optimize your resume and generate targeted technical and behavioral preparation plans.</p>
            </header>

            <div className="form-container">
                <h1>Login</h1>

                {error && (
                    <p style={{ color: '#ff4d4f', background: 'rgba(255,77,79,0.1)', padding: '10px 14px', borderRadius: '6px', marginBottom: '12px', fontSize: '14px' }}>
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            value={email}
                            type="text" id='email' name='email' placeholder='Enter email address' />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            value={password}
                            type="password" id='password' name='password' placeholder='Enter your Password' />
                    </div>

                    <button className='button primary-button' disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                </form>
                <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
            </div>
        </main>
    )
}

export default Login