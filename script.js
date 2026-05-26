let notes = [];
let currentCard = null;
let editMode = false;
let draggedIndex = null;

const notesContainer = document.querySelector(".notes-container");
const addStickyNote = document.querySelector(".add-sticky-note");
const addNoteModal = document.querySelector(".add-note-modal");
const closeModal = document.querySelector(".close-modal");
const submitButton = document.querySelector(".submit");
const title = document.querySelector(".title");
const description = document.querySelector(".description");

class Note {
  constructor(title, info) {
    this.title = title;
    this.info = info;
  }
}

function addNoteToNotes(title, info) {
  const note = new Note(title, info);
  notes.push(note);
  saveNotes();
  displayNotes();
}

function handleText(text) {
  return text.length > 20 ? text.slice(0, 20) + "..." : text;
}

function saveNotes() {
  localStorage.setItem("data", JSON.stringify(notes));
}

function loadNotes() {
  let arr = localStorage.getItem("data");
  arr ? notes = JSON.parse(arr) : [];
}

function displayNotes() {
  notesContainer.innerHTML = "";

  notes.forEach((note, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.draggable = true;

    const image = document.createElement("img");
    image.src = "./trash.jpg";
    image.classList.add("delete-icon");

    card.innerHTML = `
      <div class="text">
        <h2 class="card-title">${handleText(note.title)}</h2>
        <p class="card-description">${handleText(note.info)}</p>
      </div>
      <div class="images"></div>
    `;

    const text = card.querySelector(".text");

    text.addEventListener("click", () => {
      addNoteModal.showModal();

      title.value = notes[index].title;
      description.value = notes[index].info;

      currentCard = index;
      editMode = true;
    });

    image.addEventListener("click", () => {
      notes.splice(index, 1);
      saveNotes();
      displayNotes();
    });

    card.addEventListener("dragstart", () => draggedIndex = index);
    card.addEventListener("dragover", (event) => event.preventDefault());

    card.addEventListener("drop", () => {
      const draggedItem = notes[draggedIndex];

      notes.splice(draggedIndex, 1);
      notes.splice(index, 0, draggedItem);

      saveNotes();
      displayNotes();
    });

    const imagesSection = card.querySelector(".images");
    imagesSection.appendChild(image);
    notesContainer.appendChild(card);
  });
}

addStickyNote.addEventListener("click", () => {
  addNoteModal.showModal();
  title.value = "";
  description.value = "";
});

closeModal.addEventListener("click", () => addNoteModal.close());

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (editMode) {
    notes.splice(currentCard, 1, new Note(title.value, description.value));
    saveNotes();
  } else {
    addNoteToNotes(title.value, description.value);
  }

  editMode = false;

  saveNotes();
  displayNotes();
  addNoteModal.close();
});

loadNotes();
displayNotes();