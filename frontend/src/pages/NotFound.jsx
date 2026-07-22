import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="empty-state">
      <h2 style={{ fontSize: 48, marginBottom: 16 }}>404</h2>
      <p>Page not found.</p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: 20 }}>Go Home</Link>
    </div>
  )
}

export default NotFound
