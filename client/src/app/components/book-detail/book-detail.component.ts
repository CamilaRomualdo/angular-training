import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  bookId: string | null = null;
  bookUpdateForm: FormGroup;
  loading: boolean = false;

  private subscriptions = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {
    this.bookUpdateForm = this.formBuilder.group({
      title: ['', Validators.required],
      subtitle: [''],
      genre: [''],
      author: ['', Validators.required],
      description: [''],
      publisher: ['']
    });
  }

  ngOnInit(): void {
    this.bookId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.bookId) {
      this.loadBookData();
    } else {
      this.router.navigate(['/books-list']).then(() => {
        console.warn('Book ID not found, navigating back to book list.');
      });
    }
  }

  loadBookData(): void {
    this.loading = true;
    if (!this.bookId) return;

    const bookSubscription = this.apiService.getBook(this.bookId).subscribe({
      next: (book) => {
        this.bookUpdateForm.patchValue(book);
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load book details:', error);
        this.loading = false;
      }
    });
    this.subscriptions.add(bookSubscription);
  }

  onUpdate(): void {
    if (this.bookUpdateForm.valid) {
      this.apiService.updateBook(this.bookId as string, this.bookUpdateForm.value).subscribe({
        next: () => {
          console.log('Book updated successfully!');
          this.router.navigateByUrl('/books-list');
        },
        error: (error) => {
          console.error('Error updating book:', error);
        }
      });
    } else {
      console.error('Form is not valid');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
