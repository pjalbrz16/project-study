import { Component, OnInit, Renderer } from '@angular/core';
import { ListeDonneesService } from 'src/services/liste-donnees.service';
import { Filtre } from 'src/classes/filtre';
import { Demandeur } from 'src/classes/demandeur';
import { SocketService } from 'src/services/socket.service';
import { ConfigurationPartieService } from 'src/services/configuration-partie.service';
import { Partie } from 'src/classes/partie';
import { Enfant } from 'src/classes/enfant';
import { EnfantService } from 'src/services/enfant.service';

@Component({
  selector: 'app-configuration-jeux',
  templateUrl: './configuration-jeux.component.html',
  styleUrls: ['./configuration-jeux.component.css']
})
export class ConfigurationJeuxComponent implements OnInit {

  filtres: Filtre[];
  filtresFinal: Filtre[];
  isLance: boolean = false;

  enfants: Enfant[];
  selectedEnfantID: string;


  /** demandeur si medecin ou autre specialise */
  nom: string;
  prenom: string;
  relation: string;
  telephone: string;
  specialite: string;
  email: string;
  autre: string;
  unSeulFiltre: boolean;

  demandeurs: string[];
  selectedRelation: string;

  constructor(
    private configurationPartieSevice: ConfigurationPartieService,
    private listeDonneesService: ListeDonneesService,
    private renderer: Renderer,
    private socketService: SocketService,
    private enfantService: EnfantService
  ) { }

  ngOnInit() {
    this.selectedRelation = 'professionnel';
    this.getFiltres();
    this.getDemandeurs();
    this.getEnfantsProfessionnel();
  }
  getDemandeurs(): void {
    this.listeDonneesService.getDemandeurs().subscribe(demandeurs => this.demandeurs = demandeurs)
  }

  getEnfantsProfessionnel(): void {
    this.enfantService.getEnfants().subscribe(enfants => this.enfants = enfants);
  }

  //, id_enfant: Number, id_professionnel: Number
  lancerPartie(date: Date, demande: string) {
    console.log('Lancement de partie avec le tableau de filtres:', this.filtresFinal)
    this.isLance = true;
    let demandeur = new Demandeur();

    if (this.selectedRelation === 'médecin' || this.selectedRelation === 'autre professionnel') {
      demandeur.nom = this.nom;
      demandeur.prenom = this.prenom;
      demandeur.specialite = this.specialite;
      demandeur.telephone = this.telephone;
    }
    if (this.selectedRelation === 'autre') {
      demandeur.relation = this.autre;
    } else {
      demandeur.relation = this.selectedRelation;
    }

    let termine = false;
    let filtresPartie = this.filtresFinal;
    let id_enfant = this.selectedEnfantID;

    let id_professionnel = this.getPersonneId();

    this.configurationPartieSevice.addPartie({
      demandeur, date, demande, id_enfant, id_professionnel,
      filtresPartie, termine
    } as Partie).subscribe(data => {
      this.socketService.sendMessage({ jeu_id: data._id, filtres: this.filtresFinal });
    })
  }

  getPersonneId() {
    if (localStorage.getItem('user') != undefined) {
      return JSON.parse(localStorage.getItem('user'))._id;
    }
  }

  getFiltres(): void {
    this.listeDonneesService.getFiltres().subscribe(filtres => {
      this.filtres = filtres
      //console.log(filtres)
    })
    this.listeDonneesService.getFiltres().subscribe(filtres => {
      this.filtresFinal = filtres
      //console.log(filtres)
    })

  }

  supprimerFiltre(){
    let filtreNumero = this.filtresFinal.length-1
    this.filtresFinal.splice(this.filtresFinal.length-1, 1)
    console.log("FILTRES RESTANT : ", this.filtresFinal)
    let element = document.getElementById('filtre'+filtreNumero)
    element.remove()
    if(filtreNumero === 1){
      console.log("Changement du button")
      this.unSeulFiltre = true
    }
  }

  changeFiltre0(value) {
    console.log("VALUE 0", value)
    var splitted = value.split("-")
    // console.log(splitted)
    let filtre: Filtre = {
      filtrePositif: splitted[0],
      filtreNegatif: splitted[1]
    }
    this.filtresFinal[0] = filtre;
    console.log(this.filtres, this.filtresFinal)
  }


  changeFiltre1(value) {
    console.log("VALUE 1", value)
    var splitted = value.split("-")
    let filtre: Filtre = {
      filtrePositif: splitted[0],
      filtreNegatif: splitted[1]
    }
    this.filtresFinal[1] = filtre;
    console.log(this.filtres)
  }


  changeFiltre2(value) {
    console.log("VALUE 2", value)
    var splitted = value.split("-")
    let filtre: Filtre = {
      filtrePositif: splitted[0],
      filtreNegatif: splitted[1]
    }
    this.filtresFinal[2] = filtre;
    console.log(this.filtres)
  }

}
