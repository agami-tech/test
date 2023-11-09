import {  Component, OnChanges, SimpleChanges,ChangeDetectorRef   } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from '../../model/book.model';
import { BookService } from '../../service/book.service';
import { Category } from '../../model/category.model';
import { CategoryService } from '../../service/category.service';
import { AppComponent } from '../../app.component';
import { AuthService } from '../../service/auth.service';
@Component({
  selector: 'app-admin-book',
  templateUrl: './admin-book.component.html',
  styleUrls: ['./admin-book.component.css']
})
export class AdminBookComponent {
    books: Book[] = [];
    filteredBooks: any[] = [];
    page_data:any;
    unFilteredBooks:boolean=false;
    searchKey: string = '';
    category_id:any='0';
    show :number =1;
    selectedCategory: Category =new Category();
  categories: Category[]=[];
  isEditing :any[]= [];
  selectedBook: Book = new Book();

    constructor(private bookService: BookService, private categoryService: CategoryService,private cdr: ChangeDetectorRef,
        private main:AppComponent,private auth:AuthService) {}

    ngOnInit(): void {
      this.getBooks();
      this.getCategories();
      console.log("auth",this.auth.token);
      console.log("auth api",this.auth.apiUrl);
    }
/*
    getBooks() {
      this.bookService.getBooks().subscribe((data: Book[]) => {
        this.books = data;
        this.filteredBooks = this.books; // Initialize the filtered list
      });
    }
*/
toggleEditing(book:any) {
    if (this.isEditing[book.id]) {
        this.isEditing[book.id]=false;
        this.editBook(book);
        this.getBooks();
    } else {
      this.isEditing[book.id] = true;
    }
  }
  toggleEditingCategories(category:any) {
    if (this.isEditing[category.id]) {
        this.isEditing[category.id]=false;
        this.editCategory(category);
        this.getCategories();
    } else {
      this.isEditing[category.id] = true;
    }
  }
filterBooks() {
      // Filter by title, author, or any other desired criteria
      if(this.category_id=='All'){
      this.filteredBooks = this.books;
      this.unFilteredBooks=true;
      return;
      }
      this.unFilteredBooks=false;
      this.filteredBooks = this.books.filter(book =>
        book.title.toLowerCase().includes(this.searchKey.toLowerCase()) && book.category_id == this.category_id)
      ;
      this.cdr.detectChanges();

     }

getBooks() {
    this.bookService.getBooks().subscribe(books => {
      this.books = books.data;
      this.filteredBooks=this.books;
      this.page_data =books;
      this.unFilteredBooks=true;
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }


  addBook() {
    this.bookService.createBook(this.selectedBook).subscribe(() => {
      this.getBooks();
      this.selectedBook = new Book();
      this.main.showMessage('Success','Successfully created a new book.','');
    });
  }

  editBook(book: Book) {
    this.bookService.updateBook(book.id, book).subscribe(() => {
      this.getBooks();
      this.main.showMessage('Success','Book successfully updated','');
    });
  }

  deleteBook(book: Book) {
    this.bookService.deleteBook(book.id).subscribe(() => {
      this.getBooks();
      this.main.showMessage('Success','Book successfully deleted','');
    });
  }

  addCategory() {

    this.categoryService.createCategory(this.selectedCategory).subscribe(() => {
      this.getCategories();
      this.selectedCategory = new Category();
      this.main.showMessage('Success','Successfully created a new category.','');
    });

  }

  editCategory(category: Category) {

    this.categoryService.updateCategory(category.id, category).subscribe(() => {
      this.getCategories();
      this.main.showMessage('Success','Category successfully updated','');
    });

  }

  deleteCategory(category: Category) {
    this.categoryService.deleteCategory(category.id).subscribe(() => {
      this.getCategories();
      this.main.showMessage('Success','Category successfully deleted','');
    });
  }
}
