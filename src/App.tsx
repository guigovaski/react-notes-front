import './App.css';
import { useState, useEffect, MouseEvent } from 'react';
import { FaPlus } from 'react-icons/fa'

import { Header } from './components/partials/Header';
import { Note } from './components/Note';
import api from './services/api';
import { NotesType } from './types';

function App() {
  const [notes, setNotes] = useState<NotesType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [modalId, setModalId] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const res = await api.getNotes();
      if (res.length > 0) {
        setNotes(res);
      }
    })()
  }, []);

  async function handleSendNote(id: number) {
    // update a existing note
    if (modalId) {
      const res = await api.updateNote(id, title, body);
      let filteredNotes = [...notes].filter(item => item.id !== id);
      setNotes([res, ...filteredNotes]);
      clearModal();
    } else {
      // add new note
      if (!title || !body) return alert('Preencha todos os campos para criar uma nova nota');
      
      const res = await api.addNote(title, body);
      setNotes([res, ...notes]);
      clearModal();
    }
  }

  function handleEditButton(id: number) {
    setShowModal(true);
    setModalId(id);
  }

  function handleCloseModal(e: MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget)
      setShowModal(false);
  }

  async function handleDeleteNote(id: number) {
    await api.deleteNote(id);
    let filteredNotes = [...notes].filter(item => item.id !== id);
    setNotes(filteredNotes);
  }

  function clearModal() {
      setTitle('');
      setBody('');
      setModalId(null);
      setShowModal(false);
  }

  return (
    <>
      <Header />
      
      <main>
        <button 
            className="plus-button" 
            type="button"
            onClick={() => setShowModal(true)}
          >
          <FaPlus size={25} color="#FFF" />
        </button>
        {showModal && 
          <div className="bg-modal" onClick={handleCloseModal}>
            <div className="container">
                <label>
                    Title:
                    <input onChange={e => setTitle(e.target.value)} value={title} />
                </label>
                <label>
                    Body:
                    <input onChange={e => setBody(e.target.value)} value={body} />
                </label>
                <button type="button" onClick={() => handleSendNote(modalId as number)}>Enviar</button>
            </div>
          </div>
        }
        {notes && notes.map((item, index) => (
          <Note 
            key={index} 
            data={item} 
            handleEdit={() => handleEditButton(item.id)} 
            handleDelete={() => handleDeleteNote(item.id)}
            />
        ))}
      </main>
    </>
  );
}

export default App;
