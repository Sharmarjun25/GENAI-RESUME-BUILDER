import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from "../hooks/useAuth"
import "../auth.form.scss"

const Register = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const { loading, handleRegister } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (!username || !email || !password) {
            setError("Please fill in all fields.")
            return
        }

        const result = await handleRegister({ username, email, password })

        if (result === true) {
            navigate("/")
        } else {
            setError(result || "Registration failed. Please try again.")
        }
    }

    return (
        <main>
            <header className='page-header'>
                <h1>Tailor Your Application for the <span className='highlight'>Dream Role</span></h1>
                <p>Instantly optimize your resume and generate targeted technical and behavioral preparation plans.</p>
            </header>

            <div className="form-container">
                <h1>Register</h1>

                {error && (
                    <p style={{ color: '#ff4d4f', background: 'rgba(255,77,79,0.1)', padding: '10px 14px', borderRadius: '6px', marginBottom: '12px', fontSize: '14px' }}>
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            onChange={(e) => { setUsername(e.target.value) }}
                            value={username}
                            type="text" id='username' name='username' placeholder='Enter username' />
                    </div>

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
                        {loading ? 'Registering...' : 'Register'}
                    </button>

                </form>

                <p>Already have an account? <Link to={"/login"}>Login</Link></p>
            </div>
        </main>
    )
}

export default Register