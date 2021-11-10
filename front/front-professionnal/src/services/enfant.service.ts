import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

//import { ENFANTS } from '../../mocks/mock-enfants';
import { Enfant } from '../classes/enfant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnfantService {
  private enfantsUrl  // URL to web api
  private enfants :  Observable<Enfant[]>;
  constructor(private http: HttpClient ) {
    this.enfantsUrl = environment.apiUrl+'enfants'
  }

 
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // Get all children 
  getEnfants(): Observable<Enfant[]> {
    //return of(ENFANTS);
    this.enfants = this.http.get<Enfant[]>(this.enfantsUrl)
    .pipe(
      tap(_ => console.log('fetched enfants')),
      catchError(this.handleError<Enfant[]>('getEnfants', []))
    );
    return this.enfants;
  }
  getEnfantsPro(id:string): Observable<Enfant[]>{

    const url= `${this.enfantsUrl}/pro/${id}`
    this.enfants = this.http.get<Enfant[]>(url)
    .pipe(
      tap(_ => console.log(`fetched enfants du pro id=${id}`)),
      catchError(this.handleError<Enfant[]>('getEnfantsPro', []))
    );
    return this.enfants;


    /**const url = `${this.enfantsUrl}/${id}`;
    return this.http.get<Enfant>(url).pipe(
      tap(_ => console.log(`fetched enfants id=${id}`)),
      catchError(this.handleError<Enfant>(`getEnfant id=${id}`))
    ); */
  }

  
  // Update children with ID
  updateEnfant(enfant : Enfant): Observable<any>{
    const url = `${this.enfantsUrl}/${enfant._id}`;
    console.log("On veut update",enfant._id)

    return this.http.put(url,enfant, this.httpOptions).pipe(
      tap(_ => console.log(`updated enfant with id id=${enfant._id}`)),
      catchError(this.handleError<any>('updateEnfant'))
    );
  }

  deleteEnfant(enfant : Enfant): Observable<Enfant>{
    console.log("On veut delete",enfant._id);

    const url = `${this.enfantsUrl}/${enfant._id}`;
    return this.http.delete<Enfant>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted hero id=${enfant._id}`)),
      catchError(this.handleError<Enfant>('deleteEnfant'))
    );
  }  
  /** POST: add a new infant to the server */
  addEnfant (enfant: Enfant): Observable<Enfant> {
    console.log(enfant.nom);
    console.log(enfant.prenom);
    return this.http.post<Enfant>(this.enfantsUrl, enfant, this.httpOptions).pipe(
      tap((newEnfant: Enfant) => console.log(`added enfant w/ id=${newEnfant._id}`)),
      catchError(this.handleError<Enfant>('addEnfant'))
    );
  }
  // Get children with ID
  getEnfant(id: string): Observable<Enfant>{
    //return of(ENFANTS.find(enfant => enfant._id === id));
    const url = `${this.enfantsUrl}/${id}`;
    return this.http.get<Enfant>(url).pipe(
      tap(_ => console.log(`fetched enfants id=${id}`)),
      catchError(this.handleError<Enfant>(`getEnfant id=${id}`))
    );
  }


  /* GET enfant whose name contains search term */
  searchEnfant(term: string): Observable<Enfant[]> {
    if (!term.trim()) {
      // if not search term, return empty enfant array.
      return of([]);
    }
    console.log(term);
    const url = `${this.enfantsUrl}/nom/${term}`;
    return this.http.get<Enfant[]>(url).pipe(
      tap(_ => console.log(`found enfants matching "${term}"`)),
      catchError(this.handleError<Enfant[]>('searchEnfant', []))
    );
    
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }



}
