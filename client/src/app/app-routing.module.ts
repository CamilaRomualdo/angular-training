import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AddBookComponent } from 'src/app/components/add-book/add-book.component';
import { BookDetailComponent } from 'src/app/components/book-detail/book-detail.component';
import { BooksListComponent } from 'src/app/components/books-list/books-list.component';
import { StatisticsComponent } from 'src/app/components/statistics/statistics.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-book' },
  { path: 'add-book', component: AddBookComponent },
  { path: 'books-list', component: BooksListComponent },
  { path: 'edit-book/:id', component: BookDetailComponent },
  { path: 'charts', component: StatisticsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
