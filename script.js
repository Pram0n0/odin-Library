let myLibrary = [
    {
      title: "A Game of Thrones",
      author: "George R. R. Martin",
      pages: 694,
      read: false
    }
  ];

class Book{
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function addBookToLibrary() {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let read = document.querySelector("#read").checked;
    var newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    renderBooks();
}

function renderBooks() {
    let libraryOfBooks = document.querySelector("#libraryOfBooks")
    libraryOfBooks.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];
        let bookDisplay = document.createElement("div");
        bookDisplay.classList.add("books")
        bookDisplay.innerHTML = 
        `
        <p>${book.title}</p>
        <p>${book.author}</p>
        <p>${book.pages}</p>
        <button class="read_button" data-id=${i}>${book.read ? "Read": "Not Read"}</button>
        <button class="remove_button" data-id=${i}>Remove</button>
        `
        libraryOfBooks.appendChild(bookDisplay);
    }
    buttonListeners();
}

function removeBooks(index) {
    myLibrary.splice(index, 1);
    renderBooks();
}

function buttonListeners() {
    let removeBookBtn = document.querySelectorAll(".books > .remove_button")
    removeBookBtn.forEach((button) => {
        button.addEventListener("click", function() {
            let bookId = button.dataset.id;
            removeBooks(bookId);
        })
    })

    let readButton = document.querySelectorAll(".books > .read_button")
    readButton.forEach((button) => {
        button.addEventListener("click", function() {
            let bookId = button.dataset.id;
            console.log(bookId)
            toggleRead(bookId)
        })
    })
}

function toggleRead(index) {
    myLibrary[index].read = !myLibrary[index].read;
    renderBooks();
}

document.addEventListener('DOMContentLoaded', function() {

    let newBookBtn = document.querySelector("#new_book_button")
    newBookBtn.addEventListener("click", function () {
        let newBookForm = document.querySelector("#new_book_form")
        newBookForm.style.display = "block";
    });

    let addBookBtn = document.querySelector("#add_book_button");
    addBookBtn.addEventListener("click", function (event) {
        event.preventDefault();
        addBookToLibrary();
        
        let newBookForm = document.querySelector("#new_book_form");
        newBookForm.style.display = "none";
    });
});
