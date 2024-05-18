import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  books: Book[] = [];
  genreData: any[] = [];
  publisherData: any[] = [];

  totalBooks: number = 0;
  totalPublishers: number = 0;
  totalAuthors: number = 0;;

  yAxisLabel = 'Number of Titles';

  constructor(private apiService: ApiService) {
    this.genreData = [];
    this.publisherData = [];
  }

  ngOnInit(): void {
    this.apiService.getBooks().subscribe({
      next: (response) => {
        if (response.data.length > 0) {
          this.processByGenreData(response.data);
          this.processByPublisherData(response.data);
          this.processTotalBookData(response.data);
        }
      },
      error: (error) => console.error('Error:', error)
    });
  }

  processByGenreData(books: Book[]) {
    const genres: { [key: string]: number } = {};

    books.forEach(book => {
      const genre = book.genre || 'Uncategorized';
      if (genres[genre]) {
        genres[genre] += 1;
      } else {
        genres[genre] = 1;
      }
    });

    this.genreData = Object.entries(genres).map(([name, value]) => ({ name, value }));
  }

  processByPublisherData(books: Book[]) {
    const publisherCount = books.reduce((acc, book) => {
      acc[book.publisher] = (acc[book.publisher] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    const sortedPublishers = Object.entries(publisherCount)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    this.publisherData = sortedPublishers;
  }

  processTotalBookData(books: Book[]) {
    this.totalBooks = books.length;
    this.totalPublishers = new Set(books.map(book => book.publisher)).size;
    this.totalAuthors = new Set(books.map(book => book.author)).size;
  }
}
