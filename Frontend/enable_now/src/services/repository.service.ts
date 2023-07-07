import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';


@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private http: HttpClient, private keycloak: KeycloakService) { }

  /**Add a user into the DB
   * @param body- JSON Object of type User
   * @returns 
   */
  public addUser(body: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(`http://localhost:8100/user/add`, JSON.stringify(body), { headers }).pipe();
  }
  /**Returns a user with email= ${email} from the DB
   * @param email - ${email}- email of the user that we want to get
   * @returns 
   */
  public getUserByEmail(email: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.get(`http://localhost:8100/user/findbyemail/${email}`, { headers }).pipe();
  }
  /** Returns user details from Keycloak with email= ${email}
   * @param email - ${email}- email of the user that we want to get
   * @returns 
   */
  public getKeyCloakUserByEmail(email: string) {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.keycloak.getToken() };
    return this.http.get(`http://localhost:8080/auth/admin/realms/enable_now/users?email=${email}`, { headers }).pipe();
  }
  /** Setting the user role in Keycloak
   * @param id - id of the user that we want to set the role
   * @param groupId - id of the group which contains the role that we want to set 
   * @returns 
   */
  public setKeyCloakUserGroup(id: number, groupId: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.keycloak.getToken() };
    return this.http.put(`http://localhost:8080/auth/admin/realms/enable_now/users/${id}/groups/${groupId}`, { headers }).pipe();
  }
  /** Returns the number of users with type='volunteer'
   * @returns 
   */
  public getVolunteersNumber(): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.get(`http://localhost:8100/user/volunteers`, { headers }).pipe();
  }
  /** Returns the number of users with type='disability' which have atleast 1 task solved
   * @returns 
   */
  public getPeopleWithSolvedTasks(): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.get(`http://localhost:8100/user/solvedpeople`, { headers }).pipe();
  }
  /** Returns the number of taks with status ='solved'
   * @returns 
   */
  public getSolvedTasksNumber(): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.get(`http://localhost:8100/task/solvedtasks`, { headers }).pipe();
  }
  /**Add a task into the DB
   * @param body {id,gate,description,status,title,volunteer_id,type}
   * @returns 
   */
  public createTask(body: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(`http://localhost:8100/task/add`, JSON.stringify(body), { headers }).pipe();
  }
  /** Add a row into user_tasks table
   * @param body {id,user_id,task_id}
   * @returns 
   */
  public inserTaskUserIds(body: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(`http://localhost:8100/task/insert`, JSON.stringify(body), { headers }).pipe();
  }
  /** Returns all tasks of the user(person with disability)
   * @param id - ${id} of the user whom tasks we want to get
   * @returns 
   */
  public getTasksOfUser(id: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.get(`http://localhost:8100/task/of/${id}`, { headers }).pipe();
  }
  /** Delete a task from DB
   * @param id - ${id} of the task that we want to delete
   * @returns 
   */
  public deleteTask(id: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.delete(`http://localhost:8100/task/delete/${id}`, { headers }).pipe();
  }
  /** Update a task into the DB
   * @param id - ${id} of the task that we want to update
   * @param body -new task information
   * @returns 
   */
  public updateTask(id: any, body: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put(`http://localhost:8100/task/update/${id}`, JSON.stringify(body), { headers }).pipe();
  }
  /** Return the taks of the volunteer
   * @param id - ${id} of the volunteer whom tasks we want to get
   * @returns 
   */
  public getTasksOfVolunteer(id: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.get(`http://localhost:8100/task/ofvol/${id}`, { headers }).pipe();
  }
/** Return all tasks with status='0' wtih all possible information 
 * @returns 
 */
  public getNewTasksWithUser(): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.get(`http://localhost:8100/task/taskuser`, { headers }).pipe();
  }

}
