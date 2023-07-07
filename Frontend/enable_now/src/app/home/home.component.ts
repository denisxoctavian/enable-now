import { Component, OnInit, ViewChild } from '@angular/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { KeycloakService } from "keycloak-angular";
import { Router } from '@angular/router';
import { RepositoryService } from 'src/services/repository.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [
    {
      provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
      useValue: { useUtc: true }
    }
  ],
  styleUrls: ['./home.component.scss']

})

export class HomeComponent implements OnInit {

  peopleHelped: number = 0;
  volunteers: number = 0;
  solvedTasks: number = 0;
  countedValue: number = 100;
  isVolunteer: boolean = false;
  isPeopleWithDisability: boolean = false;
  roles: string[] = [];

  constructor(private service: KeycloakService, private router: Router, private repository: RepositoryService) { }

  /**
   * When home page is loading we verify if user have choose a role. If user
   * doesn't have any role assign to his account we are redirecting him to /type route.
   * Also we are getting all numbers from DB.
   */
  ngOnInit(): void {
    this.getRolesAndRedirect();
    this.getValuesFromDb();
  }

  /**
   * This method is getting all numbers from DB which will populate some paragraphs
   * in the page. Like eg. we are getting the number of volunteers or no. of solved tasks.
   */
  getValuesFromDb() {
    this.repository.getVolunteersNumber().subscribe(result => {
      this.volunteers = Number(result);
      this.animateCounting(this.volunteers, 'volunteers');
    });
    this.repository.getPeopleWithSolvedTasks().subscribe(result => {
      this.peopleHelped = Number(result);
      this.animateCounting(this.peopleHelped, 'peopleHelped');
    })
    this.repository.getSolvedTasksNumber().subscribe(result => {
      this.solvedTasks = Number(result);
      this.animateCounting(this.solvedTasks, 'solvedTasks');
    })
  }
  /**
   * This method checks if the user has any role assigned to his account. If no
   * role is assign the user is redirected to the route /type where he can choose a role.
   */
  getRolesAndRedirect() {
    this.roles = this.service.getUserRoles();
    this.roles.forEach(role => {
      if (role == 'volunteer') {
        this.isVolunteer = true;
      }
      if (role == 'disability') {
        this.isPeopleWithDisability = true;
      }
    });
    if (this.isVolunteer || this.isPeopleWithDisability) {
      this.router.navigateByUrl('/home')
    } else {
      this.router.navigateByUrl('/type')
    }
  }
  /**
   * This method is used more for visual effects. This function basically counts
   * to the number that we are telling him. Eg. this function counts from 0 to number of
   * volunteers from our DB.
   * @param statistic - {no. of volunteers, no. of solved tasks, no. of helped people}
   * @param targetVariable -{volunteers,solved tasks, helped people}
   */
  animateCounting(statistic: number, targetVariable: string) {
    const duration = 9500;
    const increment = Math.ceil(statistic / (duration / 10));
    let countedValue = 0;
    const count = () => {
      countedValue += increment;
      if (countedValue >= statistic) {
        countedValue = statistic;
      } else {
        setTimeout(count, 10);
      }
      (this as any)[targetVariable] = countedValue;
    };
    count();
  }
}

