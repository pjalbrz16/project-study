import { Component, OnInit } from '@angular/core';
import { Enfant } from 'src/classes/enfant';
import { EnfantService } from 'src/services/enfant.service';
import { ListeDonneesService } from 'src/services/liste-donnees.service';
import { Jeu } from 'src/classes/jeu';
import { Choix } from 'src/classes/choix';
import { Filtre } from 'src/classes/filtre';

@Component({
  selector: 'app-historique-partie',
  templateUrl: './historique-partie.component.html',
  styleUrls: ['./historique-partie.component.css']
})
export class HistoriquePartieComponent implements OnInit {

  jeux: Jeu[]
  jeu: Jeu
  listeEnfants: Enfant[]
  // choixEnfant: Choix[] 
  filtresEnfant: Filtre[]
  commentaire: string
  afficherEnfants: boolean
  afficherListeJeux: boolean
  afficherJeu: boolean
  
  constructor(private enfantService: EnfantService,
    private listeDonneesService: ListeDonneesService) { }

  ngOnInit() {
    this.getListeEnfants()
  }

  onSelectEnfant(enfant: Enfant) {
    this.getHistoriqueEnfant(enfant)
    this.afficherListeJeux = true
    this.afficherEnfants = false
  }

  onSelectJeu(jeu: Jeu) {
    this.jeu = jeu
    // this.choixEnfant = jeu.choix
    this.filtresEnfant = jeu.filtresPartie
    this.afficherJeu = true
    this.afficherListeJeux = false
  }

  onBackEnfants(afficherEnfants: boolean) {
    this.afficherEnfants = !afficherEnfants
    this.afficherListeJeux = false
  }

  onBackJeux(afficherListeJeux: boolean) {
    this.afficherListeJeux = !afficherListeJeux
    this.afficherJeu = false
    this.jeu = undefined
  }

  getListeEnfants() {
    this.enfantService.getEnfants().subscribe(enfants => this.listeEnfants = enfants)
    this.afficherEnfants = true
  }

  getHistoriqueEnfant(enfant: Enfant) {
    this.listeDonneesService.getJeux(enfant).subscribe(jeux => {
      this.jeux = jeux
      jeux.forEach(el => {
        console.log("Jeu : ", el)
      })
    })
  }

  // onUpdateChoix(event: any, index: number) {
  //   this.commentaire += event.data
  // }

  onBlur(event: any, index: number){
    let text: string = event.target.value
    console.log("EVENT VALUE :", event.target.value)
    console.log("TEXT VALUE", text)
    this.jeu.choix[index].commentaire = text
    console.log("LOST FOCUS :", event, index, this.jeu.choix[index].commentaire)
  }

  onSaveChoix() {
    console.log("Sauvegarde dans la DB")
    this.listeDonneesService.updateJeu(this.jeu).subscribe(response => {
      console.log("RESPONSE SAVE: ", response)
    })
  }

  getEnfantID() {
    if (localStorage.getItem('user') != undefined) {
      return JSON.parse(localStorage.getItem('user')).idEnfant;
    }
  }
}