import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { RepositoryService } from 'src/services/repository.service';
import { KeycloakService } from "keycloak-angular";
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { Task } from '../models/model.task';
import { MatTableExporterDirective } from 'mat-table-exporter';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { printPdf } from '../utility/printing.pdf';

@Component({
  selector: 'app-volunteer-tasks',
  templateUrl: './volunteer-tasks.component.html',
  styleUrls: ['./volunteer-tasks.component.scss']
})
export class VolunteerTasksComponent {
  @ViewChild(MatTable) table!: MatTable<Task>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTableExporterDirective) matTableExporter!: MatTableExporterDirective;

  dataSource: MatTableDataSource<Task>;
  selection = new SelectionModel<Task>(true, []);
  isMobile = false;
  user!: any;
  email!: any;
  displayedColumns = ['title', 'description', 'type', 'date', 'status'];

  constructor(public matDialog: MatDialog, private repository: RepositoryService, private keycloak: KeycloakService, private notification: SnackbarComponent) {
    this.dataSource = new MatTableDataSource<Task>;
  }
  /**
   * When the page is loading we are getting all the tasks where the volunteer
   * is the logged user.
   */
  ngOnInit(): void {
    this.getVolunteerTasks();

  }
  /**
   * This method is getting the user's information from Keycloak server, we
   * will use the email in other methods.
   */
  getUserDataFromKeyCloak() {
    this.keycloak.loadUserProfile().then(data => {
      this.email = data.email ?? '';
      console.log(data.email)
      console.log(this.email)
    });
  }
  /**
   * This method is returning all the taks from the DB which have the
   * volunteer_id equals to the id of the logged user.
   */
  getVolunteerTasks() {
    this.keycloak.loadUserProfile().then(data => {
      this.repository.getUserByEmail(data.email).subscribe(user => {
        console.log(user.id)
        this.repository.getTasksOfVolunteer(user.id).subscribe(task => {
          this.dataSource.data = task
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      })
    });
  }
   /**
   * Change the task's date format. We are using this so the date will look
   * better in the grid.
   * @param dateString 
   * @returns 
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    const formattedDate = date.toISOString().substring(0, 10);
    return formattedDate;
  }

}
