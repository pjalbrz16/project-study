import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Categorie } from '../app/classes/categorie';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private categorieUrl = environment.apiUrl + 'categories';  // URL to web api

  private cheminCategorieUrl = environment.apiUrl + 'categories/cheminImage';
  
  private mesCategories: Observable<string[]>;

  private cheminImageCategorie:Observable<string[]>;




  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  
  // Get all categorie 
  getCategories(): Observable<string[]> {
    this.mesCategories = this.http.get<string[]>(this.categorieUrl)
    .pipe(
      tap(_ => console.log('fetched categorie')),
      catchError(this.handleError<string[]>('getCategorie', []))
    );
    return this.mesCategories;
  }

  

  //retourne le premier chemin d'une categorie de la collection image
  getCheminImageByCategorie(categorie:string):Observable<string[]>{
    const url = `${this.cheminCategorieUrl}/${categorie}`
    this.cheminImageCategorie = this.http.get<string[]>(url)
    .pipe(
      tap(_ => console.log('fetched chemin categorie')),
      catchError(this.handleError<string[]>('getCheminCategorie', []))
    );
    return this.cheminImageCategorie;
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
