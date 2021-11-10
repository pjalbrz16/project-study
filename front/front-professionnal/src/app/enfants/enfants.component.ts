import { Component, OnInit } from '@angular/core';
import {Enfant } from '../../classes/enfant'
//import {ENFANTS} from '../../mocks/mock-enfants'
import {EnfantService} from '../../services/enfant.service'


@Component({
  selector: 'app-enfants',
  templateUrl: './enfants.component.html',
  styleUrls: ['./enfants.component.css']
})
export class EnfantsComponent implements OnInit {
  enfants : Enfant[];
  enfantsPro:Enfant[];
  constructor(private enfantService : EnfantService) { }

  ngOnInit() {
    this.getEnfants();
    this.getEnfantsProfessionnel();
  }
  getEnfants() : void {
   this.enfantService.getEnfants().subscribe(enfants => this.enfants = enfants)
  }

  getPersonneId() {
    if (localStorage.getItem('user') != undefined) {
      return JSON.parse(localStorage.getItem('user'))._id;
    }
  }

  getEnfantsProfessionnel():void{
    let id=this.getPersonneId();
    this.enfantService.getEnfantsPro(id).subscribe(enfantsPro=>this.enfantsPro=enfantsPro)
  }
}
