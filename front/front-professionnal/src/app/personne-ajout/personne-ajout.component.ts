import { Component, OnInit, Input } from '@angular/core';

import { Location } from '@angular/common';

import {ListeDonneesService} from '../../services/liste-donnees.service'
import {Personne} from '../../classes/personne'
import {GestionProfessionnelService} from '../../services/gestion-professionnel.service'
import {EnfantParentRechercheComponent} from '../enfant-parent-recherche/enfant-parent-recherche.component'

@Component({
  selector: 'app-personne-ajout',
  templateUrl: './personne-ajout.component.html',
  styleUrls: ['./personne-ajout.component.css']
})



export class PersonneAjoutComponent implements OnInit {
  @Input() recherche:EnfantParentRechercheComponent;
  roles: string[];
  professions: string[];
  isParent:boolean;
  idEnfantParent:string;
  

  constructor(
    private gestionProService: GestionProfessionnelService,
    private location: Location,
    private listeDonneesServices : ListeDonneesService
    ) { }

  ngOnInit() {
    this.getRoles();
    this.getProfessions();
    this.isParent=false;
  }

  add(nom: string, prenom: string,password:string, profession:string,telephone:string,email:string,role:string,idParentEnfant:string): void {
    // trim() => remove whitespace
    nom = nom.trim();
    prenom = prenom.trim();
    if (!nom){
      return;
    }
    idParentEnfant=this.idEnfantParent
    this.gestionProService.addPersonne({password,nom, prenom, profession,telephone,email,role,idParentEnfant} as Personne)
      .subscribe(personne => {
        this.goBack()
      })
  }
  
  getRoles():void{
    this.listeDonneesServices.getRoles().subscribe(roles => this.roles = roles)
    console.log(this.roles);
  }
  getProfessions():void{
    this.listeDonneesServices.getProfessions().subscribe(professions => this.professions = professions)
    console.log(this.professions);
  }


  goBack(): void{
    this.location.back();
  }

  formParent(value){
    console.log(value)
    if(value !== 'Parent'){
      this.isParent=false;
    }
    if(value === 'Parent'){
      this.isParent =true;
    }
  }

  recevoirIdEnfant($event){
    this.idEnfantParent = $event
  }

}
