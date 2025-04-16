import { useState } from "react";
import "./styles/NoteInput.css";

function NoteInput({ onAdd, onEdit, editingNote }) {
    const [noteContent, setNoteContent] = useState(editingNote ? editingNote.content : "");
    const [isEditing, setIsEditing] = useState(!!editingNote);

    function handleChange(event) {
        setNoteContent(event.target.value);
    }

    function submitNote(event) {
        event.preventDefault();
        if (noteContent.trim()) {
            if (isEditing) {
                onEdit(editingNote.id, noteContent);
                setIsEditing(false);
            } else {
                onAdd({ content: noteContent });
            }
            setNoteContent("");
        } else {
            alert("Por favor, ingrese una nota");
        }
    }

    return (
        <div className="note-input-container">
            <form className="note-input" onSubmit={submitNote}>
                <input
                    className="input-content"
                    type="text"
                    name="content"
                    placeholder={isEditing ? "Editando nota..." : "Ingrese un item"}
                    value={noteContent}
                    onChange={handleChange}
                />
                <input
                    type="submit"
                    className="submit-button"
                    value={isEditing ? "✔" : "＋"}
                />
            </form>
        </div>
    );
}

export default NoteInput;
