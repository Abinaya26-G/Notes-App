import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import { LogIn } from 'lucide-react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await api.post('/auth/login', { email, password })
      login(res.data)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div className="auth-page card">
      <h2><LogIn size={24} style={{verticalAlign:'middle'}} /> Login</h2>
      {error && <p style={{color: '#e74c3c', fontSize: 14, marginBottom: 12}}>{error}</p>}
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            autoComplete="off"
            required 
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            autoComplete="new-password"
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{width:'100%'}}>Login</button>
      </form>
      <p className="auth-link">Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  )
}

export default Login