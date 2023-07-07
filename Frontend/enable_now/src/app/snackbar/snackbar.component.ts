import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
  constructor(private snackBar: MatSnackBar) { }

  /**
   * Success message
   * @param message 
   */
  openSnackBar(message: string) {
    this.snackBar.open(message, "", {
      duration: 4000,
      panelClass: 'success-snackbar'
    });
  }
  /**
   * Error message
   * @param message 
   */
  openSnackBarErr(message: string) {
    this.snackBar.open(message, "", {
      duration: 4000,
      panelClass: 'error-snackbar'
    });
  }


}
