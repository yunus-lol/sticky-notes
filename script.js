let notes = [];

const notesContainer = document.querySelector(".notes-container");
const addStickyNote = document.querySelector(".add-sticky-note");
const addNoteModal = document.querySelector(".add-note-modal");
const closeModal = document.querySelector(".close-modal");
const submitButton = document.querySelector(".submit")
const cardTitle = document.querySelector(".title");
const cardInfo = document.querySelector(".description");

class Note {
  constructor(title, info) {
    this.title = title;
    this.info = info;
  }
}

function addNoteToNotes(title, info) {
  const note = new Note(title, info);
  notes.push(note);
  displayNotes();
}

function displayNotes() {
  notesContainer.innerHTML = ""
  notes.forEach(note => {
    const card = document.createElement("div");
    card.classList.add("card")
    card.innerHTML = `
      <h2>${note.title}</h2>
      <p>${note.info}</p>
    `;
    notesContainer.appendChild(card)
  });
}

addStickyNote.addEventListener("click", () => {
  addNoteModal.showModal();
  cardTitle.value = "";
  cardInfo.value = "";
});

closeModal.addEventListener("click", () => addNoteModal.close());

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  const title = cardTitle.value;
  const info = cardInfo.value;
  addNoteToNotes(title, info)
  displayNotes();
  addNoteModal.close();
});

addNoteToNotes("hello", "this is information")
addNoteToNotes("Get Food", "woooooooooooooooooooo")