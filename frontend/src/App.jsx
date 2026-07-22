import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import NotesList from './pages/NotesList'
import NoteForm from './pages/NoteForm'
import NoteDetail from './pages/NoteDetail'
import Profile from './pages/Profile'
import ProfileEdit from './pages/ProfileEdit'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '60vh',
        color: '#888'
      }}>
        <p>Loading...</p>
      </div>
    )
  }
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '60vh',
        color: '#888'
      }}>
        <p>Loading...</p>
      </div>
    )
  }
  
  if (user) {
    return <Navigate to="/" replace />
  }
  
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/" element={<PrivateRoute><NotesList /></PrivateRoute>} />
      <Route path="/notes" element={<PrivateRoute><NotesList /></PrivateRoute>} />
      <Route path="/notes/new" element={<PrivateRoute><NoteForm /></PrivateRoute>} />
      <Route path="/notes/edit/:id" element={<PrivateRoute><NoteForm /></PrivateRoute>} />
      <Route path="/notes/:id" element={<PrivateRoute><NoteDetail /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/profile/edit" element={<PrivateRoute><ProfileEdit /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <div className="container">
        <AppRoutes />
      </div>
    </AuthProvider>
  )
}

export default App