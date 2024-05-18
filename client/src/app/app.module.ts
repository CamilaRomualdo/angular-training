import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { AddBookComponent } from './components/add-book/add-book.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatSnackBarModule } from '@angular/material/snack-bar';

// NPX Pagination
import { NgxPaginationModule } from 'ngx-pagination';

// Flex Layout
import { FlexLayoutModule } from '@angular/flex-layout';
import { StatisticsComponent } from './components/statistics/statistics.component';

import { NgxChartsModule } from "@swimlane/ngx-charts";

import { NZ_I18N, pt_BR } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTagModule } from 'ng-zorro-antd/tag';


@NgModule({
  declarations: [
    AppComponent,

    // Components
    AddBookComponent,
    BookDetailComponent,
    BooksListComponent,
    NavbarComponent,
    FooterComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // New
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    // Angular Material
    MatSnackBarModule,

    // NGX Pagination
    NgxPaginationModule,

    // Flex Layout
    FlexLayoutModule,

    NgxChartsModule,

    NzIconModule,
    NzPageHeaderModule,
    NzTagModule
  ],
  providers: [
    [{ provide: NZ_I18N, useValue: pt_BR }]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
