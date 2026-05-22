const notesContainer = document.querySelector(".notes-container");
const addStickyNote = document.querySelector(".add-sticky-note");
const addNoteModal = document.querySelector(".add-note-modal");
const closeModal = document.querySelector(".close-modal");

addStickyNote.addEventListener("click", () => {
  addNoteModal.showModal();
});

closeModal.addEventListener("click", () => {
  addNoteModal.close();
});