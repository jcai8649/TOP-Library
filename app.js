
let main = document.querySelector("main")

let myLibrary = [];


function Book(title, author, pages, read){
    debugger
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book){
    myLibrary.push(book);
}

function render(myLibrary){
    for(let book of myLibrary){
    let bookCard = document.createElement("section");
    bookCard.classList.add("contain")
    bookCard.classList.add("text-center");
    let title = document.createElement("h6")
    title.innerText = "Title: " + book.title;
    let author = document.createElement("h6")
    author.innerText = "By: " + book.author;
    let pages = document.createElement("h6")
    pages.innerText = "Pages: " + book.pages;
    let read = document.createElement("h6")
    read.innerText = "status: " + book.read;
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.innerText = "Delete";
    let statusButton = document.createElement("button");
    statusButton.classList.add("changeStat");
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

function addBook(){
    debugger;
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
        formReset();
        let newTitle = new Book(title, author, pages, selectedValue);
        addBookToLibrary(newTitle);
        render(myLibrary);
    } else {
        alert("Please fill in all the information")

    }
}

function changeRead(){

}

function deleteBook(){

}

function formReset(){
    document.querySelector("form").reset();
}

function validation(){
    debugger;
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

