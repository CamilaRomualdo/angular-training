import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments';
import { Book, BookId } from 'src/app/models/book';
import { ApiErrorService } from 'src/app/service/error/api-error.service';

export interface ApiResponse<T> {
  data: T;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly REST_API = environment.apiUrl;
  private readonly headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return this.headers;
  }

  // Add Book
  addBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>(`${this.REST_API}/create-book`, book, { headers: this.getHeaders() })
      .pipe(catchError(ApiErrorService.handleError));
  }

  // Get All Books
  getBooks(): Observable<ApiResponse<Book[]>> {
    return this.httpClient.get<ApiResponse<Book[]>>(this.REST_API, { headers: this.getHeaders() })
      .pipe(catchError(ApiErrorService.handleError));
  }

  // Get Single Book
  getBook(id: string): Observable<Book> {
    return this.httpClient.get<{ data: Book }>(`${this.REST_API}/read-book/${id}`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data),
        catchError(ApiErrorService.handleError)
      );
  }

  // Update Book
  updateBook(id: string, book: Book): Observable<Book> {
    return this.httpClient.put<Book>(`${this.REST_API}/update-book/${id}`, book, { headers: this.getHeaders() })
      .pipe(catchError(ApiErrorService.handleError));
  }

  // Delete Book
  deleteBook(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.REST_API}/delete-book/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(ApiErrorService.handleError));
  }

  // Delete Books
  deleteBooks(ids: string[]): Observable<any> {
    return this.httpClient.post<any>(`${this.REST_API}/delete-books`, { ids }, { headers: this.getHeaders() })
        .pipe(catchError(ApiErrorService.handleError));
  }

  importBooks(books: Book[]): Observable<Book[]> {
    return this.httpClient.post<Book[]>(`${this.REST_API}/import`, books);
  }
}
