import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../profile/profile.component';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';
import { TooltipPosition } from '@angular/material/tooltip';
import { KeycloakService } from 'keycloak-angular';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  title: string = "Dashboard";
  below: TooltipPosition = 'below'
  isVolunteer: boolean = false;
  isPeopleWithDisability: boolean = false;
  roles: string[] = [];

  constructor(public matDialog: MatDialog, private keycloak: KeycloakService) { }

  /**
   * When the page is loading get the role of the logged user.
   * Depeding on his role we are showing or hiding some links that he can't access.
   */
  ngOnInit(): void {
    this.getRoles();
  }
  /**
   * This method is opening the profile dialog which shows
   * information about the logged user.
   */
  openDialog() {
    this.matDialog.open(ProfileComponent);
  }
  /**
   * Get the role of the logged in user from the Keycloak server.
   */
  getRoles() {
    this.roles = this.keycloak.getUserRoles();
    this.roles.forEach(role => {
      if (role == 'volunteer') {
        this.isVolunteer = true;
      }
      if (role == 'disability') {
        this.isPeopleWithDisability = true;
      }
    });
  }
  /**
   * This method is opening an manual of how the users can use 
   * the application.
   */
  openDialogHelp() {
    this.matDialog.open(HelpDialogComponent)
  }
}
