import { Component, OnInit, OnChanges } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import {AuthService} from "../services/auth.service";
import { SocketService } from 'src/services/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges, OnInit{
  title = 'ng2auth';
  checkToken(){ console.log(this.authServ.loginProfesionel()+'est tu vrais');return (

    localStorage.getItem('user-token')!=undefined)};
  checkRoleAdmin() {(localStorage.getItem('role')=='Administrateur')};
  checkRoleProf(){(localStorage.getItem('role')=='Professionnel')};
  checkRoleParent(){(localStorage.getItem('role')=='Parent')};
  checkRoleResp(){(localStorage.getItem('role')=='Responsable')};

  constructor(
    private swUpdate:SwUpdate,
    public authServ:AuthService,
    private socketService: SocketService,
    private router: Router
  ){}

  ngOnChanges(){

  }
  ngOnInit(){
    this.socketService.socketInit()
    this.reloadCache();
    this.router.navigate([''])
  }
  getUser(){
    if(localStorage.getItem('user')!=undefined) {
      return JSON.parse(localStorage.getItem('user')).nom;
    }
  }
  getUserID(){
    if(localStorage.getItem('user')!=undefined) {
      return JSON.parse(localStorage.getItem('user'))._id;
    }
  }
  getEnfantID(){
    if(localStorage.getItem('user')!=undefined) {
      return JSON.parse(localStorage.getItem('user')).idEnfant;
    }
  }

  logout(){
    this.authServ.logout();
  }


  //update l'appli des qu'il y a un changment (pwa)
  reloadCache(){
    if(this.swUpdate.isEnabled){
      this.swUpdate.available.subscribe(()=>{
        if(confirm("New version available! Update ?")){
          window.location.reload();
        }
      })
    }
  }
}
