import { useState, useEffect, useCallback } from 'react';

interface Note {
    _id: string;
    title: string;
    content: string;
    userId: string;
}

interface User {
    username: string;
    email: string;
}

function Dashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [notes, setNotes] = useState<Note[]>([]);
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [editId, setEditId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const token = localStorage.getItem('token');

    const fetchUser = useCallback(async () => {
        const res = await fetch('https://notid-backend.onrender.com/api/user', {
            headers: {'Authorization': `Bearer ${token}`}
        });
        const data = await res.json();
        setUser(data);
    }, [token]);

    const fetchNotes = useCallback(async () => {
        const res = await fetch('https://notid-backend.onrender.com/api/notes', {
            headers: {'Authorization': `Bearer ${token}`}
        });
        const data = await res.json();
        setNotes(data);
    }, [token]);

    const createNote = async () => {
        await fetch('https://notid-backend.onrender.com/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({title, content})
        });
        setTitle('');
        setContent('');
        fetchNotes();
    };

    const startEdit = (note: Note) => {
        setEditId(note._id);
        setEditTitle(note.title);
        setEditContent(note.content);
    };

    const updateNote = async () => {
        await fetch(`https://notid-backend.onrender.com/api/notes/${editId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({title: editTitle, content: editContent})
        });
        setEditId(null);
        fetchNotes();
    };

    const deleteNote = async (id: string) => {
        await fetch(`https://notid-backend.onrender.com/api/notes/${id}`, {
            method: 'DELETE',
            headers: {'Authorization': `Bearer ${token}`}
        });
        fetchNotes();
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/';  // Redirect if no token
            return;
        }
        // eslint-disable-next-line
        fetchUser();
        fetchNotes();
    }, [fetchUser, fetchNotes]);

    return (
    <div style={{minHeight: '100vh', backgroundColor: '#f5f5f5'}}>
        {/* Header */}
        {user && (
            <div className='user-container' style={{
                padding: '20px 40px',
                backgroundColor: '#2c3e50',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <h2 style={{margin: 0}}>Welcome, {user.username}!</h2>
                </div>
                <button style={{
                    padding: '10px 20px',
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }} onClick={handleLogout}>Logout</button>
            </div>
        )}

        {/* Create Note Form */}
        <div style={{
            maxWidth: '800px',
            margin: '30px auto',
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
            <h3>Create New Note</h3>
            <input 
                placeholder="Title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px'
                }}
            />
            <textarea 
                placeholder="Content" 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    minHeight: '100px',
                    fontSize: '16px'
                }}
            />
            <button 
                onClick={createNote}
                style={{
                    padding: '10px 30px',
                    backgroundColor: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px'
                }}
            >Add Note</button>
        </div>

        {/* Notes List */}
        <div style={{maxWidth: '800px', margin: '0 auto', padding: '0 20px'}}>
            {notes.map(note => (
                <div key={note._id} style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    marginBottom: '15px',
                    borderRadius: '10px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}>
                    {notes.map(note => (
    <div key={note._id} style={{
        backgroundColor: 'white',
        padding: '20px',
        marginBottom: '15px',
        borderRadius: '10px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
        {editId === note._id ? (
            // Edit Mode
            <>
                <input 
                    value={editTitle} 
                    onChange={(e) => setEditTitle(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginBottom: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        fontSize: '18px',
                        fontWeight: 'bold'
                    }}
                />
                <textarea 
                    value={editContent} 
                    onChange={(e) => setEditContent(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginBottom: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        minHeight: '100px',
                        fontSize: '16px'
                    }}
                />
                <button onClick={updateNote} style={{
                    padding: '8px 20px',
                    backgroundColor: '#27ae60',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginRight: '10px'
                }}>Save</button>
                <button onClick={() => setEditId(null)} style={{
                    padding: '8px 20px',
                    backgroundColor: '#95a5a6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}>Cancel</button>
            </>
        ) : (
            // View Mode
            <>
                <h3 style={{margin: '0 0 10px 0', color: '#2c3e50'}}>{note.title}</h3>
                
                {expandedId === note._id && (
                    <p style={{
                        margin: '10px 0',
                        color: '#555',
                        lineHeight: '1.6'
                    }}>{note.content}</p>
                )}
                
                <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
                    <button 
                        onClick={() => setExpandedId(expandedId === note._id ? null : note._id)}
                        style={{
                            padding: '8px 15px',
                            backgroundColor: '#3498db',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        {expandedId === note._id ? 'Collapse' : 'Read More'}
                    </button>
                    <button 
                        onClick={() => startEdit(note)}
                        style={{
                            padding: '8px 15px',
                            backgroundColor: '#f39c12',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >Update</button>
                    <button 
                        onClick={() => deleteNote(note._id)}
                        style={{
                            padding: '8px 15px',
                            backgroundColor: '#e74c3c',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >Delete</button>
                </div>
            </>
        )}
    </div>
))}
                </div>
            ))}
        </div>
    </div>
);
}

export default Dashboard;