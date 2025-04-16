import "./styles/Note.css";
import { useState, useEffect, useRef } from "react";

function Note(props) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editableContent, setEditableContent] = useState(props.content);
    const textareaRef = useRef(null);

    useEffect(() => {
        setFadeIn(true);
    }, []);

    useEffect(() => {
        if (isEditing && textareaRef.current) {
            adjustTextareaSize();
        }
    }, [isEditing, editableContent]);

    function handleDeleteClick() {
        setIsDeleting(true);
        setTimeout(() => {
            props.onDelete(props.id);
        }, 150);
    }

    function handleEditClick() {
        setIsEditing(true);
    }

    function handleSaveClick() {
        if (editableContent.trim() === "") {
            alert("El contenido no puede estar vacío.");
            return;
        }
        props.onEdit(props.id, editableContent);
        setIsEditing(false);
    }

    function handleInputChange(e) {
        setEditableContent(e.target.value);
        adjustTextareaSize();
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            if (editableContent.trim() === "") {
                alert("El contenido no puede estar vacío.");
                return;
            }
            props.onEdit(props.id, editableContent);
            setIsEditing(false);
        }
    }

    function adjustTextareaSize() {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }

    return (
        <div className={`note ${isDeleting ? "fade-out" : fadeIn ? "fade-in" : ""}`}>
            <div className="note-content">
                <input
                    type="checkbox"
                    checked={props.purchased}
                    onChange={() => props.onTogglePurchased(props.id)}
                />
                {isEditing ? (
                    <div className="note-edit-container">
                        <textarea
                            value={editableContent}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            ref={textareaRef}
                            className="note-edit-input"
                            rows="1"
                        />
                    </div>
                ) : (
                    <p className={props.purchased ? "purchased" : ""}>
                        {editableContent}
                    </p>
                )}
            </div>
            <div className="note-buttons">
                <input
                    type="number"
                    className="note-quantity"
                    value={props.quantity}
                    min="1"
                    onChange={e => props.onUpdateQuantity(props.id, parseInt(e.target.value, 10))}
                />
                {isEditing ? (
                    <button onClick={handleSaveClick}>
                        <span className="material-symbols-outlined">check</span>
                    </button>
                ) : (
                    <button onClick={handleEditClick}>
                        <span className="material-symbols-outlined">edit</span>
                    </button>
                )}
                <button onClick={handleDeleteClick}>
                    <span className="material-symbols-outlined">delete</span>
                </button>
            </div>
        </div>
    );
}

export default Note;
