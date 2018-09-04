import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './User';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class RestapiService {
  private usersUrl = 'http://127.0.0.1:3000/user';  // URL to web api
  
  constructor( 
    private http: HttpClient
  ) { }


  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
  }
 
  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url);
  }
 
  addUser (User: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, User, httpOptions);
  }
 
  deleteUser (id:number) {
    const url = `${this.usersUrl}/${id}`;
 
    return this.http.delete(url, httpOptions);
  }
 
  updateUser (User: User): Observable<any> {
    return this.http.put(this.usersUrl, User, httpOptions);
  }
}
