import  {Inject, Injectable, isDevMode} from "@angular/core";
import {HttpClient,HttpHeaders,HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoginService{
  private url
  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + "login"
  }
  login(email: string, password: string):Observable<any> {
    return this.http.post<any>(this.url, { email:email, password:password })
      .pipe(map(user => {
        console.log(user);
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          console.log('i have a user-token');
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('token-user', JSON.stringify(user.token));
        }

        return user;
      }));
  }
}
