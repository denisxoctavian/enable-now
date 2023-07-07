import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper, StepperOrientation } from '@angular/material/stepper';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { RepositoryService } from 'src/services/repository.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { KeycloakService } from 'keycloak-angular';


@Component({
  selector: 'app-set-type',
  templateUrl: './set-type.component.html',
  styleUrls: ['./set-type.component.scss']
})
export class SetTypeComponent implements OnInit {
  @ViewChild(MatStepper) stepper!: MatStepper;

  constructor(private router: Router, private repository: RepositoryService, private notification: SnackbarComponent, private _formBuilder: FormBuilder,
    private keycloak: KeycloakService, breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  email: string = "";
  firstName: string = "";
  lastName: string = "";
  type: Number = 0;
  groupId: any;

  firstFormGroup = this._formBuilder.group({
    termsAndConditions: false
  });
  secondFormGroup = this._formBuilder.group({
    volunteer: false,
    peopleWithDisability: false
  });
  thirdFormGroup = this._formBuilder.group({

  });
  stepperOrientation: Observable<StepperOrientation>;

  /**
  * When the page is loading we are getting all the information
  * about the logged user from KeyCloak server. 
  */
  ngOnInit(): void {
    this.getUserDetails();
  }
  /**
   * If user toggle a checkbox automatically deselect the other one
   * so user can't select both of the at the time.
   * @param checkbox 
   */
  toggleCheckbox(checkbox: string) {
    if (checkbox === 'volunteer') {
      this.secondFormGroup.get('peopleWithDisability')?.setValue(false);
    } else if (checkbox === 'peopleWithDisability') {
      this.secondFormGroup.get('volunteer')?.setValue(false);
    }
  }
  /**
   * This method is getting all the information
   * about the logged user from KeyCloak server.
   */
  getUserDetails() {
    this.keycloak.loadUserProfile().then(data => {
      this.email = data.email ?? '';
      this.firstName = data.firstName ?? '';
      this.lastName = data.lastName ?? '';
      console.log(this.email, this.firstName, this.lastName);
    });
  }
  /**
   * This method is setting the user group in Keycloak to 'volunteer'
   * or 'disability' depending of which type he choose. When the group is set
   * the role is also set based on the choosed group id.
   */
  getUserType() {
    if (this.secondFormGroup.value.peopleWithDisability) {
      this.type = 2;
      this.groupId = "9abfbedb-f3b8-4a3d-b92b-bfcec2cb5eb0";
    } else {
      this.type = 1;
      this.groupId = "c1b0e7f0-3447-400e-9cc9-f5360e33c8dd";
    }
  }
  /**
   * This method adds the user into the DB. Createa new user with the
   * selected type from the last method and insert it into DB. After that redirect
   * the user to the /donate route.
   */
  addUser() {
    this.getUserType();
    const body = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      type: this.type
    }
    this.repository.addUser(body).subscribe(result => {
      this.repository.getKeyCloakUserByEmail(this.email).subscribe((user: any) => {
        this.repository.setKeyCloakUserGroup(user[0].id, this.groupId).subscribe(result => {
          location.href = location.href;
        })
      })
    })
    this.router.navigateByUrl('/donate');
  }

}


