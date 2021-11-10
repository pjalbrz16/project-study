import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable,of } from 'rxjs';
import {Filtre} from '../app/partie/filtre';
import { catchError, map, tap } from 'rxjs/operators';
import {FiltreJeu} from '../app/partie/filtreJeu'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private partieUrl = environment.apiUrl + 'partie';
  private filtreUrl = environment.apiUrl + 'partie/filtre';
  private imageCategorieUrl = environment.apiUrl + 'partie/imagesCategorie';

  private choixCat = new BehaviorSubject<string>("");
  currentMessage = this.choixCat.asObservable();

  ordreFiltreDefault:any=['J\'aime','Sans aide','Je suis content'];
  public tabImageCategorie:Observable<string[]>;
  public tabImageHabitude:string[];

  constructor(private http:HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  updateChoix(choixCat:string){
    this.choixCat.next(choixCat);
  }

  insertFiltre(filtre:Filtre):Observable<Filtre>{
    //console.log('insert filtre from service')
    return this.http.post<Filtre>(this.filtreUrl, filtre, this.httpOptions).pipe(
      tap((newFiltre: Filtre) => console.log(`added filtre w/ id=${newFiltre._id}`)),
      catchError(this.handleError<Filtre>('addFiltre'))
    );
  }

  insertFiltreJeu(filtreJeu:Filtre,idJeu:string):Observable<any>{
    const url = `${this.filtreUrl}/${idJeu}`;
    console.log("On veut update",idJeu)

    return this.http.put(url,filtreJeu, this.httpOptions).pipe(
      tap(_ => console.log(`updated jeu with id id=${idJeu}`)),
      catchError(this.handleError<any>('updateJeu'))
    );
  }

 getAllImagesByCategorie(categorie:string){
  const url = `${this.imageCategorieUrl}/${categorie}`
    this.tabImageCategorie = this.http.get<string[]>(url)
    .pipe(
      tap(_ => console.log('fetched chemin image categorie')),
      catchError(this.handleError<string[]>('getCheminImageCategorie', []))
    );
    return this.tabImageCategorie;
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
