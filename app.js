
let main = document.querySelector("main")

let myLibrary = [];


function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    read ? this.read ="read" : this.read="Not read"
}

function addBookToLibrary(book){
    myLibrary.push(book);
}

function render(myLibrary){
    for(let book of myLibrary){
    let bookCard = document.createElement("container");
    let title = document.createElement("h6")
    title.innerText = "Title: " + book.title;
    let author = document.createElement("h6")
    author.innerText = "By: " + book.author;
    let pages = document.createElement("h6")
    pages.innerText = "Pages: " + book.pages;
    let read = document.createElement("h6")
    read.innerText = "status: " + book.read;
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    let statusButton = document.createElement("button");
    statusButton.innerText = "Change Status";
    bookCard.append(title);
    bookCard.append(author);
    bookCard.append(pages);
    bookCard.append(read);
    bookCard.append(deleteButton);
    bookCard.append(statusButton);
    main.append(bookCard);
    }
}


const book1 = new Book("The Hobbit", "Bryant", 24, false)

addBookToLibrary(book1);
render(myLibrary)