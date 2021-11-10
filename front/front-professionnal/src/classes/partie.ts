import { Demandeur } from './demandeur';
import { Filtre } from './filtre';

export class Partie {
    _id: number;
    demandeur:Demandeur;
    date:Date;
    demande:string;
    id_enfant:string;
    id_professionnel:string;
    filtresPartie:Array<Filtre>;
    termine:boolean;
  }
  