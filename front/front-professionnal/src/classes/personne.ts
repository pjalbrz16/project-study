import { Filtre } from './filtre'

export class Personne {
  _id: string;
  password: string;
  nom: string;
  prenom: string;
  profession: string;
  telephone: string;
  email: string;
  role: string;
  idParentEnfant:string;
  filtres: [Filtre];
  }