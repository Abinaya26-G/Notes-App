import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'
import ConfirmDialog from '../components/ConfirmDialog'
import { Star, Check, Edit, Trash2, ArrowLeft } from 'lucide-react'

function NoteDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [note, setNote] = useState(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get(`/notes/${id}`).then(res => setNote(res.data)).catch(() => {
      setError('Note not found')
      navigate('/')
    })
  }, [id, navigate])

  const handlePin = async () => {
    try {
      const res = await api.patch(`/notes/${id}/pin`)
      setNote(res.data)
    } catch {
      setError('Failed')
    }
  }

  const handleComplete = async () => {
    try {
      const res = await api.patch(`/notes/${id}/complete`)
      setNote(res.data)
    } catch {
      setError('Failed')
    }
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/notes/${id}`)
      navigate('/')
    } catch {
      setError('Failed to delete')
    }
  }

  if (!note) return null

  return (
    <div className="note-detail card">
      <div className="note-detail-header">
        <button className="btn btn-secondary" onClick={() => navigate('/')}><ArrowLeft size={18} /> Back</button>
        <div style={{ display: 'flex', gap: 8 }}>
          {note.status === 'PENDING' && (
            <button className="btn btn-primary" onClick={handleComplete}><Check size={18} /> Complete</button>
          )}
          <button className={`btn ${note.pinned ? 'btn-primary' : 'btn-outline'}`} onClick={handlePin}>
            <Star size={18} fill={note.pinned ? '#fff' : 'none'} /> {note.pinned ? 'Unpin' : 'Pin'}
          </button>
          <button className="btn btn-secondary" onClick={() => navigate(`/notes/edit/${id}`)}><Edit size={18} /> Edit</button>
          <button className="btn btn-danger" onClick={() => setDeleteOpen(true)}><Trash2 size={18} /> Delete</button>
        </div>
      </div>
      {error && <p style={{color: '#e74c3c', fontSize: 14, marginBottom: 12}}>{error}</p>}
      <h2 style={{ marginBottom: 8 }}>{note.title}</h2>
      <span className={`note-status status-${note.status.toLowerCase()}`} style={{ marginBottom: 20, display: 'inline-block' }}>
        {note.status}
      </span>
      <div className="note-detail-content">{note.content}</div>
      <p style={{ marginTop: 20, fontSize: 13, color: '#888' }}>
        Created: {new Date(note.createdAt).toLocaleString()} &nbsp;|&nbsp;
        Updated: {new Date(note.updatedAt).toLocaleString()}
      </p>

      {deleteOpen && (
        <ConfirmDialog
          message="Are you sure you want to delete this note?"
          onConfirm={handleDelete}
          onCancel={() => setDeleteOpen(false)}
        />
      )}
    </div>
  )
}

export default NoteDetail