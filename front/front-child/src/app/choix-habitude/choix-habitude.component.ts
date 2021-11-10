import { Component, OnInit } from '@angular/core';
import { GameService } from "../../services/game.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-choix-habitude',
  templateUrl: './choix-habitude.component.html',
  styleUrls: ['./choix-habitude.component.css']
})
export class ChoixHabitudeComponent implements OnInit {

  constructor(private gameService:GameService, private router:Router) { }

  public indexImage=0;
  public choixCat:string;
  public tabImagesCategorie:string[];
  public tabImagesHabitudePresente:Array<string> = [];
  public val=1;
  ngOnInit() {
    this.indexImage=0;
    this.gameService.currentMessage.subscribe(choixCat => this.choixCat = choixCat);
    this.gameService.getAllImagesByCategorie(this.choixCat.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")).subscribe(images => {
      this.tabImagesCategorie = images
      console.log(this.tabImagesCategorie)
    })

  }

  onOui(){
    this.tabImagesHabitudePresente.push(this.tabImagesCategorie[this.indexImage]);
    this.indexImage++;
    if(this.indexImage >=this.tabImagesCategorie.length){
      this.gameService.tabImageHabitude = this.tabImagesHabitudePresente
      console.log("on passe à la partie")
      console.log(this.tabImagesHabitudePresente)
      this.router.navigateByUrl('/partie');
      this.val++;
    }

  }

  onNon(){
    this.indexImage++;
    if(this.indexImage >=this.tabImagesCategorie.length){
      this.gameService.tabImageHabitude = this.tabImagesHabitudePresente
      //console.log(this.tabImagesHabitudePresente)
      //console.log(this.gameService.tabImageHabitude)
      console.log("on passe à la partie")
      this.router.navigateByUrl('/partie');
      this.val++;
    }
  }

  onJeVoudrais(){
    this.indexImage++;
    if(this.indexImage >=this.tabImagesCategorie.length){
      this.gameService.tabImageHabitude = this.tabImagesHabitudePresente
      console.log(this.tabImagesHabitudePresente)
      console.log("on passe à la partie")
      this.router.navigateByUrl('/partie');
      this.val++;
    }
  }


}
