import { Component, OnInit } from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import { SocketService } from 'src/services/socket.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'front-enfant';

  constructor(
    private swUpdate:SwUpdate,
    private socketService: SocketService,
    private router: Router
  ){}

  ngOnInit(){
    this.socketService.socketInit()
    this.reloadCache();
    this.router.navigate([''])
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
