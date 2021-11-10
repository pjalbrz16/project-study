import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router'

import {GestionProfessionnelService} from '../../services/gestion-professionnel.service'
import {Personne} from '../../classes/personne'
import {ListeDonneesService} from '../../services/liste-donnees.service'
import {EnfantService} from '../../services/enfant.service'
import { Enfant } from 'src/classes/enfant';
 
@Component({
  selector: 'app-personne-detail',
  templateUrl: './personne-detail.component.html',
  styleUrls: ['./personne-detail.component.css']
})
export class PersonneDetailComponent implements OnInit {
  personne: Personne;
  roles: string[];
  professions: string[];
  enfant: Enfant;
  idEnfant: string;
  isParent: boolean;
 
  

  constructor(
    private route: ActivatedRoute,
    private gestionProService:GestionProfessionnelService, 
    private location:Location,
    private listeDonneesService : ListeDonneesService,
    private enfantService : EnfantService
    ) { }

  ngOnInit() {
    this.getPersonne();
    this.getRoles();
    this.getProfessions();
   
    
   // this.getEnfants();
    /*
    this.isParent = this.estUnParent();
    if(this.isParent){
      this.getEnfantDeParent();
    }
    //if((this.personne.role==='parent')){
     */
    
    //};
  }

  estUnParent():boolean{
     if(this.personne.role === "parent"){
       return true;
     }
     return false;
  }

  getEnfant(id: string):void{
    this.enfantService.getEnfant(id).subscribe(enfant => this.enfant = enfant);
    this.isParent=true;

  }
  getProfessions():void{
    this.listeDonneesService.getProfessions().subscribe(professions => this.professions = professions)
   
  }
  getRoles():void{
    this.listeDonneesService.getRoles().subscribe(roles => this.roles = roles)
   
  }

  getPersonne():void{
    console.log("get personne")
    let id = this.route.snapshot.paramMap.get('id');
    this.gestionProService.getPersonne(id).subscribe(personne =>{
      this.personne = personne,
      this.getEnfant(personne.idParentEnfant)
    })
  }

  updatePersonne():void{
    this.gestionProService.updatePersonne(this.personne).subscribe(()=> this.goBack());
  }

  deletePersonne():void{
    this.gestionProService.deletePersonne(this.personne).subscribe(()=> this.goBack());
  }

  goBack(): void{
    this.location.back();
  }

}
