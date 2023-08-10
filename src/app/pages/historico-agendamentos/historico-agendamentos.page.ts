import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apiService';

@Component({
  selector: 'app-historico-agendamentos',
  templateUrl: './historico-agendamentos.page.html',
  styleUrls: ['./historico-agendamentos.page.scss'],
})
export class HistoricoAgendamentosPage implements OnInit {

  constructor(private apiService:ApiService) { }
 
 pedidos!: any
  ngOnInit() {

 
    this.apiService.getPedidos().subscribe(
      (data) => {
         this.pedidos = data;
        console.log('Pedidos: no historico pedidos', this.pedidos);
       },
      (error) => {
         console.error('Erro ao obter dados dos prestadores:', error);
       }
      );
  }

}
