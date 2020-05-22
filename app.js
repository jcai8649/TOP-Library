
let main = document.querySelector("main")

let myLibrary = [];


function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    read ? this.read ="read" : this.read="not read"
}

function Info(){
    
}

Info.prototype.bookInfo = function(){
    return this.title +", "+this.author +", " + this.pages +", " + this.read;
}

Book.prototype = Object.create(Info.prototype);

function addBookToLibrary(book){
    myLibrary.push(book);
}

function render(myLibrary){
    for(let book of myLibrary){
    let bookCard = document.createElement("container");
    bookCard.innerText = book.bookInfo();
    main.append(bookCard);
    }
}


const book1 = new Book("KOBE", "Bryant", 24, true)

addBookToLibrary(book1);
render(myLibrary)