import { Injectable, isDevMode } from '@angular/core';
import { Partie } from 'src/classes/partie';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationPartieService {

  private partieUrl
  constructor(private http: HttpClient ) {
    this.partieUrl = environment.apiUrl+'jeux'
  }
 
 
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** POST: add a new infant to the server */
  addPartie (partie: Partie): Observable<Partie>{
    console.log(partie.demande);
    console.log(partie.date);
    console.log(partie.demandeur);
    console.log(partie.filtresPartie);
    console.log(partie.id_enfant);
    console.log(partie.termine);
    console.log(this.partieUrl);

    /*this.http.get<Partie>(this.partieUrl,this.httpOptions).pipe(
      tap((newPartie: Partie) => console.log(`added Partie w/ id=${newPartie._id}`)),
      catchError(this.handleError<Partie>('addPartie'))
*/
    return this.http.post<Partie>(this.partieUrl, partie, this.httpOptions).pipe(
      tap((newPartie: Partie) => console.log(`added Partie w/ id=${newPartie._id}`)),
      catchError(this.handleError<Partie>('addPartie'))
    );
  }
  /**addEnfant (enfant: Enfant): Observable<Enfant> {
    console.log(enfant.nom);
    console.log(enfant.prenom);
    return this.http.post<Enfant>(this.enfantsUrl, enfant, this.httpOptions).pipe(
      tap((newEnfant: Enfant) => console.log(`added enfant w/ id=${newEnfant._id}`)),
      catchError(this.handleError<Enfant>('addEnfant'))
    );
  } */

  getParties(): Observable<Partie>{
    console.log("aa");
    return this.http.get<Partie>(this.partieUrl, this.httpOptions).pipe(
      tap((newPartie: Partie) => console.log(`added Partie w/ id=${newPartie._id}`)),
      catchError(this.handleError<Partie>('addPartie'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    console.log("erreur");
    console.log(result);
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
