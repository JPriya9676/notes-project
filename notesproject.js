// Select elements
const addNoteBtn = document.getElementById('addNoteBtn');
const notesContainer = document.getElementById('notesContainer');

// Load notes from localStorage
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Function to save notes
function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to render notes
function renderNotes() {
    notesContainer.innerHTML = '';
    notes.forEach((note, index) => {
        const noteEl = document.createElement('div');
        noteEl.classList.add('note');
        noteEl.contentEditable = true;
        noteEl.innerText = note;

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerText = '×';
        deleteBtn.onclick = () => {
            notes.splice(index, 1);
            saveNotes();
            renderNotes();
        };

        noteEl.appendChild(deleteBtn);

        // Update note on blur
        noteEl.addEventListener('blur', () => {
            notes[index] = noteEl.innerText.replace('×','').trim();
            saveNotes();
        });

        notesContainer.appendChild(noteEl);
    });
}

// Add new note
addNoteBtn.addEventListener('click', () => {
    notes.push('New Note');
    saveNotes();
    renderNotes();
});

// Initial render
renderNotes();
