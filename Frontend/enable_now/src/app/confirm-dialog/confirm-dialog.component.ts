import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RepositoryService } from 'src/services/repository.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private repository: RepositoryService, private notification: SnackbarComponent, private keycloak: KeycloakService) { }

  action: any;
  email!: any;
  volunteer!: any;

  /**
   * When dialog is loading ge the action type and if the action is 'apply'
   * retrieve the user's information from Keycloak
   */
  ngOnInit(): void {
    this.action = this.data.action;
    if (this.action == 'apply') {
      this.getUserDataFromKeyCloak();
    }
  }
  /**
   * Get the user's information from the Keycloak, they are needed when
   * user tries to apply to a task .
   */
  getUserDataFromKeyCloak() {
    this.keycloak.loadUserProfile().then(data => {
      this.email = data.email ?? '';
    });
  }
  /**
   * Delete a task from DB if operation is successfull show a 'notification'
   * message after that.
   */
  deleteTask() {
    this.repository.deleteTask(this.data.id).subscribe(result => {
      this.notification.openSnackBar("Ai renunțat cu succes la cerere!")
    }
    )
  }
  /**
   * Change the status of a task from DB into '3' which basically means that the
   * task was successfull finished, show a 'notification' message after that.
   */
  finishTask() {
    this.data.status = 3;
    console.log(this.data)
    this.repository.updateTask(this.data.id, this.data).subscribe(result => {
      this.notification.openSnackBar("Ai finalizat cu success cererea!")
    }
    )
  }
  /**
   * Using the email that we get when we are loading the page we try to retrieve
   * the users from DB. After that we build a new task object, which we are setting the 
   * status='1' which means 'In progress' and the volunteer=user that we get from the DB.
   */
  applyTask() {
    this.repository.getUserByEmail(this.email).subscribe(result => {
      this.volunteer = result;
      const { task } = this.data;
      task.status = 1;
      task.volunteer = this.volunteer;
      this.repository.updateTask(task.id, task).subscribe(result => {
        console.log(this.data)
        this.notification.openSnackBar("Multumim si mult success la ajutat!");
      });
    });
  }

}
