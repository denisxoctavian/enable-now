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
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  @ViewChild(MatTable) table!: MatTable<Task>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTableExporterDirective) matTableExporter!: MatTableExporterDirective;

  dataSource: MatTableDataSource<Task>;
  selection = new SelectionModel<Task>(true, []);
  isMobile = false;
  user!: any;
  email!: any;
  displayedColumns = ['task.title', 'task.description', 'task.type', 'task.date', 'user.firstName', 'apply'];

  constructor(public matDialog: MatDialog, private repository: RepositoryService, private keycloak: KeycloakService, private notification: SnackbarComponent) {
    this.dataSource = new MatTableDataSource<Task>;
  }
  /**
   * When page is loading we are getting all the tasks of the
   * volunteer which is logged in.
   */
  ngOnInit(): void {
    this.getVolunteerTasks();

  }
  /**
   * This method is getting all the tasks with the volunter_id
   * equals with the id of the logged volunteer.
   */
  getVolunteerTasks() {
    this.repository.getNewTasksWithUser().subscribe(task => {
      this.dataSource.data = task
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
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
  /**
   * The user can execute an action on the task that he selects for eg.
   * he can only apply to a task.
   * @param row - the selected task information
   * @param action - action that is executing {apply}
   */
  openDialog(row: any, action: string) {
    const dataWithAction = { ...row, action: action };
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: dataWithAction
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getVolunteerTasks();
    });
  }


}
