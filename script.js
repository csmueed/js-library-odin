const addButton = document.querySelector(".add-book");
const bookContainer = document.querySelector(".book-container");
const lineContainer = document.querySelector(".line-container");
const formClass = document.querySelector(".formClass");

const bookName = document.querySelector("#book-name");
const authorName = document.querySelector("#author-name");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");

const clearLC = document.querySelector(".clearLC");
const closeBtn = document.querySelector("#close");

let myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  saveLibrary();
  renderBooks();
}

function renderBooks() {
  bookContainer.innerHTML = "";

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.dataset.id = book.id;

    card.innerHTML = `
      <h2><span style="color:red;">Book:</span> ${book.title}</h2>
      <h3><span style="color:maroon;">Author:</span> ${book.author}</h3>
      <h3><span style="color:brown;">Pages:</span> ${book.pages}</h3>
      <h3><span style="color:darkred;">Read:</span> ${
        book.read ? "Yes" : "No"
      }</h3>
      <button class="toggle-read">Toggle Read</button>
      <button class="remove">Remove Book</button>
    `;

    card.querySelector(".remove").addEventListener("click", () => {
      const index = myLibrary.findIndex((b) => b.id === book.id);
      if (index !== -1) {
        myLibrary.splice(index, 1);
        saveLibrary();
        renderBooks();
      }
    });

    card.querySelector(".toggle-read").addEventListener("click", () => {
      book.toggleRead();
      saveLibrary();
      renderBooks();
    });

    bookContainer.appendChild(card);
  });
}

addButton.addEventListener("click", () => {
  lineContainer.classList.add("show");
});

formClass.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    bookName.value.trim() === "" ||
    authorName.value.trim() === "" ||
    pages.value.trim() === ""
  ) {
    alert("⚠️ Please fill in all fields before adding a book.");
    return;
  } else {
    addBookToLibrary(
      bookName.value,
      authorName.value,
      pages.value,
      read.checked
    );

    formClass.reset();
    lineContainer.classList.remove("show");
  }
});

function saveLibrary() {
  localStorage.setItem("library", JSON.stringify(myLibrary));
}

function loadLibrary() {
  let storedLibrary = localStorage.getItem("library");
  if (storedLibrary) {
    myLibrary = JSON.parse(storedLibrary).map(
      (b) => new Book(b.title, b.author, b.pages, b.read)
    );
  }
}

loadLibrary();
renderBooks();

clearLC.addEventListener("click", function (e) {
  localStorage.removeItem("library");
});

closeBtn.addEventListener("click", function (e) {
  lineContainer.classList.remove("show");
});
