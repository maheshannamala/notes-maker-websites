// Navigate to the subject's notes page
function navigateTo(subject) {
    localStorage.setItem("currentSubject", subject);
    window.location.href = "subject.html";
}

// Populate the subject header and notes list
window.onload = function () {
    const subject = localStorage.getItem("currentSubject");
    if (subject) {
        const header = document.getElementById("subject-header");
        const title = document.getElementById("subject-title");
        if (header) header.innerText = `${subject} Notes`;
        if (title) title.innerText = subject;

        loadNotes(subject);
    }
};

// Add a new note
function addNote() {
    const noteInput = document.getElementById("note-input");
    const noteText = noteInput.value.trim();
    if (noteText) {
        const notesList = document.getElementById("notes-list");
        const noteItem = document.createElement("div");
        noteItem.className = "note-item";
        noteItem.innerHTML = `
            <span>${noteText}</span>
            <button onclick="deleteNote(this)">Delete</button>
        `;
        notesList.appendChild(noteItem);
        noteInput.value = "";
    }
}

// Delete a note
function deleteNote(button) {
    const noteItem = button.parentNode;
    noteItem.remove();
}

// Save notes to localStorage
function saveNotes() {
    const subject = localStorage.getItem("currentSubject");
    const notes = [];
    document.querySelectorAll("#notes-list .note-item span").forEach((note) => {
        notes.push(note.textContent);
    });
    localStorage.setItem(`${subject}-notes`, JSON.stringify(notes));
    alert("Notes saved!");
}

// Load notes from localStorage
function loadNotes(subject) {
    const savedNotes = JSON.parse(localStorage.getItem(`${subject}-notes`)) || [];
    const notesList = document.getElementById("notes-list");
    savedNotes.forEach((noteText) => {
        const noteItem = document.createElement("div");
        noteItem.className = "note-item";
        noteItem.innerHTML = `
            <span>${noteText}</span>
            <button onclick="deleteNote(this)">Delete</button>
        `;
        notesList.appendChild(noteItem);
    });
}
