import { Component, OnInit , Input } from '@angular/core';
import { GameService } from "../../services/game.service";
import {Filtre} from './filtre'
import {Router} from '@angular/router';
import {SocketService} from '../../services/socket.service'
import {FiltreJeu} from '../partie/filtreJeu'
@Component({
  selector: 'app-partie',
  templateUrl: './partie.component.html',
  styleUrls: ['./partie.component.css']
})
export class PartieComponent implements OnInit {

  public isOnAime=false; //Pour permettre l'affichage du bon filtre au bon moment
  public isOnAide=false;
  public isOnContent=false;
  public choixCat:string;
  public ordreFiltre:Array<string> = []; //tableau contenant l'odre dans lequel les filtres apparaissent
  public filtre; //Le filtre actuel
  public tabImageJeu:Array<string> = []; // le tableau contenant le chemin des tout les images qui sont une habitude dans sa vie
  public indexImage = 0;
  public indexFiltre=0;
  public idJeu:string="5df0bbb41c9d440000b55b75";

  constructor(private gameService:GameService, private router:Router,private socket:SocketService) { 
    //this.ordreFiltre = gameService.ordreFiltreDefault;
  }

  ngOnInit() {
    //console.log(this.socket.message)
    //console.log(this.socket.message.jeu_id)
    if(this.socket.message === undefined||this.socket.message.filtres === undefined || this.socket.message.filtres[0] === undefined ||this.socket.message.filtres.length <= 0 ){
      console.log('socket vide, lancer le tableau par defaut')
      this.ordreFiltre = this.gameService.ordreFiltreDefault;
    }
    else{
      console.log('Tableau filtre reçu + id reçu!')
      this.idJeu=this.socket.message.jeu_id
      for(let i =0 ; i < this.socket.message.filtres.length;i++){
        console.log(this.socket.message.filtres[i].filtrePositif)
        this.ordreFiltre.push(this.socket.message.filtres[i].filtrePositif.trim())
      }
        console.log('tab:'+this.ordreFiltre)
    }
    this.gameService.currentMessage.subscribe(choixCat => this.choixCat = choixCat);
    this.tabImageJeu = this.gameService.tabImageHabitude;
    this.filtre = this.ordreFiltre[this.indexFiltre];
    this.switchFiltre();

  }

  onOui(){
    let nomCurrentImage:string=this.tabImageJeu[this.indexImage]
    let choix:Object={
      nomImage:nomCurrentImage,
      valeur:0
    }
    this.insertFiltre("",this.ordreFiltre[this.indexFiltre],choix)
    if(this.indexImage +1 >= this.tabImageJeu.length){
      this.indexFiltre++;
      this.switchFiltre();
      if(this.indexFiltre >=this.ordreFiltre.length){
        //fin partie
        console.log("fin partie")
        this.router.navigateByUrl('/finPartie');
      }
      
    }
    else{
      this.indexImage++;
    }
    
  }

  onNon(){
    let nomCurrentImage:string=this.tabImageJeu[this.indexImage]
    let choix:Object={
      nomImage:nomCurrentImage,
      valeur:1
    }
    this.insertFiltre("",this.ordreFiltre[this.indexFiltre],choix)
    if(this.indexImage + 1 >= this.tabImageJeu.length){
      this.indexFiltre++;
      this.switchFiltre();
      if(this.indexFiltre >=this.ordreFiltre.length){
        //fin partie
        console.log("fin partie")
        this.router.navigateByUrl('/finPartie');
      }
    }
    else{
      this.indexImage++;
    }
    
  }

  onJsp(){
    let nomCurrentImage:string=this.tabImageJeu[this.indexImage]
    let choix:Object={
      nomImage:nomCurrentImage,
      valeur:2
    }
    this.insertFiltre("",this.ordreFiltre[this.indexFiltre],choix)
    if(this.indexImage + 1 >= this.tabImageJeu.length){
      this.switchFiltre();
      this.indexFiltre++;
      if(this.indexFiltre >=this.ordreFiltre.length){
        //fin partie
        console.log("fin partie")
        this.router.navigateByUrl('/finPartie');
      }
    }
    else{
      this.indexImage++;
    }
    
  }

  insertFiltre(commentaire: string,nom: string,choix: Object){
    this.gameService.insertFiltre({commentaire,nom,choix} as Filtre).subscribe(filtre => {
      console.log('insert filtre')
    })
    this.gameService.insertFiltreJeu({commentaire,nom,choix} as Filtre,this.idJeu).subscribe(filtre =>
      console.log('insert filtre dans jeu'));
  }



  switchFiltre(){
    //console.log(this.tabImageJeu[0])
    console.log('switch')
    this.indexImage = 0;
    console.log(this.tabImageJeu)
    if(this.ordreFiltre[this.indexFiltre] === 'J\'aime'){
      this.isOnAide=false;
      this.isOnContent = false;
      this.isOnAime= true;
    }

    if(this.ordreFiltre[this.indexFiltre] === 'Sans aide'){
      this.isOnAime = false;
      this.isOnContent = false;
      this.isOnAide= true;
    }

    if(this.ordreFiltre[this.indexFiltre] === 'Je suis content'){
      this.isOnAime = false;
      this.isOnAide = false;
      this.isOnContent= true;
    }
  }

}
