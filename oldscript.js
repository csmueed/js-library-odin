const body = document.querySelector("body");
const formContainer = document.querySelector(".form-container");
const addButton = document.querySelector(".add-book");
const bookContainer = document.querySelector(".book-container");
const lineContainer = document.querySelector(".line-container");
const formClass = document.querySelector(".formClass");
const finalAdd = document.querySelector(".final-add");
const bookName = document.querySelector("#book-name");
const authorName = document.querySelector("#author-name");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");

const Library = [];

addButton.addEventListener("click", function (e) {
  lineContainer.classList.add("show");
});

finalAdd.addEventListener("click", function (e) {
  e.preventDefault();

  const name1 = bookName.value;
  const author1 = authorName.value;
  const pages1 = pages.value;
  let readStatus;
  if (read.checked) {
    readStatus = true;
  } else {
    readStatus = false;
  }

  const newBookObj = {
    id: crypto.randomUUID(),
    myBookName: name1,
    myAuthorName: author1,
    myTotalPages: pages1,
    myReadStatus: readStatus,
  };

  Library.push(newBookObj);

  console.log(Library);

  formClass.reset();
  lineContainer.classList.remove("show");
  renderBooks();
});

function renderBooks() {
  bookContainer.innerHTML = "";
  Library.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.innerHTML = `<h2 class="title"><span class="titleStyle">Book Name:</span> ${item.myBookName}</h2>
            <h3 class="author-title"><span class="authorStyle">Author Name:</span> ${item.myAuthorName}</h3>
            <h3 class="pageFinal"><span class="pageStyle">Total Pages:</span> ${item.myTotalPages}</h3>
            <h3 class="readStats"><span class="readStyle">Reading Status:</span> ${item.myReadStatus ? "Yes" : "No"}</h3>
            <button class="remove">Remove Book</button>`;
    bookContainer.appendChild(card);

    const removeBtn = card.querySelector(".remove");
    removeBtn.addEventListener("click", function () {
      const index = Library.findIndex((b) => b.id === item.id); // find position
      if (index !== -1) {
        Library.splice(index, 1); // remove from array
        renderBooks(); // refresh UI
      }
    });
  });
}
