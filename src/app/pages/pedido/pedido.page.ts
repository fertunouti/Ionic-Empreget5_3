import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apiService';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  constructor(private apiService:ApiService) { }
  tipoUserAtual:string=""
  ngOnInit() {

    this.tipoUserAtual = this.apiService.getUserRole()

  }

}
