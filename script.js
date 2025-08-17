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
});
