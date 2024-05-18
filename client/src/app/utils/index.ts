import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpError } from "src/app/types";

export function handleApiError(snackBar: MatSnackBar, err: HttpError): void {
  console.error('Error occurred:', err.message);
  snackBar.open(`Failed to add the book: ${err.message}`, 'OK', { duration: 3000 });
}
