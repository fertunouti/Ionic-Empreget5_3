import { Component, OnInit ,OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/apiService';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-os-view',
  templateUrl: './os-view.page.html',
  styleUrls: ['./os-view.page.scss'],
})
export class OsViewPage implements OnInit {
  private pedidoCanceladoSubscription: Subscription;

  constructor(private apiService:ApiService, private eventService: EventService) { 
    this.pedidoCanceladoSubscription = this.eventService.pedidoCancelado$.subscribe(() => {
      this.getPedidosAndRefresh();
    });
  }
  tipoUser!: string
  idPedido!: number
  pedido!: any
  ngOnInit() {
    this.tipoUser = this.apiService.getUserRole()
    this.idPedido = this.apiService.readId()
    this.getPedidosAndRefresh();
 
  }
  ngOnDestroy(): void {
    this.pedidoCanceladoSubscription.unsubscribe();
  }

  private getPedidosAndRefresh() {
    this.apiService.getByIdPedido().subscribe(
      (data) => {
        this.pedido = data;
        console.log('Pedidos no histórico de pedidos:', this.pedido);
      },
      (error) => {
        console.error('Erro ao obter dados dos pedidos:', error);
      }
    );
  }



}
