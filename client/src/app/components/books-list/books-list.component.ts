import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { Book } from 'src/app/models/book';
import { ApiService } from 'src/app/service/api.service';
import { ExcelService } from 'src/app/service/exel.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  loading: boolean = false;

  itemsPerPage: number = 10;
  page: number = 1;

  selectedCount: number = 0;

  importedBooks: Book[] =[];
  showImportedBooksButton = false;
  importFileName: string | null = null;

  isModalOpen = false;

  private subscriptions = new Subscription();

  @ViewChild('confirmationModal') confirmationModal!: ElementRef;

  constructor(
    private apiService: ApiService,
    private excelService: ExcelService) { }

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.loading = true;
    const booksSub = this.apiService.getBooks().subscribe({
      next: (response) => {
        this.books = response.data.map(book => ({ ...book, selected: false }));;
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load books', error);
        this.loading = false;
      }
    });
    this.subscriptions.add(booksSub);
  }

  delete(id: string, index: number) {
    if (window.confirm('Do you want to go ahead?')) {
      const deleteSub = this.apiService.deleteBook(id).subscribe({
        next: () => {
          this.books.splice(index, 1);
        },
        error: (error) => {
          console.error('Failed to delete the book', error);
        }
      });
      this.subscriptions.add(deleteSub);
    }
  }

  updateSelectedCount() {
    this.selectedCount = this.books.filter(book => book.selected).length;
  }

  toggleAllBooks(event: any) {
    const isAllSelected = event.target.checked;
    this.books.forEach(book => {
      book.selected = isAllSelected;
    });
    this.updateSelectedCount();
  }

  checkIfAllSelected() {
    const allSelected = this.books.every(book => book.selected);
    const allCheckbox = document.querySelector('#select-all-checkbox') as HTMLInputElement;
    if (allCheckbox) {
      allCheckbox.checked = allSelected;
    }
    this.updateSelectedCount();
  }

  deleteSelectedBooks() {
    const selectedBooksIds = this.books.filter(book => book.selected).map(book => book._id);
    if (selectedBooksIds.length > 0 && confirm('Are you sure you want to delete these books?')) {
      this.apiService.deleteBooks(selectedBooksIds).subscribe({
        next: () => {
          this.books = this.books.filter(book => !book.selected);
          console.log('Selected books have been deleted successfully.');
        },
        error: (error) => {
          console.error('Failed to delete selected books', error);
        }
      });
    }
  }

  exportToExcel(): void {
    const filteredBooks = this.books.map(({ _id, title, subtitle, genre, author, description, publisher }) => ({ _id, title, subtitle, genre, author, description, publisher }));
    this.excelService.exportAsExcelFile(filteredBooks, 'Books');
  }

  importFromExcel(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.importFileName = file.name;
      this.excelService.importFromExcel(event).then((data: Book[]) => {
        this.importedBooks = data;
        this.showImportedBooksButton = true; // Exibe o botão de visualização
        console.log('Imported books:', this.importedBooks); // Verifique os dados importados no console
      }).catch(err => {
        console.error('Error reading excel file:', err);
      });
    }
  }

  openConfirmationModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  confirmUpload(): void {
    this.displayImportedBooks();
    this.closeModal();
  }

  displayImportedBooks(): void {
    this.apiService.importBooks(this.importedBooks).subscribe(
      response => {
        console.log('Books imported successfully:', response);
        this.books = [...this.books, ...response]; // Atualiza a tabela com os dados importados
        this.showImportedBooksButton = false; // Oculta o botão após a importação
        this.importFileName = null; // Limpa o nome do arquivo importado
      },
      error => {
        console.error('Error importing books:', error);
      }
    );
  }

  resetImport(): void {
    this.importedBooks = [];
    this.showImportedBooksButton = false;
    this.importFileName = null;
  }

  ngOnDestroy() {
    // Clean up subscriptions to avoid memory leaks.
    this.subscriptions.unsubscribe();
  }
}
