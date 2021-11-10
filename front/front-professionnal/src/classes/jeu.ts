import { Choix } from './choix'
import { Filtre } from './filtre'
import { Demandeur } from './demandeur'

export class Jeu {
    _id: string
    date: string
    demandeur: Demandeur
    demande: string
    idEnfant: string
    idProfessionnel: string
    filtresPartie: Filtre[]
    choix: Choix[]
}