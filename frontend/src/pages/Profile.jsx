import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { User, Edit, LogOut } from 'lucide-react'

function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) return null

  return (
    <div className="profile-page card">
      <h2 style={{ marginBottom: 20 }}><User size={22} style={{verticalAlign:'middle'}} /> Profile</h2>
      <div className="profile-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button className="btn btn-primary" onClick={() => navigate('/profile/edit')}><Edit size={18} /> Edit Profile</button>
        <button className="btn btn-danger" onClick={() => { logout(); navigate('/login') }}><LogOut size={18} /> Logout</button>
      </div>
    </div>
  )
}

export default Profile
