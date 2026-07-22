import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import ConfirmDialog from '../components/ConfirmDialog'
import { Star, Check, Edit, Trash2, Eye } from 'lucide-react'

function NotesList() {
  const { user } = useAuth()
  const [notes, setNotes] = useState([])
  const [stats, setStats] = useState({ total: 0, draft: 0, pending: 0, completed: 0, pinned: 0 })
  const [filter, setFilter] = useState('ALL')
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const fetchNotes = async () => {
    try {
      let res
      if (filter === 'ALL') {
        res = await api.get('/notes')
      } else {
        res = await api.get(`/notes/status/${filter}`)
      }
      setNotes(res.data)
      setError('')
    } catch (err) {
      // 401 handled by api interceptor
    }
  }

  const fetchStats = async () => {
    try {
      const res = await api.get('/notes/stats')
      setStats(res.data)
    } catch (err) {
      // 401 handled by api interceptor
    }
  }

  useEffect(() => {
    if (!user) return
    fetchNotes()
    fetchStats()
  }, [filter, user])

  const handlePin = async (id) => {
    try {
      await api.patch(`/notes/${id}/pin`)
      fetchNotes()
      fetchStats()
    } catch (err) {
      setError('Failed to pin note')
    }
  }

  const handleComplete = async (id) => {
    try {
      await api.patch(`/notes/${id}/complete`)
      fetchNotes()
      fetchStats()
    } catch (err) {
      setError('Failed to complete note')
    }
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/notes/${deleteId}`)
      setDeleteId(null)
      fetchNotes()
      fetchStats()
    } catch (err) {
      setError('Failed to delete note')
    }
  }

  const filteredNotes = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase())
  )

  const tabs = [
    { key: 'ALL', label: `All (${stats.total})` },
    { key: 'DRAFT', label: `Draft (${stats.draft})` },
    { key: 'PENDING', label: `Pending (${stats.pending})` },
    { key: 'COMPLETED', label: `Completed (${stats.completed})` },
  ]

  if (!user) return null

  return (
    <div>
      <div className="stats-grid">
        <div className="stat-card"><h3>{stats.total}</h3><p>All Notes</p></div>
        <div className="stat-card"><h3>{stats.draft}</h3><p>Drafts</p></div>
        <div className="stat-card"><h3>{stats.pending}</h3><p>Pending</p></div>
        <div className="stat-card"><h3>{stats.completed}</h3><p>Completed</p></div>
        <div className="stat-card"><h3>{stats.pinned}</h3><p>Pinned</p></div>
      </div>

      {error && <p style={{color: '#e74c3c', fontSize: 14, marginBottom: 12}}>{error}</p>}

      <input
        type="text"
        className="search-bar"
        placeholder="Search notes by title or content..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        autoComplete="off"
      />

      <div className="tabs">
        {tabs.map(t => (
          <button
            key={t.key}
            className={`tab ${filter === t.key ? 'active' : ''}`}
            onClick={() => setFilter(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {filteredNotes.length === 0 ? (
        <div className="empty-state">
          <p>No notes found.</p>
        </div>
      ) : (
        <div className="notes-grid">
          {filteredNotes.map(note => (
            <div key={note.id} className={`note-card ${note.pinned ? 'pinned' : ''}`}>
              <div className="note-card-header">
                <Link to={`/notes/${note.id}`} className="note-card-title">{note.title}</Link>
                <button className={`icon-btn ${note.pinned ? 'pinned' : ''}`} onClick={() => handlePin(note.id)}>
                  <Star size={18} fill={note.pinned ? '#f1c40f' : 'none'} />
                </button>
              </div>
              <div className="note-card-content">{note.content}</div>
              <div className="note-card-footer">
                <span className={`note-status status-${note.status.toLowerCase()}`}>{note.status}</span>
                <div className="note-actions">
                  {note.status === 'PENDING' && (
                    <button className="icon-btn" onClick={() => handleComplete(note.id)} title="Mark Complete">
                      <Check size={18} />
                    </button>
                  )}
                  <button className="icon-btn" onClick={() => navigate(`/notes/edit/${note.id}`)} title="Edit">
                    <Edit size={18} />
                  </button>
                  <button className="icon-btn" onClick={() => navigate(`/notes/${note.id}`)} title="View">
                    <Eye size={18} />
                  </button>
                  <button className="icon-btn" onClick={() => setDeleteId(note.id)} title="Delete">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteId && (
        <ConfirmDialog
          message="Are you sure you want to delete this note?"
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  )
}

export default NotesList