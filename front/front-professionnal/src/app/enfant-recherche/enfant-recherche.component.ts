import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Enfant } from '../../classes/enfant'
import { EnfantService } from '../../services/enfant.service'

@Component({
  selector: 'app-enfant-recherche',
  templateUrl: './enfant-recherche.component.html',
  styleUrls: ['./enfant-recherche.component.css']
})
export class EnfantRechercheComponent implements OnInit {
  enfants$: Observable<Enfant[]>;
  private searchTerms = new Subject<string>();
  constructor(
    private enfantService : EnfantService
    ) { }


  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.enfants$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.enfantService.searchEnfant(term)),
    );
  }
}
