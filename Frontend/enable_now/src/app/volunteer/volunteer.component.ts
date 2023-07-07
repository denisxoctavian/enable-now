import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper, StepperOrientation } from '@angular/material/stepper';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { RepositoryService } from 'src/services/repository.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { KeycloakService } from 'keycloak-angular';
import { formatDate } from '@angular/common';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  providers: [
    {
      provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
      useValue: { useUtc: true }
    }
  ],
  styleUrls: ['./volunteer.component.scss']
})
export class VolunteerComponent implements OnInit {
  @ViewChild(MatStepper) stepper!: MatStepper;

  firstFormGroup = this._formBuilder.group({

  });
  secondFormGroup = this._formBuilder.group({
    selectedType: ['', Validators.required]
  });
  thirdFormGroup = this._formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required]
  });

  stepperOrientation: Observable<StepperOrientation>;
  minDate = new Date();
  maxDate = new Date(2023, 11, 31);
  selected!: Date;
  email!: any;
  user!: any;
  selectedDate!: any;
  selectedType!: any;
  title!: any;
  description!: any;
  types = ["Plimbare", "Curatenie", "Vizita medicala", "Cumparaturi", "Socializare", "Altceva"]

  constructor(private router: Router, private repository: RepositoryService, private notification: SnackbarComponent, private _formBuilder: FormBuilder,
    private keycloak: KeycloakService, breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  /**
   * When page is loading we are trying to get with other method
   * the details about the logged user.
   */
  ngOnInit(): void {
    this.getUserDataFromKeyCloak();
  }
  /**
   * This method is getting the user's information from Keycloak server, we
   * will use the email in other methods.
   */
  getUserDataFromKeyCloak() {
    this.keycloak.loadUserProfile().then(data => {
      this.email = data.email ?? '';
      console.log(data.email)
    });

  }
  /**
   * When a date is selected from the calendar we are getting the
   * logged user from DB with the help of the email from Keycloak server, 
   * and saving him in a variable.
   */
  onDateSelection() {
    this.selectedDate = formatDate(this.selected, 'yyyy-MM-dd', 'en-US');
    console.log(this.email)
    this.repository.getUserByEmail(this.email).subscribe(result => {
      this.user = result;
      console.log(this.user)
    })
  }
  /**
   * This method is adding a task into the DB. But before adding him we are 
   * building a JSON variable with all tasks information.
   */
  createTask() {
    const task = {
      title: this.thirdFormGroup.value.title,
      type: this.secondFormGroup.value.selectedType,
      description: this.thirdFormGroup.value.description,
      date: this.selectedDate,
      status: 0,
    };
    this.repository.createTask(task).subscribe(taskId => {
      const taskUserIds = {
        task: taskId,
        user: this.user
      };
      this.repository.inserTaskUserIds(taskUserIds).subscribe(result => {
        this.notification.openSnackBar("Cerere inregistrata cu success!")
        this.router.navigateByUrl('/home')
      });
    });

  }

}
