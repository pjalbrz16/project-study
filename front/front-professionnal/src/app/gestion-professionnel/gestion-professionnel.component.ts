import { Component, OnInit } from '@angular/core';
import {GestionProfessionnelService} from '../../services/gestion-professionnel.service'
import {Personne} from '../../classes/personne'


@Component({
  selector: 'app-gestion-professionnel',
  templateUrl: './gestion-professionnel.component.html',
  styleUrls: ['./gestion-professionnel.component.css']
})
export class GestionProfessionnelComponent implements OnInit {

  personnes: Personne[];

  constructor(
    private gestionProService : GestionProfessionnelService,
    
    ) { }

  ngOnInit() {
    this.getPersonnes();
    console.log(this.personnes)
  }

  getPersonnes() : void {
    this.gestionProService.getPersonnes().subscribe(personnes => this.personnes = personnes)
   }

}
