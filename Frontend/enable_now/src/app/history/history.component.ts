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
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<Task>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTableExporterDirective) matTableExporter!: MatTableExporterDirective;

  dataSource: MatTableDataSource<Task>;
  selection = new SelectionModel<Task>(true, []);
  isMobile = false;
  user!: any;
  email!: any;
  displayedColumns = ['title', 'date', 'volunteer.firstName', 'status', 'finish', 'cancel', 'thanks'];

  constructor(public matDialog: MatDialog, private repository: RepositoryService, private keycloak: KeycloakService, private notification: SnackbarComponent) {
    this.dataSource = new MatTableDataSource<Task>;
  }
  /**
   * When the page is loading we are trying to get all the taks of the person
   * with disability from DB.
   */
  ngOnInit(): void {
    this.getMyTasks();
  }
  /**
   * This method is getting the user's information from Keycloak server, we
   * will use the email in other methods.
   */
  getUserDataFromKeyCloak() {
    this.keycloak.loadUserProfile().then(data => {
      this.email = data.email ?? '';
    });
  }
  /**
   * With the email of the user, that we get from Keycloak, we are trying to get
   * all tasks of this user(person with disability) from DB.
   */
  getMyTasks() {
    this.keycloak.loadUserProfile().then(data => {
      this.repository.getUserByEmail(data.email).subscribe(user => {
        console.log(user.id)
        this.repository.getTasksOfUser(user.id).subscribe(task => {
          console.log(task)
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
  /**
   * The user can execute some action on the task that he selects for eg.
   * he can cancel a task, tell the server that the task was finished. Also he can
   * generate a diploma for the volunteer that was helping him
   * @param row - the selected task information
   * @param action - action that is executing {cancel,finish,generate diploma}
   */
  openDialog(row: any, action: string) {
    const dataWithAction = { ...row, action: action };
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: dataWithAction
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getMyTasks();
    });
  }
  /**
   * This method is generating a PDF file with a template that I've set in utility/printing.pdf.ts.
   * The template will take the name of the volunteer from the selected task.
   * @param row - the selected task information
   */
  generateDiploma(row: any) {
    console.log(row);
    printPdf(row.volunteer.lastName + " " + row.volunteer.firstName)
  }
  /**
   * This method is exporting all the grid details like (type,volunteer's name, title, description)
   * into a file of the XLS.
   */
  exportData() {
    this.matTableExporter.exportTable('other', {
      fileName: `Cererile mele_${new Date().toLocaleDateString()}`,
      Props: {
        Author: `Enable Now System`
      }
    })
  }
}
