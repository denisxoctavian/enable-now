import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './utility/app.init';
import { KeycloakAngularModule } from 'keycloak-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfileComponent } from './profile/profile.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RepositoryService } from 'src/services/repository.service';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatMenuModule} from '@angular/material/menu';
import { FooterComponent } from './footer/footer.component';
import * as moment from 'moment';
import { DonateComponent } from './donate/donate.component';
import { AboutComponent } from './about/about.component';
import { SetTypeComponent } from './set-type/set-type.component';
import { TasksComponent } from './tasks/tasks.component';
import { HistoryComponent } from './history/history.component';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { VolunteerTasksComponent } from './volunteer-tasks/volunteer-tasks.component';

moment.locale('en', {
  week: {
    dow: 7, 
  },
  weekdaysMin: ['Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sa', 'Du'],
});

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
    ProfileComponent,
    SnackbarComponent,
    FooterComponent,
    DonateComponent,
    AboutComponent,
    SetTypeComponent,
    TasksComponent,
    HistoryComponent,
    VolunteerComponent,
    ConfirmDialogComponent,
    VolunteerTasksComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    AppRoutingModule,
    MatCheckboxModule,
    MatListModule,
    MatButtonModule,
    MatDividerModule,
    FlexLayoutModule,
    KeycloakAngularModule,
    MatDialogModule,
    MatCardModule,
    MatTableModule,
    HttpClientModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatMomentDateModule,
    PdfViewerModule,
    MatTableExporterModule,
    MatMenuModule
  ],
  providers: [SnackbarComponent, KeycloakService, RepositoryService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService, HttpClient]
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
