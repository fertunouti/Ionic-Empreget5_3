import { Component, OnInit, SimpleChanges } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/apiService';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-gerenciar-foto',
  templateUrl: './gerenciar-foto.page.html',
  styleUrls: ['./gerenciar-foto.page.scss'],
})
export class GerenciarFotoPage implements OnInit {
  tipoUser!: string
  foto: any;
  urlFotoPerfil!: string
  prestadores: any
  

  constructor(
    private apiService: ApiService,
    private navCtrl: NavController,
    private eventService: EventService

  ) {
   
  }


  ngOnInit() {
    this.tipoUser = this.apiService.getUserRole()

    
  }

 

 
  onClickVoltar() {

    this.navCtrl.navigateBack('/hello');
  }



}
