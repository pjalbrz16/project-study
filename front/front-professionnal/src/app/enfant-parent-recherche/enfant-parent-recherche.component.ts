import { Component, OnInit , Output,EventEmitter} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { Enfant } from '../../classes/enfant'
import { EnfantService } from '../../services/enfant.service'
@Component({
  selector: 'app-enfant-parent-recherche',
  templateUrl: './enfant-parent-recherche.component.html',
  styleUrls: ['./enfant-parent-recherche.component.css']
})
export class EnfantParentRechercheComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<string>();
  idEnfantParent:string;
  isEnfantAjoute:boolean;
  enfantParent:Enfant;
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

  ajoutRelationEnfant(value){
    console.log(value)
    /*this.enfantService.getEnfant(value).subscribe(enfant=>{
      this.enfantParent=enfant;
    })*/
    this.idEnfantParent=value;
    this.messageEvent.emit(this.idEnfantParent)
    this.isEnfantAjoute=true;

  }

}
