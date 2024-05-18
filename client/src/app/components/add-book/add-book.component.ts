import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Book } from 'src/app/models/book';
import { ApiService } from 'src/app/service/api.service';
import { HttpError } from 'src/app/types';
import { handleApiError } from 'src/app/utils';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent {
  bookForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      subtitle: [''],
      genre: [''],
      author: ['', Validators.required],
      description: [''],
      publisher: ['']
    });
  }

  ngOnInit() {}

  onSubmit(): void {
    if (this.bookForm.valid) {
      this.apiService.addBook(this.bookForm.value as Book).subscribe({
        next: () => {
          this.snackBar.open('Book added successfully!', 'OK', { duration: 3000 });
          this.router.navigateByUrl('/books-list');
        },
        error: (err: HttpError) => {
          handleApiError(this.snackBar, err)
        }
      });
    } else {
      this.bookForm.markAllAsTouched();
      this.snackBar.open('Please fill in all required fields.', 'OK', { duration: 3000 });
    }
  }
}
