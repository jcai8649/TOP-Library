
let main = document.querySelector("main")

let myLibrary = [];

//constructor
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;


}

function books(){}

//toggle function for read status
books.prototype.toggleRead = function(){
    if(this.read === "Read"){
        this.read = "Not Read";
        return;
    }
    else if(this.read === "Not Read"){
        this.read = "Read";
        return;
    }
}

Book.prototype = Object.create(books.prototype);


function changeRead(bookIndex){
    let updatedBook = myLibrary[bookIndex]
    updatedBook.toggleRead();
    myLibrary.splice(bookIndex, 1, updatedBook);
    render(myLibrary);
}


function addBookToLibrary(book){
    myLibrary.push(book);
}

//create and append book info into main after clearing the main elements
function render(library){
    mainClear();
    for(let book of library){
            let bookCard = document.createElement("section");
            bookCard.classList.add("contain")
            bookCard.classList.add("text-center");
            bookCard.setAttribute("id", library.indexOf(book));
            let title = document.createElement("h6")
            title.innerText = "Title: " + book.title;
            let author = document.createElement("h6")
            author.innerText = "By: " + book.author;
            let pages = document.createElement("h6")
            pages.innerText = "Pages: " + book.pages;
            let read = document.createElement("h6")
            read.innerText = "Status: " + book.read;
            let deleteButton = document.createElement("button");
            deleteButton.classList.add("delete");
            deleteButton.classList.add("btn");
            deleteButton.classList.add("btn-danger");
            deleteButton.innerText = "Delete";
            deleteButton.setAttribute("onclick", `deleteBook(${library.indexOf(book)})`);
            let statusButton = document.createElement("button");
            statusButton.classList.add("changeStat");
            statusButton.classList.add("btn");
            statusButton.classList.add("btn-info");
            statusButton.innerText = "Change Status";
            statusButton.setAttribute("onclick", `changeRead(${library.indexOf(book)})`);
            bookCard.append(title);
            bookCard.append(author);
            bookCard.append(pages);
            bookCard.append(read);
            bookCard.append(deleteButton);
            bookCard.append(statusButton);
            book.id = library.indexOf(book);
            main.append(bookCard);
        }
    }


function addBook(){
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let status = document.querySelectorAll(`input[name="status"]`);
    let selectedValue;
    for (let stat of status){
        if(stat.checked){
            selectedValue = stat.value;
            break;
        } 
    }
    if (validation()){
        let newTitle = new Book(title, author, pages, selectedValue);
        addBookToLibrary(newTitle);
        render(myLibrary);
        formReset();
    } else {
        alert("Please fill in all required information")
    }
}


function deleteBook(deleteIndex){
    let deleteChild = document.getElementById(deleteIndex);
    myLibrary.splice(deleteIndex,1);
    main.removeChild(deleteChild);
}

function formReset(){
    document.querySelector("form").reset();
}


function validation(){
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let status = document.querySelectorAll(`input[name="status"]`);
    let selectedValue;
    for (const stat of status){
        if(stat.checked){
            selectedValue = stat.value;
            break;
        }
    }

    if(title === "" || author === "" || pages === "" || !selectedValue){
        return false;
    }
    return true;
}

//removes all the child from main to reset the DOM
function mainClear(){
    let first = main.firstElementChild;
    while (first){
        first.remove();
        first = main.firstElementChild;
    }
}


const book1 = new Book("The Alchemist", "Paulo Coelho", "163", "Read")
const book2 = new Book("The Last Dance", "Michael Jordan", "10", "Not Read")
addBookToLibrary(book1);
addBookToLibrary(book2);
render(myLibrary)
