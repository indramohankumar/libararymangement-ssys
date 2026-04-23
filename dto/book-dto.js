//data transfer object for book
export default class BookDTO{
    constructor({id,title,author,isbn,publishedDate,genre,description,availableCopies}){
        this.id=id;
        this.title=title;
        this.author=author;
        this.isbn=isbn;
        this.publishedDate=publishedDate;
        this.genre=genre;
        this.description=description;
        this.availableCopies=availableCopies;
    }
}
