import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Personne } from '../../classes/personne'
import { GestionProfessionnelService } from '../../services/gestion-professionnel.service'

@Component({
  selector: 'app-personne-recherche',
  templateUrl: './personne-recherche.component.html',
  styleUrls: ['./personne-recherche.component.css']
})
export class PersonneRechercheComponent implements OnInit {
  personnes$: Observable<Personne[]>;
  private searchTerms = new Subject<string>()
  constructor(
    private gestionProfessionnelService : GestionProfessionnelService
  ) { }

   // Push a search term into the observable stream.
   search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.personnes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.gestionProfessionnelService.searchPersonne(term)),
    );
  }
}
