import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GameService} from '../../services/game.service';
import { SocketService } from 'src/services/socket.service';


@Component({
  selector: 'app-lets-play',
  templateUrl: './lets-play.component.html',
  styleUrls: ['./lets-play.component.css']
})
export class LetsPlayComponent implements OnInit {

  users:Object;
  socketMessage: boolean
  constructor(private data:GameService,
    private socketService: SocketService) { }

  ngOnInit() {
    this.socketMessage = false
    setInterval(() => {
      if (this.socketService.message){
        this.socketMessage = true
      }
    }, 1000)
  }

  

}
