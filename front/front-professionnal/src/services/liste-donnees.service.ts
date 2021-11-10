import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Filtre } from '../classes/filtre'
import { Enfant } from 'src/classes/enfant';
import { Jeu } from 'src/classes/jeu';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListeDonneesService {

  private urlBase;

  private filtres : Observable<Filtre[]>;
  private scolaritees : Observable<string[]>;
  private roles : Observable<string[]>;
  private relations : Observable<string[]>;
  private professions : Observable<string[]>;
  private besoins : Observable<string[]>;
  private dominances : Observable<string[]>;
  private demandeurs : Observable<string[]>;

  private jeux: Observable<Jeu[]>;

  constructor(private http: HttpClient) {
    this.urlBase = environment.apiUrl  // VERIFIER SI CA FONCTIONNE AVEC 2 BACKSLASH
  }


  // Return toutes les professions from DB
  getProfessions(): Observable<string[]> {
    console.log("On veut demander les professions")
    const professionsUrl = `${this.urlBase}professions`;
    this.professions = this.http.get<string[]>(professionsUrl)
      .pipe(
        tap(_ => console.log('fetched Professions')),
        catchError(this.handleError<string[]>('getProfessions', []))
      );
    return this.professions;
  }

  getJeux(enfant: Enfant) {
    const jeuxUrl = `${this.urlBase}jeux/enfant/${enfant._id}`
    this.jeux = this.http.get<Jeu[]>(jeuxUrl)
      .pipe(
        catchError(this.handleError<Jeu[]>('getJeux', []))
      )
    return this.jeux
  }

  updateJeu(jeu: Jeu){
    const jeuUrl = `${this.urlBase}jeux/${jeu._id}`
    return this.http.put(jeuUrl, jeu).pipe(catchError(this.handleError('putJeu')))
  }

  // Return tout les filtres from DB
  getFiltres(): Observable<Filtre[]> {
    console.log("On veut demander les filtres")
    const filtresUrl = `${this.urlBase}filtres`;
    this.filtres = this.http.get<Filtre[]>(filtresUrl)
      .pipe(
        tap(_ => console.log('fetched filtres')),
        catchError(this.handleError<Filtre[]>('getFiltres', []))
      );
    return this.filtres;
  }
  //private filtresUrl = 'http://localhost:8080/filtres';

  // Return tout les scolaritees from DB
  getScolaritees(): Observable<string[]> {
    const scolariteeUrl = `${this.urlBase}scolaritees`;
    console.log("On veut demander les scolaritees")
    this.scolaritees = this.http.get<string[]>(scolariteeUrl)
      .pipe(
        tap(_ => console.log('fetched scolaritees')),
        catchError(this.handleError<string[]>('getScolaritees', []))
      );
    return this.scolaritees;
  }

  getDemandeurs(): Observable<string[]>{
    const demandeursUrl = `${this.urlBase}demandeurs`;
    console.log("On veut demander les demandeurs")
    this.demandeurs = this.http.get<string[]>(demandeursUrl)
    .pipe(
      tap(_ => console.log('fetched demandeurs')),
      catchError(this.handleError<string[]>('getDemandeurs', []))
    );
    return this.demandeurs;
  }

  // Return tout les roles from DB
  getRoles(): Observable<string[]> {
    console.log("On veut demander les roles")
    const roleUrl = `${this.urlBase}roles`;
    this.roles = this.http.get<string[]>(roleUrl)
      .pipe(
        tap(_ => console.log('fetched roles')),
        catchError(this.handleError<string[]>('getRoles', []))
      );
    return this.roles;
  }
  // Return toutes les relations from DB
  getRelations(): Observable<string[]> {
    console.log("On veut demander les relations")
    const relationsUrl = `${this.urlBase}relations`;
    this.relations = this.http.get<string[]>(relationsUrl)
      .pipe(
        tap(_ => console.log('fetch relations')),
        catchError(this.handleError<string[]>('get relations', []))
      );
    return this.relations;
  }
  // Return tout les besoins from DB
  getBesoins(): Observable<string[]> {
    console.log("On veut demander les relations")
    const besoinssUrl = `${this.urlBase}besoins`;
    this.besoins = this.http.get<string[]>(besoinssUrl)
      .pipe(
        tap(_ => console.log('fetched besoins')),
        catchError(this.handleError<string[]>('getBesoins', []))
      );
    return this.besoins;
  }

  // Return toutes les dominances de la db
  getDominances(): Observable<string[]> {
    console.log("On veut demander les dominances")
    const dominancesUrl = `${this.urlBase}dominances`;
    this.dominances = this.http.get<string[]>(dominancesUrl)
      .pipe(
        tap(_ => console.log('fetched dominances')),
        catchError(this.handleError<string[]>('getDominances', []))
      );
    return this.dominances;
  }

  private handleError<T>(operation = 'operation', result?: T) {
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
