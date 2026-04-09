const addNoteBtn = document.getElementById('addNoteBtn');
const notesContainer = document.getElementById('notesContainer');
let notes = JSON.parse(localStorage.getItem('notes')) || [];
function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}
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

addNoteBtn.addEventListener('click', () => {
    notes.push('New Note');
    saveNotes();
    renderNotes();
});

// Initial render
renderNotes();
