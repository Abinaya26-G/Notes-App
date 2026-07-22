import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import { Save } from 'lucide-react'

function ProfileEdit() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) setName(user.name)
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!name.trim()) {
      setError('Name is required')
      return
    }
    try {
      await api.put('/profile', { name, password: password || undefined })
      logout()
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.error || 'Update failed')
    }
  }

  return (
    <div className="card" style={{ maxWidth: 500, margin: '0 auto' }}>
      <h2 style={{ marginBottom: 20 }}><Save size={22} style={{verticalAlign:'middle'}} /> Edit Profile</h2>
      {error && <p style={{color: '#e74c3c', fontSize: 14, marginBottom: 12}}>{error}</p>}
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="form-group">
          <label>Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            autoComplete="off"
            required 
          />
        </div>
        <div className="form-group">
          <label>New Password (leave blank to keep current)</label>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            autoComplete="new-password"
          />
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" className="btn btn-primary"><Save size={18} /> Save</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/profile')}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default ProfileEdit