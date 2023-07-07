import { Component, OnInit } from '@angular/core';
import { KeycloakService } from "keycloak-angular";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  user: string = "default";
  roles: string[] = [];
  role: string = "default";
  email: string = "default";
  name: string = "default";

  constructor(private service: KeycloakService) { }

  /**
   * When the dialog is loading we are getting all the information
   * about the logged user from KeyCloak server. Also we are refreshing
   * the token.
   */
  ngOnInit(): void {
    this.initializeUserDetails();
    this.service.getToken().then((token) => {
    })
  }
 /**
  * This method retrieves all the data about the user from Keycloak
  * like First Name, Last Name, Email etc.
  */
  private initializeUserDetails(): void {
    this.user = this.service.getUsername();
    const keycloakInstance = this.service.getKeycloakInstance();
    if (keycloakInstance) {
      const tokenParsed = keycloakInstance.tokenParsed;
      const firstName = tokenParsed?.['given_name'];
      const lastName = tokenParsed?.['family_name'];

      if (firstName && lastName) {
        this.name = firstName + " " + lastName
      }
    }
    this.roles = this.service.getUserRoles()
    this.roles.forEach(role => {
      if (role == "volunteer" || role == "disability") {
        this.role = role;
      }
    });
    this.service.loadUserProfile().then(data => {
      if (data.email != null) {
        this.email = data.email
      }
    })
  }
  /**
   * When a button with this method assigned to it is clicked we 
   * are logging out the current user.
   */
  logout() {
    this.service.logout();
  }
  /**
   * This method just close the 'profile' dialog.
   */
  public close() {
    this.close();
  }

}
