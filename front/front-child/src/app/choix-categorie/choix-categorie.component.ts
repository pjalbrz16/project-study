import { Component, OnInit } from '@angular/core';
import { GameService } from "../../services/game.service";
import { Router } from '@angular/router';
import { CategorieService } from 'src/services/categorie.service';

@Component({
  selector: 'app-choix-categorie',
  templateUrl: './choix-categorie.component.html',
  styleUrls: ['./choix-categorie.component.css']
})
export class ChoixCategorieComponent implements OnInit {

  categories : string[];
  cheminImages:string[]=[''];
  public choixCat:string;

  constructor(private gameService:GameService,private router: Router,
    private categorieService : CategorieService) { }

  ngOnInit() {
    this.getCategories();
    //console.log(this.categories)
    this.getCheminImage();
    this.gameService.currentMessage.subscribe(choixCat =>
       this.choixCat = choixCat
      )
  }

  clickChoixCat(value:string){
    console.log(value);
    this.choixCat = value;
    this.gameService.updateChoix(this.choixCat);
    this.router.navigateByUrl('/choixHabitude');
  }
  getCategories() : void {
    this.categorieService.getCategories().subscribe(categories =>{
      this.categories = categories;
      console.log(this.categories)
      this.categories.sort();
      this.categories.forEach(cat => {
        console.log('categorie:'+cat)
       // this.categorieService.getCheminImageByCategorie(cat).subscribe(chemin =>{
        this.categorieService.getCheminImageByCategorie(cat.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")).subscribe(chemin =>{
          let vraiChemin:string='';
          for(let i = 0 ; i<chemin.length;i++){
            vraiChemin+=chemin[i];
          }
          console.log('vrai chemin:'+vraiChemin)
          this.cheminImages.push(vraiChemin);
          this.cheminImages.sort();
          //console.log(this.cheminImages)
        });
        this.cheminImages.shift();
        console.log(this.cheminImages)
    });

    } )
    
   }

   //retourne un tableau du chemin de la première image de chaque categorie
   getCheminImage():void{
     //console.log(this.categories)
     /* this.categories.forEach(cat => {
        console.log(this.categorieService.getCheminImageByCategorie(cat));
    });*/
   }

}
