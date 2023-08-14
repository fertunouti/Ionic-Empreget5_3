import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/apiService';
import { EventService } from 'src/app/services/event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-historico-agendamentos',
  templateUrl: './historico-agendamentos.page.html',
  styleUrls: ['./historico-agendamentos.page.scss'],
})
export class HistoricoAgendamentosPage implements OnInit, OnDestroy {
  private pedidoCadastradoSubscription: Subscription;

  constructor(private apiService:ApiService, private eventService: EventService) { 
    this.pedidoCadastradoSubscription = this.eventService.pedidoCadastrado$.subscribe(() => {
      this.getPedidosAndRefresh();
    });
  }
 
 pedidos!: any

  ngOnInit() {
    this.getPedidosAndRefresh();

    
  }
  ngOnDestroy(): void {
    this.pedidoCadastradoSubscription.unsubscribe();
      
  }
  private getPedidosAndRefresh() {
    this.apiService.getPedidos().subscribe(
      (data) => {
        this.pedidos = data;
        console.log('Pedidos no histórico de pedidos:', this.pedidos);
      },
      (error) => {
        console.error('Erro ao obter dados dos pedidos:', error);
      }
    );
  }

 
      
  

}
