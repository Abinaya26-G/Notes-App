import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { BookOpen, PlusCircle, User, LogOut } from 'lucide-react'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to={user ? "/" : "/login"} className="navbar-brand">NotesApp</Link>
        {user ? (
          <div className="navbar-links">
            <Link to="/notes"><BookOpen size={18} /> Notes</Link>
            <Link to="/notes/new"><PlusCircle size={18} /> New Note</Link>
            <Link to="/profile"><User size={18} /> Profile</Link>
            <button onClick={handleLogout}><LogOut size={18} /> Logout</button>
          </div>
        ) : (
          <div className="navbar-links">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar