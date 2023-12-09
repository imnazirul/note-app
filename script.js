const btnEl = document.querySelector(".btn");
const inputEl = document.getElementById("note-input");
const dynamicEl = document.querySelector(".dynamic-container");

//onclick btn evnet
btnEl.addEventListener("click", () => {
  addNote();
});

//addingnote
function addNote() {
  let notes = getNotes();
  const noteObj = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };
  notes.push(noteObj);

  const noteTextEl = createNoteEl(noteObj.id, noteObj.content);
  dynamicEl.insertBefore(noteTextEl, btnEl);

  saveNote(notes);
}

function createNoteEl(id, content) {
  const textElement = document.createElement("textarea");
  textElement.className = "note-input";
  textElement.placeholder = "Empty Note";
  textElement.value = content;

  textElement.addEventListener("dblclick", () => {
    let warning = confirm("Are you sure want delete the note?");
    if (warning) {
      deleteNote(id, textElement);
    }
  });

  textElement.addEventListener("input", (event) => {
    updateNote(id, textElement.value);
  });

  return textElement;
}

//update, delete, save, get notes

function deleteNote(id, Element) {
  const notes = getNotes().filter((obj) => {
    return obj.id != id;
  });

  saveNote(notes);
  dynamicEl.removeChild(Element);
}

function updateNote(id, content) {
  const notes = getNotes();
  let target = notes.filter((obj) => obj.id === id)[0];

  target.content = content;

  saveNote(notes);
}

//localstorage get and set notes or items

function getNotes() {
  return JSON.parse(localStorage.getItem("note")) || [];
}

function saveNote(notes) {
  localStorage.setItem("note", JSON.stringify(notes));
}

//showing saved notes
getNotes().forEach((obj) => {
  const noteEl = createNoteEl(obj.id, obj.content);

  dynamicEl.insertBefore(noteEl, btnEl);
});
