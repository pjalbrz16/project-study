import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {EnfantsComponent} from './enfants/enfants.component';
import {EnfantDetailComponent} from './enfant-detail/enfant-detail.component'
import {EnfantAjoutComponent} from './enfant-ajout/enfant-ajout.component'


import {UserLoginComponent} from "./user-login/user-login.component";
import {ErrorRoutingComponent} from './error-routing/error-routing.component';

import {GestionProfessionnelComponent} from './gestion-professionnel/gestion-professionnel.component'
import {PersonneAjoutComponent} from './personne-ajout/personne-ajout.component'
import {PersonneDetailComponent} from './personne-detail/personne-detail.component'

import { HistoriquePartieComponent} from './historique-partie/historique-partie.component'

import{FiltresGestionComponent} from './filtres-gestion/filtres-gestion.component'
import { ConfigurationJeuxComponent } from './configuration-jeux/configuration-jeux.component';

import {AuthGuardR} from "./guard/responssible.guard";
import {AuthGuardP} from "./guard/parentauth.guard";
import {AuthGuardA} from "./guard/adminauth.guard";
import {AuthGuard} from "./guard/auth.guard";
import { AccueilComponent } from './accueil/accueil.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path:'configuration-jeux',
    component: ConfigurationJeuxComponent
  },
  {
    path: 'historique',
    component: HistoriquePartieComponent
  },
  {
    path: 'inscription',
    component: EnfantAjoutComponent
  },
  {
    path: 'gestionProfessionnel',
    component: GestionProfessionnelComponent
  },
  {
    path: 'inscriptionPersonne',
    component: PersonneAjoutComponent
  },
  {
    path: 'enfants',
    component: EnfantsComponent
  },
  {
    path: 'detail/:id',
    component: EnfantDetailComponent
  },
  {
    path: 'detailPersonne/:id',
    component: PersonneDetailComponent
  },
  {
    path: 'filtreGestion',
    component: FiltresGestionComponent
  },
  {
    path: 'login',
    component: UserLoginComponent
  },
  {
    path: "acceuil",
    component: AccueilComponent
  },
  {
    path: '**',
    component: ErrorRoutingComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
