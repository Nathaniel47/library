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


function addBookToLibrary(title, author, pages, readflag){
    const newBook = new Book(title, author, pages, readflag)
    libraryBooks.push(newBook);

    const newCard = document.createElement("div")

    newCard.textContent = `${newBook.title} by ${newBook.author}. ${newBook.readflag}`;

    newCard.classList.add("bookCard");

    display.appendChild(newCard);
};

const display = document.getElementById("display");

for(let i = 0;i<libraryBooks.length;i++){
    const newCard = document.createElement("div");
    newCard.textContent = `${libraryBooks[i].title} by ${libraryBooks[i].author}. ${libraryBooks[i].readflag}`;

    newCard.classList.add("bookCard");

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