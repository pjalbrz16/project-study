import { Scolarite } from './scolarite';
import { Contact } from './contact';
export class Enfant {
  _id: string
  nom: string
  prenom: string
  date_naissance: Date
  langue_usuelle: string
  dominance: string
  scolarite: Scolarite
  contacts: Contact[]
  besoins: string[]
  professionnel: string
}

