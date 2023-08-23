import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/apiService';
import { EventService } from 'src/app/services/event.service';


@Component({
  selector: 'app-os-view',
  templateUrl: './os-view.page.html',
  styleUrls: ['./os-view.page.scss'],
})
export class OsViewPage implements OnInit, OnDestroy , OnChanges{
  private osCanceladaSubscription: Subscription;
  private osAceiteSubscription: Subscription;
  private osRecusadaSubscription: Subscription;
  
  constructor(
    private apiService: ApiService,
    private eventService: EventService,
  ) {
    this.osCanceladaSubscription = this.eventService.osCancelada$.subscribe(() => {
      this.getPedidosByIdAndRefresh();
      this.getPedidosAndRefresh();
    });
   
    this.osAceiteSubscription = this.eventService.osAceite$.subscribe(() => {
      this.getPedidosByIdAndRefresh();
      this.getPedidosAndRefresh();
    });
    this.osRecusadaSubscription = this.eventService.osRecusada$.subscribe(() => {
      this.getPedidosByIdAndRefresh();
      this.getPedidosAndRefresh();
    });
   
      
   
  }
  tipoUser!: string
  idPedido!: number
  pedido!: any
  pedidos!: any
  

  ngOnInit() {
    this.tipoUser = this.apiService.getUserRole()
    this.idPedido = this.apiService.readId()
    this.getPedidosByIdAndRefresh()
    this.getPedidosAndRefresh();
    this.osCanceladaSubscription = this.eventService.osCancelada$.subscribe(() => {
      this.getPedidosByIdAndRefresh();
      this.getPedidosAndRefresh();
    });
    this.osAceiteSubscription = this.eventService.osAceite$.subscribe(() => {
      this.getPedidosByIdAndRefresh();
      this.getPedidosAndRefresh();
    });
    this.osRecusadaSubscription = this.eventService.osRecusada$.subscribe(() => {
      this.getPedidosByIdAndRefresh();
      this.getPedidosAndRefresh();
    });


  }
  ngOnDestroy() {
    // Cancelar a inscrição no observável para evitar vazamentos de memória
    this.osCanceladaSubscription.unsubscribe();
    this.osAceiteSubscription.unsubscribe();
    this.osRecusadaSubscription.unsubscribe();
   }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.osCanceladaSubscription.unsubscribe();
    this.osAceiteSubscription.unsubscribe();
    this.osRecusadaSubscription.unsubscribe();
  }

  onClickCancelarOS() {
    this.cancelaOSAndRefresh()
    this.eventService.emitOSCancelada();
  }
  onClickAceitarOS() {
    this.aceitaOSAndRefresh()
    this.eventService.emitOSAceite();
  }
  onClickRecusarOS() {
    this.recusaOSAndRefresh()
    this.eventService.emitOSRecusada();
  }

  private cancelaOSAndRefresh() {

    console.log("email = " + this.apiService.readEmail())
    console.log("Id = " + this.apiService.readId())
    console.log("token =" + this.apiService.getToken())


    this.apiService.putCancelarOS().subscribe(
      (data) => {
        console.log('Cancelado', data);
        this.osCanceladaSubscription = this.eventService.osCancelada$.subscribe(() => {
          this.getPedidosByIdAndRefresh();
          this.getPedidosAndRefresh();
        });
      },
      (error) => {
        console.error('Erro CANCELAR OS', error);
      }
    );
  }
  private aceitaOSAndRefresh() {

    console.log("email = " + this.apiService.readEmail())
    console.log("Id = " + this.apiService.readId())
    console.log("token =" + this.apiService.getToken())


    this.apiService.putAceiteOS().subscribe(
      (data) => {
        console.log('Aceito pedido ' +data);
        this.osCanceladaSubscription = this.eventService.osCancelada$.subscribe(() => {
          this.getPedidosByIdAndRefresh();
          this.getPedidosAndRefresh();
        });
      },
      (error) => {
        console.error('Erro ACEITE OS', error);
      }
    );
  }
  private recusaOSAndRefresh() {

    console.log("email = " + this.apiService.readEmail())
    console.log("Id = " + this.apiService.readId())
    console.log("token =" + this.apiService.getToken())


    this.apiService.putRecusarOS().subscribe(
      (data) => {
        console.log('Recusa OS ' +data);
        this.osRecusadaSubscription = this.eventService.osRecusada$.subscribe(() => {
          this.getPedidosByIdAndRefresh();
          this.getPedidosAndRefresh();
        });
      },
      (error) => {
        console.error('Erro ACEITE OS', error);
      }
    );
  }

  private getPedidosByIdAndRefresh() {
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


