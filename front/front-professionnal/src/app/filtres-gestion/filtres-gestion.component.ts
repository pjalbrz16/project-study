import { Component, OnInit } from '@angular/core';
import { Renderer } from '@angular/core';
import { Filtre } from '../../classes/filtre'
import { ListeDonneesService } from '../../services/liste-donnees.service'
import { SocketService } from 'src/services/socket.service';

@Component({
  selector: 'app-filtres-gestion',
  templateUrl: './filtres-gestion.component.html',
  styleUrls: ['./filtres-gestion.component.css']
})
export class FiltresGestionComponent implements OnInit {
  filtres: Filtre[];
  filtresFinal: Filtre[];
  isLance:boolean=false;

  constructor(
    private listeDonneesService: ListeDonneesService,
    private renderer: Renderer,
    private socketService: SocketService
  ) { }

  ngOnInit() {
    this.isLance=false;
    this.getFiltres();
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

  supprimerFiltre0() {
    let element = (document.getElementById('filtre0'))
    console.log(element)
    element.remove()
    this.filtresFinal.splice(0, 1)
  }
  supprimerFiltre1() {
    let element = (document.getElementById('filtre1'))
    console.log(element)
    element.remove()
    this.filtresFinal.splice(1, 1)
  }
  supprimerFiltre2() {
    let element = (document.getElementById('filtre2'))
    console.log(element)
    element.remove()
    this.filtresFinal.splice(2, 1)
  }

  filtreParDefaut() {
    this.getFiltres()
    this.lancerPartie()
  }

  lancerPartie() {
    console.log('Lancement de partie avec le tableau de filtres:')
    console.log(this.filtresFinal)
    this.socketService.sendMessage(this.filtresFinal)
    this.isLance=true;
  }

  changeFiltre0(value) {
    //console.log(value)
    var splitted = value.split("-")
    // console.log(splitted)
    let filtre: Filtre = {
      filtrePositif: splitted[0],
      filtreNegatif: splitted[1]
    }
    this.filtresFinal[0] = filtre;
  }


  changeFiltre1(value) {
    console.log(this.filtresFinal)
    var splitted = value.split("-")
    let filtre: Filtre = {
      filtrePositif: splitted[0],
      filtreNegatif: splitted[1]
    }
    this.filtresFinal[1] = filtre;
  }


  changeFiltre2(value) {
    var splitted = value.split("-")
    let filtre: Filtre = {
      filtrePositif: splitted[0],
      filtreNegatif: splitted[1]
    }
    this.filtresFinal[2] = filtre;
  }


}
