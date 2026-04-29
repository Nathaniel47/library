const libraryBooks = [
    {
        title: "I told you so",
        author: "James Aladin",
        pages: "253",
        readflag:"Read", 
        id: 45678399
    },
    {
        title: "Living on the edge",
        author: "Peter J. Daniel",
        pages: "451",
        readflag:"Not read", 
        id: 45698699
    },
    {
        title: "Evangelism by Fire",
        author: "Evangelist Reinhard Bonke",
        pages: "351",
        readflag:"Not read", 
        id: 43578397
    },
    {
        title: "Just As I Am",
        author: "Evangelist Billy Graham",
        pages: "657",
        readflag:"Reading", 
        id: 45664389
    },
];

function Book(title, author, pages, readflag){
    if(!new.target){
        throw Error("You did not add the kewy word 'new' in creating this object")
    }

    this.title = title,
    this.author = author,
    this.pages = pages,
    this.readflag = readflag,
    this.id = crypto.randomUUID()
}

Book.prototype.toggleRead = function (){
    if(this.readflag == "Read"){
        this.readflag = "Not Read";
    }
    else if(this.readflag == "Not Read"){
        this.readflag = "Reading";
    }
    else{
        this.readflag = "Read"
    }
}

//Convert raw objects in libraryBooks array into instances of the Book object (wrapping)
for(let i = 0; i < libraryBooks.length; i++){
    //get the book objects from the libraryBooks array
    const rawData = libraryBooks[i];
    
    //convert to book instance using the book constructor
    const bookInstance = new Book(rawData.title, rawData.author, rawData.pages, rawData.readflag);

    //maintain the id of the raw data
    bookInstance.id = rawData.id;

    //replace old hardcoded books with the converted books
    libraryBooks[i] = bookInstance;
}


function addBookToLibrary(title, author, pages, readflag){
    const newBook = new Book(title, author, pages, readflag)
    libraryBooks.push(newBook);

    const newCard = document.createElement("div")

    const info = document.createElement("p");
    info.textContent = `${newBook.title} by ${newBook.author}. ${newBook.readflag}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("removeBtn");

    const toggleRead = document.createElement("button");
    toggleRead.textContent = "Toggle Read";
    toggleRead.classList.add("toggleRead");



    newCard.appendChild(info);
    newCard.appendChild(removeBtn);
    newCard.appendChild(toggleRead);

    newCard.classList.add("bookCard");
    newCard.dataset.id = newBook.id

    display.appendChild(newCard);
};

const display = document.getElementById("display");

//Add eventListener to remove a book
display.addEventListener("click", (e) => {

    //get the book id
        const bookId = e.target.parentElement.dataset.id;

        //use book ID to find and retrieve book index in array
        const bookIndex = libraryBooks.findIndex(book => book.id == bookId);

        const book = libraryBooks[bookIndex];
    
    if (e.target.classList.contains("removeBtn")){

        //use book index in aray to remove from array
        libraryBooks.splice(bookIndex, 1);

        //remove book
        e.target.parentElement.remove();
    }
    else if(e.target.classList.contains("toggleRead")){
        
        book.toggleRead();

        const info = e.target.parentElement.querySelector("p");
        info.textContent = `${libraryBooks[bookIndex].title} by ${libraryBooks[bookIndex].author}. ${libraryBooks[bookIndex].readflag}`;
    }
})

for(let i = 0;i<libraryBooks.length;i++){
    const newCard = document.createElement("div");

    const info = document.createElement("p");
    info.textContent = `${libraryBooks[i].title} by ${libraryBooks[i].author}. ${libraryBooks[i].readflag}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("removeBtn");

    const toggleRead = document.createElement("button");
    toggleRead.textContent = "Toggle Read";
    toggleRead.classList.add("toggleRead");

    newCard.appendChild(info);
    newCard.appendChild(removeBtn);
    newCard.appendChild(toggleRead);

    newCard.classList.add("bookCard");
    newCard.dataset.id = libraryBooks[i].id

    display.appendChild(newCard); 
}


//Show and closeform in dialog through button
const newBookBtn = document.querySelector("#newBookBtn");
const dialog = document.querySelector("#bookDialog");
const cancelBtn = document.querySelector("#cancelBtn");

newBookBtn.addEventListener("click", () => {
    dialog.showModal();
});

cancelBtn.addEventListener("click", () => {
    dialog.close();
})


//Convert data from form into a Book Object
//and store in libraryBooks array

const form = document.querySelector("#newBookForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const readflag = document.querySelector("input[name='readflag']:checked").value;

    addBookToLibrary(title, author, pages, readflag);

    form.reset();
    dialog.close();

})