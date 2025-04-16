import NoteInput from "./NoteInput.jsx";
import Note from "./Note.jsx";
import React, { useState, useRef} from "react";
import "./styles/NotesContainer.css";

function NotesContainer() {
	const [notes, setNotes] = useState([]);
	const [editingNote, setEditingNote] = useState(null);
	const nextId = useRef(0);
	const listRef = useRef(null);

	function addNote(newNote) {
		const noteWithId = {
			id: nextId.current++,
			content: newNote.content,
			quantity: newNote.quantity > 0 ? newNote.quantity : 1, // Validar cantidad positiva
			purchased: false,
		};
		setNotes(prevNotes => {
			const notPurchased = [...prevNotes.filter(note => !note.purchased), noteWithId];
			const purchased = prevNotes.filter(note => note.purchased);
			return [...notPurchased, ...purchased];
		});

		setTimeout(() => {
			if (listRef.current) {
				listRef.current.scrollTop = listRef.current.scrollHeight;
			}
		}, 50);
	}

	function deleteNote(id) {
		setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
	}

	function startEditing(note) {
		setEditingNote(note);
	}

	function editNote(id, newContent) {
		setNotes(prevNotes =>
			prevNotes.map(note =>
				note.id === id ? { ...note, content: newContent } : note
			)
		);
		setEditingNote(null);
	}

	function togglePurchased(id) {
		setNotes(prevNotes => {
			const updatedNotes = prevNotes.map(note =>
				note.id === id ? { ...note, purchased: !note.purchased } : note
			);
			const notPurchased = updatedNotes.filter(note => !note.purchased);
			const purchased = updatedNotes.filter(note => note.purchased);
			return [...notPurchased, ...purchased];
		});
	}

	function updateQuantity(id, newQuantity) {
		if (newQuantity <= 0) {
			alert("La cantidad debe ser mayor a 0.");
			return;
		}
		setNotes(prevNotes =>
			prevNotes.map(note =>
				note.id === id ? { ...note, quantity: newQuantity } : note
			)
		);
	}

	return (
		<div className="notes-container">
			<NoteInput
				onAdd={addNote}
				onEdit={editNote}
				editingNote={editingNote}
			/>
			<div className="notes-list" ref={listRef}>
				{notes.map(note => (
				<Note
					key={note.id}
					id={note.id}
					content={note.content}
					quantity={note.quantity}
					purchased={note.purchased || false}
					onDelete={deleteNote}
					onEdit={startEditing}
					onTogglePurchased={togglePurchased}
					onUpdateQuantity={updateQuantity}
				/>
				))}
			</div>
		</div>
	);
}

export default NotesContainer;
