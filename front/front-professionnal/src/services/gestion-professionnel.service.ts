import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Personne} from '../classes/personne'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GestionProfessionnelService {
  private personnesUrl
  private personnes : Observable<Personne[]>;

  constructor(private http: HttpClient) {
    this.personnesUrl = environment.apiUrl+'personne'
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getPersonnes():Observable<Personne[]>{ //return all personnes
    this.personnes = this.http.get<Personne[]>(this.personnesUrl)
    .pipe(
      tap(_ => console.log('fetched personnes')),
      catchError(this.handleError<Personne[]>('getPersonne', []))
    );
    return this.personnes
  }

  getProfessionnels():Observable<Personne[]>{
    const url=`${this.personnesUrl}/professionnels`
    this.personnes=this.http.get<Personne[]>(url)
    .pipe(
      tap(_ => console.log('fetched professionnels')),
      catchError(this.handleError<Personne[]>('getProfessionnels', []))
    );
    return this.personnes
  }

  // add personne to DB
  addPersonne (personne: Personne): Observable<Personne> {
    return this.http.post<Personne>(this.personnesUrl, personne, this.httpOptions).pipe(
      tap((newPersonne: Personne) => console.log(`added personne w/ id=${newPersonne._id}`)),
      catchError(this.handleError<Personne>('addPersonne'))
    );
  }
 // get personne from ID
  getPersonne(id: string): Observable<Personne>{
    console.log('test from gestion service')
    const url = `${this.personnesUrl}/${id}`;
    return this.http.get<Personne>(url).pipe(
      tap(_ => console.log(`fetched personne id=${id}`)),
      catchError(this.handleError<Personne>(`getPersonne id=${id}`))
    );
  }

  
  /* GET person whose name contains search term */
  searchPersonne(term: string): Observable<Personne[]> {
    if (!term.trim()) {
      // if not search term, return empty enfant array.
      return of([]);
    }
    console.log(term);
    const url = `${this.personnesUrl}/nom/${term}`;
    return this.http.get<Personne[]>(url).pipe(
      tap(_ => console.log(`found Personne matching "${term}"`)),
      catchError(this.handleError<Personne[]>('searchPersonne from name', []))
    );
    
  }


  //update personne in DB
  updatePersonne(personne : Personne): Observable<any>{
    const url = `${this.personnesUrl}/${personne._id}`;
    console.log("On veut update",personne._id)

    return this.http.put(url,personne, this.httpOptions).pipe(
      tap(_ => console.log(`updated personne with id id=${personne._id}`)),
      catchError(this.handleError<any>('updatePersonne'))
    );
  }

  //delete personne in DB
  deletePersonne(personne : Personne): Observable<Personne>{
    console.log("On veut delete",personne._id);

    const url = `${this.personnesUrl}/${personne._id}`;
    return this.http.delete<Personne>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted personne id=${personne._id}`)),
      catchError(this.handleError<Personne>('deletePersonne'))
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
