let notes = [];
let currentCard = 0;

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

  notes.forEach(note => {
    const card = document.createElement("div");
    card.classList.add("card");

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

    const index = notes.indexOf(note);
    const text = card.querySelector(".text")

    text.addEventListener("click", () => {
      addNoteModal.showModal();
      title.value = notes[index].title;
      description.value = notes[index].info;
      currentCard = index;
    });

    image.addEventListener("click", () => {
      notes.splice(index, 1);
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
  console.log(currentCard)
  event.preventDefault();
  if (notes.indexOf(notes[currentCard])) {
    notes.splice(currentCard, 1, new Note(title.value, description.value));
  } else {
    addNoteToNotes(title.value, description.value);
  }

  displayNotes();
  addNoteModal.close();
});

addNoteToNotes("hellohellohellohellohello", "this is information");
addNoteToNotes("Get Food", "burger");
addNoteToNotes("Get Food", "chips");
addNoteToNotes("Get Food", "chicken");