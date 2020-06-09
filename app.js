
let main = document.querySelector("main")
let myLibrary = [];


class Book{
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

//reset the localStorage library. Used whenever the libray needs to be updated
function updateLocal(){
    localStorage.setItem("lib", JSON.stringify(myLibrary));
}

//retrieve the localStorage library data
function getLocalStorage(){
    return JSON.parse(localStorage.getItem("lib"))
}

function addBookToLibrary(book){
    myLibrary.push(book);
    updateLocal();
}

//gets the index of the current book and toggle it's read status then render the library
function changeRead(bookIndex){

    let updatedBook = myLibrary[bookIndex]
    
    if (updatedBook['read'] == "Read"){
        updatedBook['read'] = "Not Read"
    } else {
        updatedBook['read'] = "Read"
    }

    myLibrary.splice(bookIndex, 1, updatedBook);
    updateLocal();
    render();
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
        render();
        formReset();
        $('#myModal').modal("toggle");
    } else {
        alert("Please fill in all required information")
    }
}


function deleteBook(deleteIndex){
    let deleteChild = document.getElementById(deleteIndex);
    myLibrary.splice(deleteIndex,1);
    updateLocal();
    main.removeChild(deleteChild);
    render();
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


//create and append book info into main after clearing the main elements
function render(){
    mainClear();
    let localLibrary = getLocalStorage();
    if (localLibrary.length !== 0){
        for(let book of localLibrary){
            let bookCard = document.createElement("section");
            bookCard.classList.add("contain")
            bookCard.classList.add("text-center");
            bookCard.setAttribute("id", localLibrary.indexOf(book));
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
            deleteButton.setAttribute("onclick", `deleteBook(${localLibrary.indexOf(book)})`);
            let statusButton = document.createElement("button");
            statusButton.classList.add("changeStat");
            statusButton.classList.add("btn");
            statusButton.classList.add("btn-info");
            statusButton.innerText = "Change Status";
            statusButton.setAttribute("onclick", `changeRead(${localLibrary.indexOf(book)})`);
            bookCard.append(title);
            bookCard.append(author);
            bookCard.append(pages);
            bookCard.append(read);
            bookCard.append(deleteButton);
            bookCard.append(statusButton);
            book.id = localLibrary.indexOf(book);
            main.append(bookCard);
        }
    }
}


//removes all the child from main to reset the DOM
function mainClear(){
    let first = main.firstElementChild;
    while (first){
        first.remove();
        first = main.firstElementChild;
    }
}

function updateMyLibrary(){
    myLibrary = getLocalStorage();
}


//if localStorage is cleared, reset to default;
if(getLocalStorage() === null){
    let book = new Book("The Last Dance", "Michael Jordan", 10, "Read")
    let book2 = new Book("The Alchemist", "Paulo Coelho", 120, "Read")
    addBookToLibrary(book);
    addBookToLibrary(book2);
}

//update local storage after each refresh
if (getLocalStorage() !== myLibrary){
    updateMyLibrary();
}

render();

