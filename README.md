# Angular Training 
### Book Management Application

This project is built using Angular 16, Express, and MongoDB to create a full-featured CRUD application for managing a collection of books. The front-end utilizes Angular Flex Layout and Bootstrap for a responsive and attractive design.

## Features

- **CRUD Operations**: Create, read, update, and delete book entries in the MongoDB database.
- **Data Import/Export**: Import data from an Excel spreadsheet to populate the book table and export the table data as an Excel file for external viewing.
- **Statistics Visualization**: View various statistics through charts created with Ngx Charts.
- **Responsive Design**: Uses Bootstrap and Angular Flex Layout for a responsive and user-friendly interface.

## Upcoming Features

- **Search Functionality**: Implement a search feature to quickly find books in the table.
- **Data Deletion**: Fix the issue of data duplication when viewing an Excel file by adding the option to delete table data.
- **Sorting**: Add the ability to sort table data based on different columns.

## Getting Started

To get started with this project, clone the repository and follow the instructions below.

### Prerequisites

- Node.js
- Angular CLI > 16
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/CamilaRomualdo/angular-training.git
   cd angular-training
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the MongoDB server.

4. Run the Express server:
   ```bash
   npx server src/index.js
   ```
  
5. Start the Angular application:
   ```bash
   Run `ng serve` for a dev server. 
   ```

### Usage

1. Navigate to ```bashhttp://localhost:4200``` in your browser to use the book management interface.
2. Open ```bashhttp://localhost:8000``` to view the data from the server.
3. In MongoDB Compass, you will see a collection called bookstore where the book data is stored.
