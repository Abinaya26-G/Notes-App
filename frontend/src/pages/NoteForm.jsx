import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'
import { Save, FileText } from 'lucide-react'

function NoteForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('PENDING')
  const [error, setError] = useState('')

  useEffect(() => {
    if (isEdit) {
      api.get(`/notes/${id}`).then(res => {
        setTitle(res.data.title)
        setContent(res.data.content)
        setStatus(res.data.status)
      }).catch(() => {
        setError('Note not found')
        navigate('/')
      })
    }
  }, [id, isEdit, navigate])

  const handleSubmit = async (e, asDraft = false) => {
    e.preventDefault()
    setError('')
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required')
      return
    }
    try {
      const data = { title, content, status: asDraft ? 'DRAFT' : status }
      if (isEdit) {
        await api.put(`/notes/${id}`, data)
      } else {
        if (asDraft) {
          await api.post('/notes/draft', data)
        } else {
          await api.post('/notes', data)
        }
      }
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Operation failed')
    }
  }

  return (
    <div className="card" style={{ maxWidth: 700, margin: '0 auto' }}>
      <h2 style={{ marginBottom: 20 }}>
        {isEdit ? <><FileText size={22} style={{verticalAlign:'middle'}} /> Edit Note</> : <><FileText size={22} style={{verticalAlign:'middle'}} /> New Note</>}
      </h2>
      {error && <p style={{color: '#e74c3c', fontSize: 14, marginBottom: 12}}>{error}</p>}
      <form onSubmit={(e) => handleSubmit(e, false)} autoComplete="off">
        <div className="form-group">
          <label>Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            autoComplete="off"
            required 
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea 
            rows={8} 
            value={content} 
            onChange={e => setContent(e.target.value)} 
            autoComplete="off"
            required 
          />
        </div>
        {isEdit && (
          <div className="form-group">
            <label>Status</label>
            <select value={status} onChange={e => setStatus(e.target.value)}>
              <option value="DRAFT">Draft</option>
              <option value="PENDING">Pending</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
        )}
        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" className="btn btn-primary">
            <Save size={18} /> {isEdit ? 'Update' : 'Create Note'}
          </button>
          {!isEdit && (
            <button type="button" className="btn btn-outline" onClick={(e) => handleSubmit(e, true)}>
              Save as Draft
            </button>
          )}
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default NoteForm